// // src/components/Navbar.js
// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import logo from '../../../public/next.svg';

// export default function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <nav className="bg-[#071135] text-white fixed w-screen">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Image src={logo} alt="Logo" width={40} height={40} />
//         </div>

//         {/* Navigation Links for Desktop */}
//         <div className="hidden md:flex space-x-9 justify-center flex-1">
//           <a href="/" className="hover:text-[#0E1E76]">Home</a>
//           <a href="/about" className="hover:text-[#0E1E76]">About</a>
//           <a href="/division" className="hover:text-[#0E1E76]">Division</a>
//           <a href="/event" className="hover:text-[#0E1E76]">Event</a>
//           <a href="/contact" className="hover:text-[#0E1E76]">Contact</a>
//         </div>

//         {/* Login Button for Desktop */}
//         <div className="hidden md:block">
//             <a href="/register" className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Login</a>
//         </div>

//         {/* Burger Menu for Mobile */}
//         <div className="md:hidden">
//           <button onClick={() => setSidebarOpen(true)}>
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Sidebar for Mobile */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-[#071135] text-white w-3/5 transform ${
//           sidebarOpen ? 'translate-x-0' : 'translate-x-full'
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="flex flex-col p-4 space-y-4">
//           <div className="flex justify-end">
//             <button onClick={() => setSidebarOpen(false)}>
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
//           <a href="/" className="hover:text-[#0E1E76]">Home</a>
//           <a href="/about" className="hover:text-[#0E1E76]">About</a>
//           <a href="/division" className="hover:text-[#0E1E76]">Division</a>
//           <a href="/event" className="hover:text-[#0E1E76]">Event</a>
//           <a href="/contact" className="hover:text-[#0E1E76]">Contact</a>
//           <button className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded mt-4">
//             <a href="/register" className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Login</a>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../public/next.svg';
import { getAuthStatus, logOut } from '../../firebase/auth';
import Link from 'next/link';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await getAuthStatus();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching auth status:', error.message);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="bg-[#071135] text-white fixed w-screen">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} />
        </div>
        <div className="hidden md:flex space-x-9 justify-center flex-1">
          {user?.type === 'A' && <Link href="/dashboard" className="hover:text-[#0E1E76]">Dashboard</Link>}
          <Link href="/" className="hover:text-[#0E1E76]">Home</Link>
          <Link href="/about" className="hover:text-[#0E1E76]">About</Link>
          <Link href="/division" className="hover:text-[#0E1E76]">Division</Link>
          <Link href="/event" className="hover:text-[#0E1E76]">Event</Link>
          {user?.type !== 'A' && <Link href="/contact" className="hover:text-[#0E1E76]">Contact</Link>}
        </div>
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Halo, {user.username}</span>
              <button onClick={handleLogout} className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Login</Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`fixed top-0 right-0 h-full bg-[#071135] text-white w-3/5 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {user?.type === 'A' && <Link href="/dashboard" className="hover:text-[#0E1E76]">Dashboard</Link>}
          <Link href="/" className="hover:text-[#0E1E76]">Home</Link>
          <Link href="/about" className="hover:text-[#0E1E76]">About</Link>
          <Link href="/division" className="hover:text-[#0E1E76]">Division</Link>
          <Link href="/event" className="hover:text-[#0E1E76]">Event</Link>
          {user?.type !== 'A' && <Link href="/contact" className="hover:text-[#0E1E76]">Contact</Link>}
          <div className="mt-4">
            {user ? (
              <div className="flex flex-col items-start space-y-4">
                <span>Halo, {user.username}</span>
                <button onClick={handleLogout} className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
