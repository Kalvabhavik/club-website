import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion } from
'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { TeamMember } from '../types/team';

interface TeamCard3DProps {
  member: TeamMember;
  featured?: boolean;
  tilt?: boolean;
  onOpen: (id: string) => void;
}

export function TeamCard3D({
  member,
  featured = false,
  tilt = true,
  onOpen
}: TeamCard3DProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const active = tilt && !reduceMotion;

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 260, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring);
  const lift = useSpring(useMotionValue(0), spring);
  const sheen = useSpring(useMotionValue(0), spring);
  const photoShift = useTransform(px, [-0.5, 0.5], ['3%', '-3%']);

  function handleMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleEnter() {
    if (!active) return;
    lift.set(26);
    sheen.set(0.14);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
    lift.set(0);
    sheen.set(0);
  }

  return (
    <div
      className="group relative h-full w-full"
      style={{ perspective: 1200 }}>
      
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onOpen(member.id)}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        onBlur={handleLeave}
        aria-label={`View profile of ${member.name}, ${member.role}`}
        className="relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 text-left outline-none ring-offset-4 ring-offset-neutral-950 focus-visible:ring-2 focus-visible:ring-amber-300"
        style={
        active ?
        {
          rotateX,
          rotateY,
          z: lift,
          transformStyle: 'preserve-3d'
        } :
        undefined
        }>
        
        <motion.img
          src={member.photo}
          alt=""
          className="absolute inset-0 h-full w-[106%] max-w-none object-cover object-top"
          style={active ? { x: photoShift } : undefined}
          draggable={false} />
        

        {/* legibility scrim for the caption block */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-neutral-950/20 transition-colors duration-200 ease-out group-hover:bg-neutral-950/0" />

        {/* specular sheen, driven by tilt */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white"
          style={{ opacity: sheen }} />
        

        <motion.div
          className="relative flex h-full flex-col justify-end p-5"
          style={
          active ? { transformStyle: 'preserve-3d', z: 40 } : undefined
          }>
          
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3
                className={[
                'truncate font-medium tracking-tight text-white',
                featured ? 'text-2xl lg:text-3xl' : 'text-lg'].
                join(' ')}>
                
                {member.name}
              </h3>
              <p className="mt-0.5 truncate text-sm text-neutral-300">
                {member.role}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-white/60">
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </motion.div>
      </motion.button>
    </div>);

}