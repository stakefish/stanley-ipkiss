import React, { ReactNode, useCallback, useState } from "react"
import downloadjs from "downloadjs"
import { IPoint } from "face-api.js"
import { toPng } from "html-to-image"
import { update } from "ramda"

import { ACTIVE_MASK_DEFAULT } from "../helpers/const"

interface ContextType {
  file?: string
  masks?: string[]
  rotation?: number[]
  translate?: IPoint[]
  selectedMask: number
  clearMasks: () => void
  selectMask: (index: number) => void
  rotateMask: (rotation: number) => void
  moveMask: (translate: IPoint) => void
  addMask: (mask: string, angle: number, translation: IPoint) => void
  exportMask: (artBoard: HTMLDivElement, face: HTMLImageElement) => void
  onDrop: (files: File[]) => void
}

interface Props {
  children: ReactNode | JSX.Element | JSX.Element[]
}

const ControllerContext: React.Context<ContextType> = React.createContext({} as ContextType)

export const ControllerProvider: React.FC<Props> = ({ children }: Props) => {
  const [file, setFile] = useState<string | undefined>()
  const [selectedMask, setSelectedMask] = useState<number>(ACTIVE_MASK_DEFAULT)

  const [masks, setMasks] = useState<string[]>([])
  const [rotation, setRotation] = useState<number[]>([])
  const [translate, setTranslate] = useState<IPoint[]>([])

  const addMask = useCallback(
    (mask: string, angle: number, translation: IPoint) => {
      setMasks([...masks, mask])
      setRotation([...rotation, angle])
      setTranslate([...translate, translation])
    },
    [masks, translate, rotation]
  )

  const rotateMask = useCallback(
    (angle: number) => {
      setRotation(update(selectedMask, angle))
    },
    [selectedMask, rotation]
  )

  const moveMask = useCallback(
    (translation: IPoint) => {
      setTranslate(update(selectedMask, translation))
    },
    [selectedMask, translate]
  )

  const selectMask = useCallback(
    (index: number) => {
      setSelectedMask(index)
    },
    [selectedMask]
  )

  const exportMask = useCallback(
    async (artBoard: HTMLDivElement, face: HTMLImageElement) => {
      try {
        const source = await toPng(artBoard, {
          canvasWidth: face.naturalWidth,
          canvasHeight: face.naturalHeight
        })
        downloadjs(source, "mask.png")
      } catch (error) {
        console.error(error)
      }
    },
    [selectMask]
  )

  const clearMasks = useCallback(() => {
    setMasks([])
    setRotation([])
    setTranslate([])
    setSelectedMask(ACTIVE_MASK_DEFAULT)
  }, [selectMask])

  const onDrop = useCallback(
    ([file]: File[]) => {
      clearMasks()
      setFile(URL.createObjectURL(file))
    },
    [file]
  )

  return (
    <ControllerContext.Provider
      value={{
        file,
        masks,
        rotation,
        translate,
        rotateMask,
        selectedMask,
        moveMask,
        selectMask,
        clearMasks,
        addMask,
        exportMask,
        onDrop
      }}
    >
      {children}
    </ControllerContext.Provider>
  )
}

export default ControllerContext
