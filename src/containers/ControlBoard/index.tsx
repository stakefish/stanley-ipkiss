import "@reach/slider/styles.css"

import React from "react"
import { useDropzone } from "react-dropzone"
import { SliderInput, SliderTrack, SliderRange, SliderHandle, SliderMarker } from "@reach/slider"

import {
  CONTROLLER_ROTATION_DEFAULT,
  CONTROLLER_ROTATION_MIN,
  CONTROLLER_ROTATION_MAX,
  CONTROLLER_SCALE_DEFAULT,
  CONTROLLER_SCALE_MIN,
  CONTROLLER_SCALE_MAX,
  CONTROLLER_SCALE_STEP
} from "../../helpers/const"

import { useController } from "../../helpers/hooks"

const ControlBoard: React.FC = () => {
  const { angles, scales, active, rotate, scale, save, drop } = useController()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: "image/*", onDrop: drop })

  const size = scales?.[active] ?? CONTROLLER_SCALE_DEFAULT
  const angle = angles?.[active] ?? CONTROLLER_ROTATION_DEFAULT

  return (
    <>
      <button onClick={save}>Download</button>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>

      <i>Angle: {angle}</i>

      <SliderInput value={angle} min={CONTROLLER_ROTATION_MIN} max={CONTROLLER_ROTATION_MAX} onChange={rotate}>
        <SliderTrack>
          <SliderRange />
          <SliderHandle />
          <SliderMarker value={angle} />
        </SliderTrack>
      </SliderInput>

      <i>Scale: {size}</i>

      <SliderInput
        value={size}
        min={CONTROLLER_SCALE_MIN}
        max={CONTROLLER_SCALE_MAX}
        step={CONTROLLER_SCALE_STEP}
        onChange={scale}
      >
        <SliderTrack>
          <SliderRange />
          <SliderHandle />
          <SliderMarker value={size} />
        </SliderTrack>
      </SliderInput>
    </>
  )
}

export default ControlBoard
