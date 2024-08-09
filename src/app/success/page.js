'use client';

import { useRouter } from 'next/navigation';

export default function Success() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className='pt-20 text-center'>
            <h1>Registration Successful!</h1>
            <p>Your registration has been completed successfully.</p>
            <button
                onClick={handleGoHome}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
            >
                Back to Home
            </button>
        </div>
    );
}
