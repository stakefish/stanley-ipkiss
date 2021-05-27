import React, { useCallback, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import { IPoint } from "face-api.js"

import { MASK, MASK_WIDTH, MASK_HEIGHT, SCALE_FACTOR } from "../../helpers/const"

import { useController } from "../../helpers/hooks"
import { detectFaceLandmarks } from "../../helpers/utils"

import { Board, Image, Cover, Box } from "./styled"

const ArtBoard: React.FC = () => {
  const face = useRef<HTMLImageElement>(null)

  const { artBoard, file, masks, scales, angles, coordinates, create, select, move } = useController()

  const detect = useCallback(async () => {
    if (face?.current && artBoard?.current) {
      const { rotation, position } = await detectFaceLandmarks(face.current, artBoard.current)
      create(MASK, rotation, position)
    }
  }, [file, face])

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
    <Board ref={artBoard}>
      {masks?.map((mask, index) => (
        <Draggable
          key={index}
          handle="img"
          position={coordinates?.[index]}
          positionOffset={positionOffset}
          onStop={(_, point) => move(point as IPoint)}
        >
          <Box key={index}>
            <Image
              width={width}
              height={height}
              src={mask}
              angle={angles[index]}
              scale={scales[index]}
              onClick={() => select(index)}
            />
          </Box>
        </Draggable>
      ))}

      {file ? <Cover src={file} ref={face} /> : null}
    </Board>
  )
}

export default ArtBoard
