import React from 'react';
import AdsCarousel from '../../components/Customer/AdsCarousel';
import CategoriesList from '../../components/Customer/CategoriesList';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">{t('welcome_message')}</h1>
      <AdsCarousel />
      <section className="mt-8">
        <h2 className="text-2xl mb-4">{t('main_categories')}</h2>
        <CategoriesList />
      </section>
    </div>
  );
};

export default HomePage;
