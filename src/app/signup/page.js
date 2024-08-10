'use client';

import { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { signUp } from '../../firebase/auth';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !username) {
      setError('All fields are required.');
      return;
    }

    try {
      await signUp(email, password, username);
      console.log('User signed up and data added to Realtime Database');
      router.push('/'); // Redirect to home page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <Card color="transparent" shadow={false} className="shadow-lg border px-4 py-10 h-2/3 flex flex-col md:w-1/3">
        <div className="flex flex-col flex-grow">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Create a new account to get started.
          </Typography>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col flex-grow">
            <div className="mb-4 flex flex-col gap-6 flex-grow">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your email"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
              Sign Up
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
