import { useState } from 'react';
import useAuth from './hooks/useAuth';
import Button from './components/UI/Button';
import Input from './components/UI/Input';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { login, isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      {!isAuthenticated ? (
        <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow-md">
          <Input
            placeholder={t('username')}
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <Input
            placeholder={t('password')}
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <Button className="w-full" onClick={() => login(user, pass)}>
            {t('login')}
          </Button>
        </div>
      ) : (
        <Button onClick={logout}>{t('logout')}</Button>
      )}
    </main>
  );
}

export default App;
