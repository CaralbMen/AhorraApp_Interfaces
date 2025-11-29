import React, { useEffect, useState } from 'react';
import Login from './screens/Login';
import { initDatabaseOnce, databaseService } from './database/db';

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
  return <Login />;
}
