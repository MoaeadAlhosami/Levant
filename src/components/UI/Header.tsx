import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const toggle = () => {
    const newLng = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLng);
    localStorage.setItem('lang', newLng);
    document.documentElement.dir = newLng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex justify-between">
      <h1 className="text-lg font-semibold">Levant Menu</h1>
      <button onClick={toggle} className="px-3 py-1 bg-blue-600 rounded">
        {i18n.language === 'ar' ? 'English' : 'عربي'}
      </button>
    </header>
  );
};

export default Header;