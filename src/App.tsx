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
    <div className="p-8">
      {!isAuthenticated ? (
        <>
          <Input
            placeholder={t('username')}
            value={user}
            onChange={e => setUser(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder={t('password')}
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="mb-4"
          />
          <Button onClick={() => login(user, pass)}>{t('login')}</Button>
        </>
      ) : (
        <Button onClick={logout}>{t('logout')}</Button>
      )}
    </div>
  );
}

export default App;
