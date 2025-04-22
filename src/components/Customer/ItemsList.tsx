import React, { useEffect, useState } from 'react';
import api from '../../api/index';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Item } from '../../types';
import { useTranslation } from 'react-i18next';

interface ItemsListProps {
  categoryId: string;
}

const ItemsList: React.FC<ItemsListProps> = ({ categoryId }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const resp = await api.get<{ data: Item[] }>(
          `/customer_api/show_items?category_id=${categoryId}`
        );
        setItems(resp.data.data);
      } catch {
        toast.error(t('fetch_items_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [categoryId, t]);

  if (loading) return <Spinner />;
  if (items.length === 0)
    return <p className="text-center py-4">{t('no_items_in_category')}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.id} className="bg-white rounded shadow p-4 flex flex-col">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
          <p className="text-gray-700 mb-4">{item.description || t('no_description')}</p>
          <span className="mt-auto font-bold">
            {item.price} {t('currency_syp')}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
