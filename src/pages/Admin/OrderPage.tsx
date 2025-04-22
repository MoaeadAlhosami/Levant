import React, { useEffect, useState } from 'react';
import api from '../../api/index';
import TablesList from '../../components/Admin/TablesList';
import OrderForm from '../../components/Admin/OrderForm';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Table } from '../../types';
import { useTranslation } from 'react-i18next';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [tables, setTables] = useState<Table[]>([]);
  const [selected, setSelected] = useState<Table | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const resp = await api.get<{ data: Table[] }>('/admin_api/show_tables');
      setTables(resp.data.data);
    } catch {
      toast.error(t('fetch_tables_failed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [t]);

  const handleOrderSubmit = async () => {
    setLoading(true);
    try {
      toast.success(t('order_sent_successfully'));
      setSelected(null);
      await fetchTables();
    } catch {
      toast.error(t('refresh_tables_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">{t('orders_management')}</h1>

      {loading && <Spinner />}

      {!loading && !selected && (
        <TablesList tables={tables} onSelect={setSelected} />
      )}

      {!loading && selected && (
        <OrderForm
          table={selected}
          onCancel={() => setSelected(null)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

export default OrderPage;
