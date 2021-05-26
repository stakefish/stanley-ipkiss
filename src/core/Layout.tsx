import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { ControllerProvider } from "./Controller"

interface Props {
  children: JSX.Element | JSX.Element[] | ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const theme = {
    colors: {},
    fontSize: {},
    fontWeight: {}
  }

  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <ControllerProvider>{children}</ControllerProvider>
      </DndProvider>
    </ThemeProvider>
  )
}

export default Layout
