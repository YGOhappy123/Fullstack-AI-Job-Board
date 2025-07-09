import { ReactNode } from 'react'

type JobSeekerLayoutProps = {
    children: ReactNode
}

const JobSeekerLayout = ({ children }: JobSeekerLayoutProps) => {
    return <div>{children}</div>
}

export default JobSeekerLayout
