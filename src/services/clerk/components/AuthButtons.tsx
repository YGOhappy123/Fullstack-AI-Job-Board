import { SignInButton, SignUpButton, SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ComponentProps } from 'react'

type CustomSignInButtonProps = ComponentProps<typeof SignInButton>

export const CustomSignInButton = ({
    children = <Button>Sign In</Button>,
    ...props
}: CustomSignInButtonProps) => {
    return <SignInButton {...props}>{children}</SignInButton>
}

type CustomSignUpButtonProps = ComponentProps<typeof SignUpButton>

export const CustomSignUpButton = ({
    children = <Button>Sign Up</Button>,
    ...props
}: CustomSignUpButtonProps) => {
    return <SignUpButton {...props}>{children}</SignUpButton>
}

type CustomSignOutButtonProps = ComponentProps<typeof SignOutButton>

export const CustomSignOutButton = ({
    children = <Button>Sign Out</Button>,
    ...props
}: CustomSignOutButtonProps) => {
    return <SignOutButton {...props}>{children}</SignOutButton>
}
