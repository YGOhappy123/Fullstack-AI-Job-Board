import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'
import { LogInIcon } from 'lucide-react'
import { CustomSignedOut } from '@/services/clerk/components/SignInStatuses'
import Link from 'next/link'
import AppSidebar from '@/components/sidebar/AppSidebar'
import SidebarUserButton from '@/features/users/components/SidebarUserButton'

const HomePage = () => {
    return (
        <AppSidebar
            content={
                <SidebarGroup>
                    <SidebarMenu>
                        <CustomSignedOut>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/sign-in">
                                        <LogInIcon />
                                        <span>Log In</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </CustomSignedOut>
                    </SidebarMenu>
                </SidebarGroup>
            }
            footerButton={<SidebarUserButton />}
        >
            <h1>Hello world</h1>
        </AppSidebar>
    )
}

export default HomePage
