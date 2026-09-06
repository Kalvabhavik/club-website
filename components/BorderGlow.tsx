"use client"

import { useCallback, useEffect, useRef } from "react"
import type { CSSProperties, ReactNode } from "react"

import "./BorderGlow.css"

interface BorderGlowProps {
  children?: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  colors?: string[]
  fillOpacity?: number
}

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"]
const gradientKeys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"]
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { hue: 40, saturation: 80, lightness: 80 }
  return {
    hue: Number.parseFloat(match[1]),
    saturation: Number.parseFloat(match[2]),
    lightness: Number.parseFloat(match[3]),
  }
}

function buildGlowVars(glowColor: string, intensity: number): Record<string, string> {
  const { hue, saturation, lightness } = parseHsl(glowColor)
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const suffixes = ["", "-60", "-50", "-40", "-30", "-20", "-10"]

  return Object.fromEntries(
    opacities.map((opacity, index) => [
      `--glow-color${suffixes[index]}`,
      `hsl(${hue}deg ${saturation}% ${lightness}% / ${Math.min(opacity * intensity, 100)}%)`,
    ])
  )
}

function buildGradientVars(colors: string[]): Record<string, string> {
  const gradients = gradientKeys.map((key, index) => [
    key,
    `radial-gradient(at ${gradientPositions[index]}, ${colors[Math.min(colorMap[index], colors.length - 1)]} 0px, transparent 50%)`,
  ])

  return Object.fromEntries([
    ...gradients,
    ["--gradient-base", `linear-gradient(${colors[0]} 0 100%)`],
  ])
}

function isLightColor(color: string) {
  const value = color.trim().replace("#", "")
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false
  const hex = value.length === 3 ? value.split("").map((character) => character + character).join("") : value
  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180
}

export function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "185 80 70",
  backgroundColor = "#0b141b",
  borderRadius = 24,
  glowRadius = 32,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#22d3ee", "#34d399", "#fbbf24"],
  fillOpacity = 0.42,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const getCenter = useCallback((element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback((element: HTMLElement, x: number, y: number) => {
    const [centerX, centerY] = getCenter(element)
    const distanceX = x - centerX
    const distanceY = y - centerY
    const scaleX = distanceX === 0 ? Infinity : centerX / Math.abs(distanceX)
    const scaleY = distanceY === 0 ? Infinity : centerY / Math.abs(distanceY)
    return Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1)
  }, [getCenter])

  const getCursorAngle = useCallback((element: HTMLElement, x: number, y: number) => {
    const [centerX, centerY] = getCenter(element)
    if (x === centerX && y === centerY) return 0
    let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    return angle
  }, [getCenter])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const bounds = card.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    card.style.setProperty("--edge-proximity", `${(getEdgeProximity(card, x, y) * 100).toFixed(3)}`)
    card.style.setProperty("--cursor-angle", `${getCursorAngle(card, x, y).toFixed(3)}deg`)
  }, [getCursorAngle, getEdgeProximity])

  useEffect(() => {
    if (!animated || !cardRef.current) return
    const card = cardRef.current
    card.classList.add("sweep-active")
    card.style.setProperty("--edge-proximity", "100")
    const timer = window.setTimeout(() => {
      card.style.setProperty("--edge-proximity", "0")
      card.classList.remove("sweep-active")
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [animated])

  const style = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  } as CSSProperties

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card${isLightColor(backgroundColor) ? " border-glow-card--light" : ""} ${className}`}
      style={style}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}

export default BorderGlow
