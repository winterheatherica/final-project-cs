'use client';

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logIn } from '../../firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if inputs are empty
    if (!username.trim() || !password.trim()) {
      setError('Both fields are required.');
      return;
    }

    try {
      const user = await logIn(username, password);
      console.log('User:', user); // Log user object
      console.log('User type:', user.type); // Log user type

      // Redirect based on user type
      if (user.type === 'A') {
        router.push('/dashboard/user'); // Redirect admin to admin dashboard
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <Card color="transparent" shadow={false} className="shadow-lg border px-4 py-10 h-2/3 flex flex-col md:w-1/3">
        <div className="flex flex-col flex-grow">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details and enjoy your journey.
          </Typography>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col flex-grow">
            <div className="mb-4 flex flex-col gap-6 flex-grow">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your username"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {error && <p className="text-red-700 text-left">{error}</p>}
            </div>
            <Button type="submit" className="mt-auto" fullWidth>
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Typography color="gray">
              Don't have an account? 
              <a href="/signup" className="text-blue-600 hover:underline ml-1">
                Sign Up
              </a>
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
