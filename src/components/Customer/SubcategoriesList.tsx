import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/index';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Category } from '../../types';
import { useTranslation } from 'react-i18next';

interface SubcategoriesListProps {
  restaurantId: number;
  parentId: string;
}

const SubcategoriesList: React.FC<SubcategoriesListProps> = ({ restaurantId, parentId }) => {
  const { t } = useTranslation();
  const [subs, setSubs] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubs = async () => {
      setLoading(true);
      try {
        const resp = await api.get<{ data: Category[] }>(
          `/customer_api/show_restaurant_categories?restaurant_id=${restaurantId}&category_id=${parentId}`
        );
        setSubs(resp.data.data);
      } catch {
        toast.error(t('fetch_subcategories_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, [restaurantId, parentId, t]);

  if (loading) return <Spinner />;
  if (subs.length === 0)
    return <p className="text-center py-4">{t('no_subcategories')}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subs.map(cat => (
        <Link
          key={cat.id}
          to={
            cat.content === 1
              ? `/categories/${cat.id}/subcategories`
              : `/categories/${cat.id}/items`
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

export default SubcategoriesList;
