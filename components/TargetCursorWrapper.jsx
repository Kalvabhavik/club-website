"use client"

import TargetCursor from "./TargetCursor"

export default function TargetCursorWrapper() {
  return (
    <TargetCursor
      targetSelector=".my-target, a, button, input, select, [role='button']"
      spinDuration={0}
      hideDefaultCursor={true}
      parallaxOn={true}
      hoverDuration={0.2}
      cursorColor="#ffffff"
      cursorColorOnTarget="#ffffff"
    />
  )
}

