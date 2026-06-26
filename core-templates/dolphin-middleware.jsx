import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

// 🐬 DolphinCSS — dolphin-middleware
// Route-level auth guard middleware
// Usage:
//   Wrap your protected routes with <DolphinMiddleware>
//   Configure isAuthenticated and redirectTo below

const MIDDLEWARE_CONFIG = {
  redirectTo: '/login',           // ✏️ redirect if not authenticated
  publicRoutes: ['/', '/login', '/register', '/about'],  // ✏️ routes that skip auth
  checkAuth: () => {
    // ✏️ Replace with your auth logic:
    // e.g. return !!localStorage.getItem('token');
    return !!localStorage.getItem('dolphin_token');
  },
};

export function DolphinMiddleware({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublic = MIDDLEWARE_CONFIG.publicRoutes.includes(location.pathname);
    const isAuthenticated = MIDDLEWARE_CONFIG.checkAuth();

    if (!isPublic && !isAuthenticated) {
      navigate(MIDDLEWARE_CONFIG.redirectTo, {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [location.pathname, navigate]);

  return children ?? <Outlet />;
}

export default DolphinMiddleware;
