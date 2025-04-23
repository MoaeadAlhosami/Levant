import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Category } from '../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  restaurantId: number;
  parentId: string;
}

const SubcategoriesList: React.FC<Props> = ({ restaurantId, parentId }) => {
  const { t } = useTranslation();
  const [subs, setSubs] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<{ data: Category[] }>(
          `/customer_api/show_restaurant_categories?restaurant_id=${restaurantId}&category_id=${parentId}`
        );
        setSubs(data.data);
      } catch {
        toast.error(t('fetch_subcategories_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [restaurantId, parentId, t]);

  if (loading) return <Spinner />;
  if (!subs.length)
    return <p className="py-6 text-center text-gray-600">{t('no_subcategories')}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {subs.map(cat => (
        <Link
          key={cat.id}
          to={
            cat.content === 1
              ? `/categories/${cat.id}/subcategories`
              : `/categories/${cat.id}/items`
          }
          className="
            group relative overflow-hidden rounded-xl
            shadow-md hover:shadow-xl transition
          "
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
          <h3
            className="
              absolute bottom-3 inset-x-0 text-center
              mx-2 rounded-md bg-white/10 backdrop-blur
              py-1.5 text-sm font-semibold text-white tracking-wide
              transition group-hover:scale-[1.03]
            "
          >
            {cat.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default SubcategoriesList;
