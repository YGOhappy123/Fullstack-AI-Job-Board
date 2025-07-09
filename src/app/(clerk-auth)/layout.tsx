import { ReactNode } from 'react'

type ClerkAuthLayoutProps = {
    children: ReactNode
}

const ClerkAuthLayout = ({ children }: ClerkAuthLayoutProps) => {
    return <div className="flex h-screen w-screen items-center justify-center">{children}</div>
}

export default ClerkAuthLayout
