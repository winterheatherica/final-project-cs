// src/pages/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter dari next/navigation
import { logIn } from '../../firebase/auth';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Inisialisasi useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await logIn(emailOrUsername, password);
      console.log('User logged in');
      router.push('/'); // Redirect ke halaman dashboard setelah login berhasil
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='py-20'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailOrUsername">Email or Username:</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Login;
