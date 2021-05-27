import { detectSingleFace, TinyFaceDetectorOptions, Point, IPoint } from "face-api.js"
import { isNil } from "ramda"

import { ONE_RADIAN_IN_DEGREES, CONTROLLER_ROTATION_DEFAULT, SCALE_FACTOR } from "../helpers/const"

export const angleBetweenPoints = (left: IPoint, right: IPoint) => {
  const dy = right.y - left.y
  const dx = right.x - left.x
  const theta = Math.atan2(dy, dx)

  return theta * ONE_RADIAN_IN_DEGREES
}

export const average = (points: Point[] | undefined): IPoint | undefined => {
  if (isNil(points)) {
    return undefined
  }

  const { x, y } = points.reduce(
    (total, point) => ({
      x: total.x + point.x,
      y: total.y + point.y
    }),
    { x: 0, y: 0 }
  )

  return {
    x: x / points.length,
    y: y / points.length
  }
}

export const detectFaceLandmarks = async (face: HTMLImageElement, artBoard: HTMLDivElement) => {
  const options = new TinyFaceDetectorOptions()
  const detector = await detectSingleFace(face, options).withFaceLandmarks()

  const nose = average(detector?.landmarks.getNose())
  const leftEye = average(detector?.landmarks.getLeftEye())
  const rightEye = average(detector?.landmarks.getRightEye())
  const scale = artBoard.offsetWidth / face.naturalWidth

  if (leftEye && rightEye && nose) {
    return {
      position: {
        x: nose.x * scale,
        y: Math.min(leftEye.y, rightEye.y) * scale
      },
      rotation: angleBetweenPoints(leftEye, rightEye)
    } as const
  }

  return {
    position: {
      x: artBoard.offsetWidth / SCALE_FACTOR,
      y: artBoard.offsetHeight / SCALE_FACTOR
    },
    rotation: CONTROLLER_ROTATION_DEFAULT
  } as const
}
