"use client"

import { useEffect, useRef } from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

import "./Grainient.css"

interface GrainientProps {
  timeSpeed?: number
  colorBalance?: number
  warpStrength?: number
  warpFrequency?: number
  warpSpeed?: number
  warpAmplitude?: number
  blendAngle?: number
  blendSoftness?: number
  rotationAmount?: number
  noiseScale?: number
  grainAmount?: number
  grainScale?: number
  grainAnimated?: boolean
  contrast?: number
  gamma?: number
  saturation?: number
  centerX?: number
  centerY?: number
  zoom?: number
  color1?: string
  color2?: string
  color3?: string
  lightMode?: boolean
  className?: string
}

type GrainientContext = {
  renderer: InstanceType<typeof Renderer>
  program: InstanceType<typeof Program>
  mesh: InstanceType<typeof Mesh>
}

const contextMap = new WeakMap<HTMLDivElement, GrainientContext>()

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 point = (uv - 0.5 + uCenterOffset) / max(uZoom, 0.001);
  float time = iTime * uTimeSpeed;
  float field = noise(point * 2.2 + vec2(time * 0.12, -time * 0.08));
  float wave = sin(point.y * uWarpFrequency + time * uWarpSpeed) * 0.5 + 0.5;
  point.x += (wave - 0.5) * uWarpStrength * 0.16;
  point.y += sin(point.x * (uWarpFrequency * 0.7) - time) * uWarpAmplitude * 0.0008;

  float blend = smoothstep(-0.6, 0.7, point.x + field * 0.75);
  vec3 color = mix(uColor3, uColor2, blend);
  color = mix(color, uColor1, smoothstep(0.25, 0.95, point.y + field * 0.35));

  vec2 grainPoint = uv * max(uGrainScale, 0.001);
  if (uGrainAnimated > 0.5) grainPoint += iTime * 0.05;
  float grain = hash(grainPoint) - 0.5;
  color += grain * uGrainAmount;
  color = (color - 0.5) * uContrast + 0.5;
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(luminance), color, uSaturation);
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return [1, 1, 1]
  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ]
}

export default function Grainient({
  timeSpeed = 0.25,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.35,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = "#34d399",
  color2 = "#22d3ee",
  color3 = "#07131a",
  className = "",
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    const gl = renderer.gl
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: timeSpeed },
        uWarpStrength: { value: warpStrength },
        uWarpFrequency: { value: warpFrequency },
        uWarpSpeed: { value: warpSpeed },
        uWarpAmplitude: { value: warpAmplitude },
        uGrainAmount: { value: grainAmount },
        uGrainScale: { value: grainScale },
        uGrainAnimated: { value: grainAnimated ? 1 : 0 },
        uContrast: { value: contrast },
        uSaturation: { value: saturation },
        uCenterOffset: { value: new Float32Array([centerX, centerY]) },
        uZoom: { value: zoom },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    contextMap.set(container, { renderer, program, mesh })

    const resize = () => {
      const bounds = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height))
      const resolution = (program.uniforms.iResolution as { value: Float32Array }).value
      resolution[0] = gl.drawingBufferWidth
      resolution[1] = gl.drawingBufferHeight
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let animationFrame = 0
    const startTime = performance.now()
    const render = (time: number) => {
      ;(program.uniforms.iTime as { value: number }).value = (time - startTime) * 0.001
      renderer.render({ scene: mesh })
      animationFrame = requestAnimationFrame(render)
    }
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      contextMap.delete(container)
      if (canvas.parentNode === container) container.removeChild(canvas)
    }
  }, [centerX, centerY, color1, color2, color3, contrast, grainAnimated, grainAmount, grainScale, saturation, timeSpeed, warpAmplitude, warpFrequency, warpSpeed, warpStrength, zoom])

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />
}
