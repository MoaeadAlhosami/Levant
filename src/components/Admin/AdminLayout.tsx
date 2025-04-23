import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useTranslation } from 'react-i18next';

const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <header
        className="
          sticky top-0 z-40 flex items-center justify-between
          bg-white px-6 py-4 shadow-sm
        "
      >
        <h1 className="text-xl font-bold tracking-wide text-gray-800">
          {t('admin_panel')}
        </h1>

        <div className="flex gap-2">
          <Button onClick={() => navigate('/admin/orders')}>
            {t('orders')}
          </Button>
          <Button onClick={() => navigate('/admin/ads')}>
            {t('ads')}
          </Button>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
