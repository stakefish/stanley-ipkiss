import React from "react"

import { useFaceAPI } from "../helpers/hooks"

import Layout from "./Layout"

import Sandbox from "../containers/Sandbox"

const App: React.FC = () => {
  const { ready, error } = useFaceAPI()

  return (
    <Layout>
      {ready ? <Sandbox /> : null}
      {error ? <span>aw, snap!</span> : null}
    </Layout>
  )
}

export default App
