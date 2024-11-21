// "use client"
import React, { FC } from 'react'
import { BottomBar } from './bottom-bar'
import { Navbar } from './navbar'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Footer } from './footer'
import { Toaster } from 'sonner'

interface LayoutHomeProps {
    children: React.ReactNode
}

export const LayoutHome: FC<LayoutHomeProps> = ({ children }) => {

    // Create a query client instance
    // const queryClient = new QueryClient();
    return (
        <div className='pb-14 lg:pb-0'>
            {/* <QueryClientProvider client={queryClient}> */}
            <Navbar />
            {children}
            <Footer />
            {/* <BottomBar /> */}
            <Toaster richColors />
            {/* </QueryClientProvider> */}
        </div>
    )
}
