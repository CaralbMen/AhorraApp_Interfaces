import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initDatabaseOnce } from './database/db';
import StackScreens from './screens/stackScreens';
import Login from './screens/Login';

function AppContent() {
  const { user } = useAuth();
  
  // Si no hay usuario autenticado, muestra Login
  // Si hay usuario, muestra el Tab Navigator
  return user ? <StackScreens /> : <Login />;
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initDatabaseOnce();
        setReady(true);
      } catch (e) {
        console.log('Error init DB:', e);
      }
    })();
  }, []);

  if (!ready) return null;

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
