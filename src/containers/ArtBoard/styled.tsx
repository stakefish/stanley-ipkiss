import styled from "styled-components"

export const Board = styled.div`
  overflow: hidden;
  user-select: none;
  position: relative;
`

export const Mask = styled.img`
  cursor: move;
  display: block;
  user-drag: none;
  position: absolute;
`

export const Cover = styled.img`
  width: 100%;
  display: block;
  user-drag: none;
`
