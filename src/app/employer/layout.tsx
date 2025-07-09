import { ReactNode } from 'react'

type EmployerLayoutProps = {
    children: ReactNode
}

const EmployerLayout = ({ children }: EmployerLayoutProps) => {
    return <div>{children}</div>
}

export default EmployerLayout
