import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

const savedLang = (localStorage.getItem('lang') as 'ar' | 'en') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

export default i18n;
