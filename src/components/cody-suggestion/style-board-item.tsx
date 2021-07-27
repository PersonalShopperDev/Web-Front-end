import React from 'react'
import { Rnd } from 'react-rnd'

export default function StyleBoardItem({
  url,
}: {
  url: string
}) {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      }}
      bounds="parent"
    >
      <img src={url} width="100%" height="100%" alt="removed_item" draggable="false" />
    </Rnd>
  )
}
