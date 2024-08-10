"use client";

import { IconMail } from '@tabler/icons-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';
import { IconMapPin } from '@tabler/icons-react';
import { IconCopyright } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { getAuthStatus } from '../../firebase/auth';

export default function Footer({ show = true }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const currentUser = await getAuthStatus();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching auth status:', error.message);
      }
    };

    fetchUserStatus();
  }, []);

  if (!show || (user && user.type === 'A')) return null;

  return (
    <footer className="bg-[#071135] text-white md:py-8 text-center">
      <div className="container mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4">
          <div className="flex items-center font-medium text-lg">
            <img src="/logo.png" className="object-cover h-16" />
            <p>CSC PNJ</p>
          </div>

          <div className="flex items-center justify-center">
            <IconMapPin stroke={1.5} />
            <p>Politeknik Negeri Jakarta, Depok</p>
          </div>

          <div className="flex flex-col items-center justify-center row-span-2 font-light">
            <h3 className="font-medium text-lg">CONTACT US</h3>
            <div className="border-b w-fit py-2 px-1 mb-2">
              <div className="flex items-center">
                <IconMail stroke={1.5} />
                <p>csc.pnj@gmail.com</p>
              </div>
              <div className="flex items-center">
                <IconBrandWhatsapp stroke={1.5} />
                <p>+62 838 1234 5678</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/cscpnj/" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram stroke={1.5} />
              </a>
              <a href="https://x.com/csc_pnj" target="_blank" rel="noopener noreferrer">
                <IconBrandX stroke={1.5} />
              </a>
            </div>
          </div>

          <div className="text-left flex items-center font-light gap-1">
            <IconCopyright stroke={1.5} />
            <p>2024 CSC PNJ</p>
          </div>

          <div className="text-justify font-light text-sm">
            <p>Computer Student Club (CSC) adalah kelompok studi mahasiswa di Politeknik Negeri Jakarta yang berfokus pada ranah keamanan siber, pengembangan perangkat lunak, dan IoT.</p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4 p-4">
          <div className="flex items-center font-medium gap-1">
            <img src="/logo.png" className="object-cover h-10" />
            <p>CSC PNJ</p>
          </div>
          <div className="flex items-center justify-center text-sm">
            <IconMapPin stroke={1.5} />
            <p>Politeknik Negeri Jakarta, Depok</p>
          </div>
          <div className="text-justify text-xs font-light">
            <p>Computer Student Club (CSC) adalah kelompok studi mahasiswa di Politeknik Negeri Jakarta yang berfokus pada ranah keamanan siber, pengembangan perangkat lunak, dan IoT.</p>
          </div>
          <div className="flex">
            <div className="flex flex-col w-1/2 font-light text-xs justify-center items-center">
              <h3 className="text-sm font-medium pb-2">CONTACT US</h3>
              <div className="">
              <div className="flex items-center">
                <IconMail stroke={1.5} />
                <a href="/contact" className="ml-2">
                  csc.pnj@gmail.com
                </a>
              </div>
                <div className="flex items-center">
                  <IconBrandWhatsapp stroke={1.5} />
                  <p>+62 838 1234 5678</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 gap-5">
              <div className="flex gap-3">
                <a href="https://www.instagram.com/cscpnj/" target="_blank" rel="noopener noreferrer">
                  <IconBrandInstagram stroke={1.5} />
                </a>
                <a href="https://x.com/csc_pnj" target="_blank" rel="noopener noreferrer">
                  <IconBrandX stroke={1.5} />
                </a>
              </div>
              <div className="text-left flex items-center font-light gap-1 text-xs">
                <IconCopyright stroke={1.5} />
                <p>2024 CSC PNJ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
