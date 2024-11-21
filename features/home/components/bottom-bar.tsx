'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export const BottomBar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (
        <div className='w-full fixed bottom-0 xl:hidden left-0 bg-white shadow-md flex justify-between rounded-lg'
        >
            <Link
                href='/'
                className={`p-4 w-1/3 flex flex-col items-center font-bold ${ isActive("/") ? 'bg-red-500 text-white' : 'bg-white text-gray-500' }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                Home
            </Link>
            <Link
                href='/menu'
                className={`p-4 w-1/3 flex flex-col items-center font-bold ${ isActive("/menu") ? 'bg-red-500 text-white' : 'bg-white text-gray-500' }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" /></svg>
                Menu
            </Link>
            <Link
                href='/ubicacion'
                className={`p-4 w-1/3 flex flex-col items-center font-bold ${ isActive("/ubicacion") ? 'bg-red-500 text-white' : 'bg-white text-gray-500' }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                Ubicación
            </Link>
        </div>
    )
}
