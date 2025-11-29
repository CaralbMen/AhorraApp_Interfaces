import React, { useEffect, useState } from 'react';
import Login from './screens/Login';
import { initDatabaseOnce } from './database/db';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initDatabaseOnce();
        setReady(true);
      } catch (error) {
        console.warn('Error BD:', error);
      }
    })();
  }, []);

  if (!ready) return null;
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
