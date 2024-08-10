"use client";

import { useState, useEffect } from 'react';
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
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const isAdmin = user?.type === 'A';
  const isGuestOrUser = !isAdmin;

  return (
    <>
      {/* Top Navbar for Non-Admin Users */}
      {!isAdmin && (
        <nav className="bg-[#071135] text-white fixed w-screen z-30 top-0">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-1 font-medium">
              <img src="/logo.png" className="h-8" />
              <p>CSC PNJ</p>
            </div>
            <div className="hidden md:flex space-x-9 justify-center flex-1">
              {isGuestOrUser && (
                <>
                  <Link href="/" className="hover:text-[#0E1E76]">Home</Link>
                  <Link href="/about" className="hover:text-[#0E1E76]">About</Link>
                  <Link href="/division" className="hover:text-[#0E1E76]">Division</Link>
                  <Link href="/event" className="hover:text-[#0E1E76]">Event</Link>
                  {isGuestOrUser && <Link href="/contact" className="hover:text-[#0E1E76]">Contact</Link>}
                </>
              )}
            </div>
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span>Halo, {user.username}</span>
                  <button onClick={handleLogout} className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Logout</button>
                </div>
              ) : (
                <Link href="/login" className="border border-white hover:bg-white hover:text-[#030617] text-white px-4 py-2 rounded">Login</Link>
              )}
            </div>
            <div className="md:hidden relative z-40">
              <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Admin Sidebar */}
      {isAdmin && (
        <div className="bg-[#071135] text-white w-64 h-full md:hidden lg:block top-0 left-0 fixed">
          <div className="flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-center w-full mb-6">
              <img src="/logo.png" className="h-8" />
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="/dashboard/user" className="text-white hover:text-blue-gray-700">User</Link>
              <Link href="/dashboard/open-register" className="text-white hover:text-blue-gray-700">Open Registration</Link>
              <Link href="/dashboard/registration" className="text-white hover:text-blue-gray-700">Registration</Link>
              <Link href="/dashboard/message" className="text-white hover:text-blue-gray-700">Message</Link>
              <Link href="/dashboard/activity" className="text-white hover:text-blue-gray-700">Activity</Link>
              <Link href="/dashboard/event" className="text-white hover:text-blue-gray-700">Event</Link>
            </div>
            <div className="mt-auto w-full flex justify-center">
              {user ? (
                <button onClick={handleLogout} className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Logout</button>
              ) : (
                <Link href="/login" className="border border-white hover:bg-white hover:text-[#030617] text-white px-4 py-2 rounded w-full text-center">Login</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 right-0 h-full bg-[#071135] text-white w-3/5 z-20 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40 md:hidden `}>
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex justify-end w-full">
            <button onClick={() => setSidebarOpen(false)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {isAdmin && (
            <>
              <Link href="/dashboard/user" className="text-white hover:text-blue-gray-700">User</Link>
              <Link href="/dashboard/open-register" className="text-white hover:text-blue-gray-700">Open Registration</Link>
              <Link href="/dashboard/registration" className="text-white hover:text-blue-gray-700">Registration</Link>
              <Link href="/dashboard/message" className="text-white hover:text-blue-gray-700">Message</Link>
              <Link href="/dashboard/activity" className="text-white hover:text-blue-gray-700">Activity</Link>
              <Link href="/dashboard/event" className="text-white hover:text-blue-gray-700">Event</Link>
            </>
          )}
          {isGuestOrUser && (
            <>
              <Link href="/" className="text-white hover:text-blue-gray-700">Home</Link>
              <Link href="/about" className="text-white hover:text-blue-gray-700">About</Link>
              <Link href="/division" className="text-white hover:text-blue-gray-700">Division</Link>
              <Link href="/event" className="text-white hover:text-blue-gray-700">Event</Link>
              {isGuestOrUser && <Link href="/contact" className="text-white hover:text-blue-gray-700">Contact</Link>}
            </>
          )}
          <div className="mt-4 flex justify-center">
            {user ? (
              <button onClick={handleLogout} className="bg-[#0E1E76] hover:bg-[#030617] text-white px-4 py-2 rounded">Logout</button>
            ) : (
              <Link href="/login" className="border border-white hover:bg-white hover:text-[#030617] text-white px-4 py-2 rounded w-full text-center">Login</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
