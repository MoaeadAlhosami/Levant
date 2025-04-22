import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useTranslation } from 'react-i18next';

const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">{t('admin_panel')}</h1>
        <div className="space-x-2">
          <Button onClick={() => navigate('/admin/orders')} className="bg-blue-600">
            {t('orders')}
          </Button>
          <Button onClick={() => navigate('/admin/ads')} className="bg-green-600">
            {t('ads')}
          </Button>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
