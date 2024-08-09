// components/RequireAuth.js

'use client'; // Menandai ini sebagai komponen klien

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthStatus } from './auth';

const RequireAuth = ({ children, allowedTypes }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await getAuthStatus();
        if (!currentUser || !allowedTypes.includes(currentUser.type)) {
          router.push('/no-access'); // Redirect to no-access if not authorized
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        router.push('/no-access'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [router, allowedTypes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // or some loading indicator
  }

  return <>{children}</>;
};

export default RequireAuth;
