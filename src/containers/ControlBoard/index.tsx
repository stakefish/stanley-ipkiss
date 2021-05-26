import React from "react"
import { useDropzone } from "react-dropzone"

import { useController } from "../../helpers/hooks"

const ControlBoard: React.FC = () => {
  const { onDrop } = useController()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: "image/*", onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  )
}

export default ControlBoard
