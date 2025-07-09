'use client'

import { ReactNode, Suspense } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useIsDarkMode } from '@/hooks/useIsDarkMode'

type CustomClerkProviderProps = {
    children: ReactNode
}

const CustomClerkProvider = ({ children }: CustomClerkProviderProps) => {
    const isDarkMode = useIsDarkMode()

    return (
        <Suspense>
            <ClerkProvider appearance={isDarkMode ? { baseTheme: [dark] } : undefined}>
                {children}
            </ClerkProvider>
        </Suspense>
    )
}

export default CustomClerkProvider
