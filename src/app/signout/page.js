// src/pages/signout.js

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logOut } from '../../firebase/auth'; // Sesuaikan dengan path yang benar

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logOut();
        router.push('/'); // Redirect ke halaman utama setelah logout
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default SignOut;
