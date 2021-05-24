import React, { ReactNode } from "react"

interface Props {
  children: JSX.Element | JSX.Element[] | ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return <>{children}</>
}

export default Layout
