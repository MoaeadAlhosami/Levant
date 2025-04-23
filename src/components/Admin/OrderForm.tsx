import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import api from '../../api';
import { Table, CategoryWithItems } from '../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  table: Table;
  onCancel: () => void;
  onSubmit: () => void;
}

const OrderForm: React.FC<Props> = ({ table, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    api
      .get<{ data: CategoryWithItems[] }>(
        '/admin_api/show_category_subs_items'
      )
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
    <section
      className="
        max-w-4xl mx-auto space-y-8
        rounded-2xl bg-white/80 backdrop-blur p-8 shadow-xl
      "
    >
      <h2 className="text-2xl font-bold tracking-wide">
        {t('add_order_to_table')} {table.number_table}
      </h2>

      {categories.map(cat => (
        <div key={cat.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>

          {cat.items.map(item => (
            <div
              key={item.id}
              className="
                flex items-center gap-3 rounded-lg bg-gray-50
                px-4 py-2 shadow-sm hover:shadow
              "
            >
              <span className="flex-1 text-sm font-medium">{item.name}</span>

              <input
                type="number"
                min={0}
                value={counts[item.id] || 0}
                onChange={e =>
                  handleChange(item.id, parseInt(e.target.value) || 0)
                }
                className="
    w-24 rounded-lg border border-gray-300 py-2 px-3 text-sm text-center
    focus:border-transparent focus:ring-2 focus:ring-blue-500
  "
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSubmit}>{t('submit_order')}</Button>
        <Button onClick={onCancel}>{t('cancel')}</Button>
      </div>
    </section>
  );
};

export default OrderForm;
