import React, { useEffect, useState } from 'react';
import api from '../../api';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Item } from '../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  categoryId: string;
}

const ItemsList: React.FC<Props> = ({ categoryId }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<{ data: Item[] }>(
          `/customer_api/show_items?category_id=${categoryId}`
        );
        setItems(data.data);
      } catch {
        toast.error(t('fetch_items_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [categoryId, t]);

  if (loading) return <Spinner />;
  if (!items.length)
    return <p className="py-6 text-center text-gray-600">{t('no_items_in_category')}</p>;

  return (
    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <article
          key={item.id}
          className="
            flex flex-col overflow-hidden rounded-2xl
            bg-white shadow-md hover:shadow-xl
            transition-shadow
          "
        >
          {/* صورة + شارة السعر */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <span
              className="
                absolute top-3 right-3
                rounded-full bg-indigo-600/90 px-3 py-1.5
                text-xs font-semibold text-white shadow
              "
            >
              {item.price} {t('currency_syp')}
            </span>
          </div>

          {/* النص */}
          <div className="flex flex-col gap-2 p-5">
            <h3 className="text-lg font-semibold tracking-wide">{item.name}</h3>
            <p className="text-gray-600 text-sm">
              {item.description || t('no_description')}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ItemsList;
