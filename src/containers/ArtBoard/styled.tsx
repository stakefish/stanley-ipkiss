import styled from "styled-components"

interface ImageProps {
  angle: number
  scale: number
}

export const Image = styled.img<ImageProps>`
  cursor: move;
  display: block;
  user-drag: none;
  transform: ${(props) => `rotate(${props.angle}deg) scale(${props.scale})`};
`

export const Board = styled.div`
  max-width: 500px;
  overflow: hidden;
  user-select: none;
  position: relative;
`

export const Box = styled.div`
  position: absolute;
`

export const Cover = styled.img`
  width: 100%;
  display: block;
  user-drag: none;
`
