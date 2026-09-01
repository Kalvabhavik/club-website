"use client"

import TargetCursor from "./TargetCursor"

export default function TargetCursorWrapper() {
  return (
    <TargetCursor
      spinDuration={2}
      hideDefaultCursor={true}
      parallaxOn={true}
    />
  )
}

