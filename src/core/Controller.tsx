import React, { MutableRefObject, ReactNode, useCallback, useRef, useState } from "react"
import downloadjs from "downloadjs"
import { update } from "ramda"
import { toPng } from "html-to-image"
import { IPoint } from "face-api.js"

import { ACTIVE_MASK_DEFAULT, CONTROLLER_SCALE_DEFAULT } from "../helpers/const"

interface ContextType {
  artBoard?: MutableRefObject<HTMLDivElement | null>
  file?: string
  masks?: string[]
  angles: number[]
  scales: number[]
  coordinates: IPoint[]
  active: number
  clear: () => void
  select: (index: number) => void
  rotate: (rotation: number) => void
  scale: (scale: number) => void
  move: (translate: IPoint) => void
  create: (mask: string, angle: number, translation: IPoint) => void
  save: (face: HTMLImageElement) => void
  drop: (files: File[]) => void
}

interface Props {
  children: ReactNode | JSX.Element | JSX.Element[]
}

const ControllerContext: React.Context<ContextType> = React.createContext({} as ContextType)

export const ControllerProvider: React.FC<Props> = ({ children }: Props) => {
  const artBoard = useRef<HTMLDivElement>(null)

  const [file, setFile] = useState<string | undefined>()
  const [active, setActive] = useState<number>(ACTIVE_MASK_DEFAULT)

  const [masks, setMasks] = useState<string[]>([])
  const [angles, setAngles] = useState<number[]>([])
  const [scales, setScales] = useState<number[]>([])
  const [coordinates, setCoordinates] = useState<IPoint[]>([])

  const create = useCallback(
    (mask: string, angle: number, position: IPoint) => {
      setMasks([...masks, mask])
      setAngles([...angles, angle])
      setScales([...scales, CONTROLLER_SCALE_DEFAULT])
      setCoordinates([...coordinates, position])
    },
    [masks, coordinates, angles, scales]
  )

  const rotate = useCallback(
    (angle: number) => {
      setAngles(update(active, angle))
    },
    [active, angles]
  )

  const move = useCallback(
    (translation: IPoint) => {
      setCoordinates(update(active, translation))
    },
    [active, coordinates]
  )

  const scale = useCallback(
    (scale: number) => {
      setScales(update(active, scale))
    },
    [active, scales]
  )

  const select = useCallback(
    (index: number) => {
      setActive(index)
    },
    [active]
  )

  const save = useCallback(
    async (face: HTMLImageElement) => {
      if (face && artBoard?.current) {
        try {
          const source = await toPng(artBoard.current, {
            canvasWidth: face.naturalWidth,
            canvasHeight: face.naturalHeight
          })
          downloadjs(source, "mask.png")
        } catch (error) {
          console.error(error)
        }
      }
    },
    [active]
  )

  const clear = useCallback(() => {
    setMasks([])
    setAngles([])
    setCoordinates([])
    setActive(ACTIVE_MASK_DEFAULT)
  }, [active])

  const drop = useCallback(
    ([file]: File[]) => {
      clear()
      setFile(URL.createObjectURL(file))
    },
    [file]
  )

  return (
    <ControllerContext.Provider
      value={{
        artBoard,
        file,
        masks,
        angles,
        scales,
        coordinates,
        rotate,
        scale,
        active,
        move,
        select,
        clear,
        create,
        save,
        drop
      }}
    >
      {children}
    </ControllerContext.Provider>
  )
}

export default ControllerContext
