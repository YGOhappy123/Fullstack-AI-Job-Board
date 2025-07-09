import { ReactNode } from 'react'
import { SignedIn } from '@clerk/nextjs'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar'
import AppSidebarClient from '@/components/sidebar/_AppSidebarClient'

type AppSidebarProps = {
    content: ReactNode
    footerButton: ReactNode
    children: ReactNode
}

const AppSidebar = ({ content, footerButton, children }: AppSidebarProps) => {
    return (
        <SidebarProvider className="overflow-y-hidden">
            <AppSidebarClient>
                <Sidebar collapsible="icon" className="overflow-hidden">
                    <SidebarHeader className="flex-row">
                        <SidebarTrigger />
                        <span className="text-2xl font-semibold tracking-widest text-nowrap">
                            NextStepFLQ
                        </span>
                    </SidebarHeader>
                    <SidebarContent>{content}</SidebarContent>
                    <SignedIn>
                        <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>{footerButton}</SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </SignedIn>
                </Sidebar>
                <main className="flex-1">{children}</main>
            </AppSidebarClient>
        </SidebarProvider>
    )
}

export default AppSidebar
