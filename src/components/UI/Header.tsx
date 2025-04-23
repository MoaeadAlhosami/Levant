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
    <header
    className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-sm"
    >
      <h1 className="text-lg font-semibold text-gray-800">Levant&nbsp;Menu</h1>

      <button
        onClick={toggle}
        className="
      rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white
      transition-colors hover:bg-blue-700 focus:outline-none
      focus-visible:ring-2 focus-visible:ring-blue-500
    "
      >
        {i18n.language === 'ar' ? 'English' : 'عربي'}
      </button>
    </header>
  );
};

export default Header;
