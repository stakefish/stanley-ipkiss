import React from "react"

import { useFaceAPI } from "../helpers/hooks"

import Layout from "./Layout"

import ControlBoard from "../containers/ControlBoard"
import ArtBoard from "../containers/ArtBoard"

const App: React.FC = () => {
  const { ready, error } = useFaceAPI()

  return (
    <Layout>
      {ready ? (
        <>
          <ControlBoard />
          <ArtBoard />
        </>
      ) : null}

      {error ? <span>aw, snap!</span> : null}
    </Layout>
  )
}

export default App
