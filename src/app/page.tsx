'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Datos estáticos de ejemplo


export default function HomePage() {
    const router = useRouter();

    const handleStartJourney = () => {
        router.push('/graph');
    };

    return (

        <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-lime-200 via-green-100 to-teal-100">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-300/40 via-transparent to-teal-200/40"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">
                {/* Logo */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-tight">
                            DARWIN
                        </h1>
                        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                            <Image
                                src="/Darwin.svg"
                                alt="Darwin Logo"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitle */}
                {/* <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-md font-light">
                    Our motto or the purpose of the web
                </p> */}

                {/* CTA Button */}
                <button
                    onClick={handleStartJourney}
                    className="group relative bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-900 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                        <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35"></path>
                    </svg>
                    START THE JOURNEY
                </button>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-lime-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        </div>
    );

}