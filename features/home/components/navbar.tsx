import React from 'react'
import Link from 'next/link'
import { ButtonToggle } from './button-toggle'

export const Navbar = () => {
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center dark:bg-gray-700 dark:text-white transition-colors">
                <Link className="flex items-center justify-center" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-news"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" /><path d="M8 8l4 0" /><path d="M8 12l4 0" /><path d="M8 16l4 0" /></svg>
                    <span className="sr-only">Noticias Perú</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                    <ButtonToggle />
                    {/* <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pagos">
                        Suscripciones
                    </Link> */}
                </nav>
            </header>
        </>
    )
}
