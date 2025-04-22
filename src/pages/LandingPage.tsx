import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">{t('welcome_to_levant')}</h1>
      <div className="space-y-4 w-full max-w-sm">
        <Button onClick={() => navigate('/restaurant')} className="w-full">
          {t('user_interface')}
        </Button>
        <Button onClick={() => navigate('/admin/login')} className="w-full">
          {t('admin_dashboard')}
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
