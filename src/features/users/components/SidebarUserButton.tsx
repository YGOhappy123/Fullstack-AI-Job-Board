import { Suspense } from 'react'
import { LogOutIcon } from 'lucide-react'
import { CustomSignOutButton } from '@/services/clerk/components/AuthButtons'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { getCurrentUser } from '@/services/clerk/lib/getCurrentAuth'
import SidebarUserButtonClient from '@/features/users/components/_SidebarUserButtonClient'

const SidebarUserButton = () => {
    return (
        <Suspense>
            <SidebarUserButtonSuspense />
        </Suspense>
    )
}

const SidebarUserButtonSuspense = async () => {
    const { user } = await getCurrentUser({ allData: true })

    // Handle uncommon error: User is not synced from Webhook to DB
    if (user == null) {
        return (
            <CustomSignOutButton>
                <SidebarMenuButton className="cursor-pointer text-red-500!">
                    <LogOutIcon className="mr-1 text-red-700" /> Log Out
                </SidebarMenuButton>
            </CustomSignOutButton>
        )
    }

    return <SidebarUserButtonClient user={user} />
}

export default SidebarUserButton
