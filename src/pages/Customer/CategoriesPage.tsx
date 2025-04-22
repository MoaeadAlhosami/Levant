import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from '../../components/Customer/CategoriesList';
import { useTranslation } from 'react-i18next';

const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link to="/restaurant" className="text-blue-600 hover:underline">
          ← {t('back_to_home')}
        </Link>
      </div>
      <h1 className="text-2xl mb-6">{t('main_categories')}</h1>
      <CategoriesList />
    </div>
  );
};

export default CategoriesPage;
