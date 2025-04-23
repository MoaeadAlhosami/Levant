import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from '../../components/Customer/CategoriesList';
import { useTranslation } from 'react-i18next';

const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mb-6">
        <Link
          to="/restaurant"
          className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <span className="text-xl leading-none">←</span> {t('back_to_home')}
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold tracking-wide text-gray-800">
        {t('main_categories')}
      </h1>

      <CategoriesList />
    </section>
  );
};

export default CategoriesPage;
