import { ReactNode, Suspense } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

type CustomSignedInProps = {
    children: ReactNode
}

export const CustomSignedIn = ({ children }: CustomSignedInProps) => {
    return (
        <Suspense>
            <SignedIn>{children}</SignedIn>
        </Suspense>
    )
}

type CustomSignedOutProps = {
    children: ReactNode
}

export const CustomSignedOut = ({ children }: CustomSignedOutProps) => {
    return (
        <Suspense>
            <SignedOut>{children}</SignedOut>
        </Suspense>
    )
}
