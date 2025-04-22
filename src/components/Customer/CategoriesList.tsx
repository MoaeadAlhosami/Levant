import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/index';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface Category {
  id: number;
  name: string;
  image: string;
  content: number;
}

const CategoriesList: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const resp = await api.get<{ data: Category[] }>(
          '/customer_api/show_restaurant_categories?restaurant_id=54'
        );
        setCategories(resp.data.data);
      } catch {
        toast.error(t('fetch_categories_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, [t]);

  if (loading) return <Spinner />;
  if (categories.length === 0)
    return <p className="text-center py-4">{t('no_categories')}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(cat => (
        <Link
          key={cat.id}
          to={
            cat.content === 1
              ? `/restaurant/categories/${cat.id}/subcategories`
              : `/restaurant/categories/${cat.id}/items`
          }
          className="block bg-white rounded shadow hover:shadow-lg overflow-hidden"
        >
          <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
          <h3 className="p-2 text-center font-medium">{cat.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
