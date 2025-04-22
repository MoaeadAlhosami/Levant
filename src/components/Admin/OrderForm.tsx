import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import api from '../../api/index';
import { Table, CategoryWithItems } from '../../types';
import { useTranslation } from 'react-i18next';

interface OrderFormProps {
  table: Table;
  onCancel: () => void;
  onSubmit: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ table, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    api
      .get<{ data: CategoryWithItems[] }>('/admin_api/show_category_subs_items')
      .then(resp => setCategories(resp.data.data));
  }, []);

  const handleChange = (itemId: number, value: number) => {
    setCounts(prev => ({ ...prev, [itemId]: value }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    let idx = 0;
    for (const [id, count] of Object.entries(counts)) {
      if (count > 0) {
        form.append(`data[${idx}][item_id]`, id);
        form.append(`data[${idx}][count]`, count.toString());
        idx++;
      }
    }
    form.append('table_id', table.id.toString());
    await api.post('/admin_api/add_order', form);
    onSubmit();
  };

  return (
    <div>
      <h2 className="text-xl mb-4">
        {t('add_order_to_table')} {table.number_table}
      </h2>
      {categories.map(cat => (
        <div key={cat.id} className="mb-6">
          <h3 className="font-semibold mb-2">{cat.name}</h3>
          <div className="space-y-2">
            {cat.items.map(item => (
              <div key={item.id} className="flex items-center space-x-2">
                <span className="flex-1">{item.name}</span>
                <input
                  type="number"
                  min={0}
                  value={counts[item.id] || 0}
                  onChange={e => handleChange(item.id, parseInt(e.target.value, 10) || 0)}
                  className="w-20 border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex space-x-2">
        <Button onClick={handleSubmit}>{t('submit_order')}</Button>
        <Button onClick={onCancel}>{t('cancel')}</Button>
      </div>
    </div>
  );
};

export default OrderForm;
