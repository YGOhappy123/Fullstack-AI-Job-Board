'use client'

import { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { SidebarTrigger } from '@/components/ui/sidebar'

type AppSidebarClientProps = { children: ReactNode }

/**
 * Add custom navigation bar for mobile devices.
 */
const AppSidebarClient = ({ children }: AppSidebarClientProps) => {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div className="flex w-full flex-col">
                <div className="flex items-center gap-1 border-b p-2">
                    <SidebarTrigger />
                    <span className="text-xl">WDS Jobs</span>
                </div>
                <div className="flex flex-1">{children}</div>
            </div>
        )
    }

    return children
}

export default AppSidebarClient
