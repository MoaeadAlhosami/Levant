import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(userName, password);
      toast.success(`${t('submit')} ${t('title')}`);
      navigate('/admin/ads', { replace: true });
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
    {loading ? (
      <Spinner />
    ) : (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg bg-white p-10 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {t('title')}
        </h2>

          <div>
            <label className="mb-1 block font-medium">{t('username')}</label>
            <Input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">{t('password')}</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t('submit')}
          </Button>
        </form>
      )}
    </main>
  );
};

export default LoginPage;
