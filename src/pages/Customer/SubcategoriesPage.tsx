import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SubcategoriesList from '../../components/Customer/SubcategoriesList';
import { useTranslation } from 'react-i18next';

const SubcategoriesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link to="/restaurant/categories" className="text-blue-600 hover:underline">
          ← {t('back_to_categories')}
        </Link>
      </div>
      <h1 className="text-2xl mb-6">{t('subcategories')}</h1>
      <SubcategoriesList restaurantId={54} parentId={id!} />
    </div>
  );
};

export default SubcategoriesPage;
