import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 🐬 DolphinCSS — dolphin-i18n
// Multi-language routing: /en/about, /np/about, /hi/about
// Usage:
//   import { useI18n, t } from './dolphin-i18n';
//   const { lang, setLang } = useI18n();
//   <p>{t('welcome')}</p>

const I18nContext = createContext(null);

const SUPPORTED_LANGUAGES = ['en', 'np', 'hi'];  // ✏️ Add your languages
const DEFAULT_LANGUAGE = 'en';

const TRANSLATIONS = {
  en: {
    welcome: 'Welcome',
    home: 'Home',
    about: 'About',
    loading: 'Loading...',
    // ✏️ Add more English translations
  },
  np: {
    welcome: 'स्वागत छ',
    home: 'गृहपृष्ठ',
    about: 'हाम्रोबारे',
    loading: 'लोड हुँदैछ...',
    // ✏️ Add more Nepali translations
  },
  hi: {
    welcome: 'स्वागत है',
    home: 'होम',
    about: 'हमारे बारे',
    loading: 'लोड हो रहा है...',
    // ✏️ Add more Hindi translations
  },
};

let _currentLang = DEFAULT_LANGUAGE;
let _translations = TRANSLATIONS;

export function t(key) {
  return _translations[_currentLang]?.[key] ?? _translations[DEFAULT_LANGUAGE]?.[key] ?? key;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function DolphinI18nProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect language from URL prefix: /en/... /np/...
  const detectLang = useCallback((pathname) => {
    const segment = pathname.split('/')[1];
    return SUPPORTED_LANGUAGES.includes(segment) ? segment : DEFAULT_LANGUAGE;
  }, []);

  const [lang, setLangState] = useState(() => detectLang(location.pathname));

  useEffect(() => {
    _currentLang = lang;
  }, [lang]);

  useEffect(() => {
    const detected = detectLang(location.pathname);
    if (detected !== lang) setLangState(detected);
  }, [location.pathname, detectLang, lang]);

  const setLang = useCallback((newLang) => {
    if (!SUPPORTED_LANGUAGES.includes(newLang)) return;
    setLangState(newLang);
    _currentLang = newLang;

    // Rewrite URL: /en/about → /np/about
    const pathParts = location.pathname.split('/');
    const hasLangPrefix = SUPPORTED_LANGUAGES.includes(pathParts[1]);
    if (hasLangPrefix) {
      pathParts[1] = newLang;
    } else {
      pathParts.splice(1, 0, newLang);
    }
    navigate(pathParts.join('/') || '/');
  }, [location.pathname, navigate]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export default DolphinI18nProvider;
