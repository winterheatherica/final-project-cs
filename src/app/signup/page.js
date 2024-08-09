'use client';

import { useState } from 'react';
import { signUp } from '../../firebase/auth';
import { addUserToDatabase } from '../../firebase/database';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  // SignUp.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !username) {
      setError('All fields are required.');
      return;
    }

    try {
      const user = await signUp(email, password, username);
      console.log('User signed up and data added to Realtime Database');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className='py-20'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SignUp;
