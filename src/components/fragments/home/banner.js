'use client';

import React, { useRef, useState, useEffect } from 'react';
import { getPickedDate } from '../../../firebase/database'; 

export default function Banner() {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [buttonText, setButtonText] = useState('Loading...');
    const [registrationDate, setRegistrationDate] = useState({ open: '', close: '' });

    const interval = useRef(null);

    const startTimer = () => {
        const now = new Date().getTime();
        const openDate = new Date(registrationDate.open).getTime();
        const closeDate = new Date(registrationDate.close).getTime();
        

        let targetDate;
        let buttonText = '';

        if (now < openDate) {
            targetDate = openDate;
            buttonText = 'Coming Soon';
        } else if (now >= openDate && now <= closeDate) {
            targetDate = closeDate;
            buttonText = 'JOIN WITH US';
        } else {
            targetDate = now; 
            buttonText = 'Sudah Tutup';
        }

        interval.current = setInterval(() => {
            const now = new Date().getTime(); 
        
            const countdown = targetDate - now;
        
            if (countdown < 0) {
                clearInterval(interval.current);
                setTimerDays('00');
                setTimerHours('00');
                setTimerMinutes('00');
                setTimerSeconds('00');
                setButtonText(buttonText);
                return;
            }
        
            const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
        
            setTimerDays(days.toString().padStart(2, '0'));
            setTimerHours(hours.toString().padStart(2, '0'));
            setTimerMinutes(minutes.toString().padStart(2, '0'));
            setTimerSeconds(seconds.toString().padStart(2, '0'));
            setButtonText(buttonText);
        }, 1000);
        
    };

    useEffect(() => {
        const fetchPickedDate = async () => {
            try {
                const pickedDate = await getPickedDate();
                setRegistrationDate(pickedDate);
            } catch (error) {
                console.error('Error fetching picked date:', error);
            }
        };

        fetchPickedDate();
    }, []);

    useEffect(() => {
        if (registrationDate.open && registrationDate.close) {
            startTimer();
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [registrationDate]);

    return (
        <div className="md:px-32 flex flex-col md:flex-row-reverse h-screen items-center gap-3 bg-[#071135]">
            <div className="bg-gray-600 w-full md:w-2/5 h-1/3 md:h-1/2 p-4 md:rounded">
                {/* Optional: Add content or image here */}
            </div>
            <div className="md:w-3/5 flex flex-col gap-4 px-4 py-6">
                {/* desc */}
                <h1 className="text-4xl font-medium text-white">UNLIMITED CONNECTION</h1>
                <p className="text-justify font- text-white">Computer Student Club (CSC) adalah kelompok studi mahasiswa di Politeknik Negeri Jakarta yang berfokus pada ranah keamanan siber, pengembangan perangkat lunak, dan IoT.</p>

                {/* countdown */}
                <div className="grid grid-cols-7 grid-rows-2 w-fit text-center text-white">
                    <span className="text-3xl">{timerDays}</span>
                    <span className="text-3xl">:</span>
                    <span className="text-3xl">{timerHours}</span>
                    <span className="text-3xl">:</span>
                    <span className="text-3xl">{timerMinutes}</span>
                    <span className="text-3xl">:</span>
                    <span className="text-3xl">{timerSeconds}</span>
                    <span className="text-sm font-light">Days</span>
                    <span className="text-sm font-light"></span>
                    <span className="text-sm font-light">Hours</span>
                    <span className="text-sm font-light"></span>
                    <span className="text-sm font-light">Minutes</span>
                    <span className="text-sm font-light"></span>
                    <span className="text-sm font-light">Seconds</span>
                </div>

                {/* button */}
                <a href={buttonText === 'JOIN WITH US' ? '/register' : '#'} className="w-fit border bg-white text-[#071135] px-5 py-3 rounded font-medium hover:text-white hover:bg-[#071135]">
                    {buttonText}
                </a>
            </div>
        </div>
    );
}
