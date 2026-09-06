import React, { useCallback, useState } from 'react';
import { TeamCard3D } from './TeamCard3D';
import { MemberSpotlight } from './MemberSpotlight';
import { TeamMember } from '../types/team';

interface TeamShowcaseProps {
  members: TeamMember[];
  eyebrow?: string;
  heading: string;
  intro?: string;
  tilt?: boolean;
}

export function TeamShowcase({
  members,
  eyebrow,
  heading,
  intro,
  tilt = true
}: TeamShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback(
    (id: string) => {
      const index = members.findIndex((member) => member.id === id);
      if (index !== -1) setOpenIndex(index);
    },
    [members]
  );

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + members.length) % members.length;
      });
    },
    [members.length]
  );

  return (
    <section className="w-full bg-neutral-950 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {eyebrow && <p className="text-sm text-amber-300">{eyebrow}</p>}
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white lg:text-6xl">
            {heading}
          </h2>
          {intro &&
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              {intro}
            </p>
          }
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[224px] lg:grid-cols-4">
          {members.map((member, index) =>
            <li
              key={member.id}
              className={[
                index === 0 ?
                  'h-[420px] sm:col-span-2 sm:h-[380px] lg:col-span-2 lg:row-span-2 lg:h-full' :
                  'h-[320px] lg:h-full'].
                join(' ')}>

              <TeamCard3D
                member={member}
                featured={index === 0}
                tilt={tilt}
                onOpen={open} />

            </li>
          )}
        </ul>

        <p className="mt-6 text-sm text-neutral-500">
          Select anyone to open their full profile. Use the arrow keys to move
          between people, Esc to close.
        </p>
      </div>

      <MemberSpotlight
        member={openIndex === null ? null : members[openIndex]}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        position={{ index: openIndex ?? 0, total: members.length }} />

    </section>);

}