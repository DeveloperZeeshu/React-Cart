import type { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

const Container = ({ children }: LayoutProps) => {
    return <div className="max-w-7xl flex justify-center items-center flex-col mx-auto my-auto px-6 py-12 pt-28">{children}</div>
}

export default Container
