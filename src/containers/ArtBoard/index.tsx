import React, { useCallback, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import { IPoint } from "face-api.js"

import { MASK, MASK_WIDTH, MASK_HEIGHT, SCALE_FACTOR } from "../../helpers/const"

import { useController } from "../../helpers/hooks"
import { detectFaceLandmarks } from "../../helpers/utils"

import { Board, Mask, Cover } from "./styled"

const ArtBoard: React.FC = () => {
  const face = useRef<HTMLImageElement>(null)
  const artBoard = useRef<HTMLImageElement>(null)

  const { file, masks, translate, addMask, selectMask, moveMask, exportMask } = useController()

  const detect = useCallback(async () => {
    if (face?.current && artBoard?.current) {
      const { rotation, translation } = await detectFaceLandmarks(face.current, artBoard.current)
      addMask(MASK, rotation, translation)
    }
  }, [file, face])

  const download = useCallback(() => {
    if (face?.current && artBoard?.current) {
      exportMask(artBoard.current, face.current)
    }
  }, [artBoard, face])

  const width = MASK_WIDTH
  const height = MASK_HEIGHT

  const positionOffset = {
    x: -width / SCALE_FACTOR,
    y: -height / SCALE_FACTOR
  }

  useEffect(() => {
    detect()
  }, [file, face])

  return (
    <>
      <button onClick={download}>Download</button>

      <Board ref={artBoard}>
        {masks?.map((mask, index) => (
          <Draggable
            key={index}
            position={translate?.[index]}
            positionOffset={positionOffset}
            onStop={(_, point) => moveMask(point as IPoint)}
          >
            <Mask width={width} height={height} src={mask} onClick={() => selectMask(index)} />
          </Draggable>
        ))}

        {file ? <Cover src={file} ref={face} /> : null}
      </Board>
    </>
  )
}

export default ArtBoard
