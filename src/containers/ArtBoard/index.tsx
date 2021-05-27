import React, { useCallback, useEffect } from "react"
import Draggable from "react-draggable"
import { IPoint } from "face-api.js"

import { MASK, MASK_WIDTH, MASK_HEIGHT, SCALE_FACTOR } from "../../helpers/const"

import { useController } from "../../helpers/hooks"
import { detectFaceLandmarks } from "../../helpers/utils"

import { Board, Image, Cover, Box } from "./styled"

const ArtBoard: React.FC = () => {
  const { artboardRef, faceRef, file, masks, scales, angles, coordinates, create, select, move } = useController()

  const detect = useCallback(async () => {
    if (faceRef?.current && artboardRef?.current) {
      const { rotation, position } = await detectFaceLandmarks(faceRef.current, artboardRef.current)
      create(MASK, rotation, position)
    }
  }, [file, faceRef, artboardRef])

  const width = MASK_WIDTH
  const height = MASK_HEIGHT

  const positionOffset = {
    x: -width / SCALE_FACTOR,
    y: -height / SCALE_FACTOR
  }

  useEffect(() => {
    detect()
  }, [file, faceRef])

  return (
    <Board ref={artboardRef}>
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

      {file ? <Cover src={file} ref={faceRef} /> : null}
    </Board>
  )
}

export default ArtBoard
