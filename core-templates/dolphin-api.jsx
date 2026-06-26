// 🐬 DolphinCSS — dolphin-api
// Zero-backend API client with auto-caching, loading & error states
// Usage:
//   import { useApi, api } from './dolphin-api';
//   const { data, loading, error } = useApi('/users');
//   await api.post('/users', { name: 'Shankar' });

import { useState, useEffect, useCallback, useRef } from 'react';

const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',  // ✏️
  headers: {
    'Content-Type': 'application/json',
  },
  getAuthHeader: () => {
    const token = localStorage.getItem('dolphin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// Simple in-memory cache
const cache = new Map();

async function request(method, endpoint, body = null, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const headers = {
    ...API_CONFIG.headers,
    ...API_CONFIG.getAuthHeader(),
    ...options.headers,
  };

  const config = { method: method.toUpperCase(), headers };
  if (body) config.body = JSON.stringify(body);

  const res = await fetch(url, config);
  const data = await res.json().catch(() => res.text());

  if (!res.ok) throw { status: res.status, message: data?.message || res.statusText, data };
  return data;
}

export const api = {
  get:    (endpoint, opts) => request('GET',    endpoint, null, opts),
  post:   (endpoint, body, opts) => request('POST',   endpoint, body, opts),
  put:    (endpoint, body, opts) => request('PUT',    endpoint, body, opts),
  patch:  (endpoint, body, opts) => request('PATCH',  endpoint, body, opts),
  delete: (endpoint, opts) => request('DELETE', endpoint, null, opts),
};

export function useApi(endpoint, options = {}) {
  const { cache: useCache = true, deps = [] } = options;
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const abortRef = useRef(null);

  const fetch = useCallback(async () => {
    if (!endpoint) return;

    // Cache hit
    if (useCache && cache.has(endpoint)) {
      setData(cache.get(endpoint));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.get(endpoint);
      if (useCache) cache.set(endpoint, result);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, useCache]);

  useEffect(() => { fetch(); }, [endpoint, ...deps]);

  const invalidate = useCallback(() => {
    cache.delete(endpoint);
    fetch();
  }, [endpoint, fetch]);

  return { data, loading, error, refetch: fetch, invalidate };
}

export function clearApiCache(endpoint) {
  if (endpoint) cache.delete(endpoint);
  else cache.clear();
}

export default api;
