import { useEffect, useState } from "react"
import { nets } from "face-api.js"
import { isNil } from "ramda"

export const useFaceAPI = () => {
  const [error, setError] = useState<any>()

  const load = async () => {
    try {
      await Promise.all([nets.tinyFaceDetector.loadFromUri("/models"), nets.faceLandmark68Net.loadFromUri("/models")])
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const ready = isNil(error)

  return {
    ready,
    error
  } as const
}
