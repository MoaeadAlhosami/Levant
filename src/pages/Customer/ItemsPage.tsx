import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemsList from '../../components/Customer/ItemsList';
import { useTranslation } from 'react-i18next';

const ItemsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link to="/restaurant/categories" className="text-blue-600 hover:underline">
          ← {t('back_to_categories')}
        </Link>
      </div>
      <h1 className="text-2xl mb-6">{t('items')}</h1>
      <ItemsList categoryId={id!} />
    </div>
  );
};

export default ItemsPage;
