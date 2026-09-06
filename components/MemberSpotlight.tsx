import React, { useEffect, useRef } from 'react';
import {
  XIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  CalendarIcon } from
'lucide-react';
import { TeamMember } from '../types/team';

interface MemberSpotlightProps {
  member: TeamMember | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  position: {index: number;total: number;};
}

export function MemberSpotlight({
  member,
  onClose,
  onPrev,
  onNext,
  position
}: MemberSpotlightProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(member);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, onNext, onPrev]);

  return (
    member &&
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="spotlight-name"
        className="fixed inset-0 z-50 bg-neutral-950"
        >
        
          <div
          className="grid h-full w-full grid-rows-[auto_1fr] overflow-y-auto lg:grid-cols-[45%_55%] lg:grid-rows-1 lg:overflow-hidden"
          >
          
            {/* Photo — left */}
            <div className="relative h-[46vh] min-h-[280px] overflow-hidden bg-neutral-900 lg:h-full">
              <img
              key={member.id}
              src={member.photo}
              alt={`Portrait of ${member.name}`}
              className="h-full w-full object-cover object-top"
              />
            
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-neutral-950/70 px-6 py-4 lg:px-10">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                  {position.index + 1} of {position.total}
                </span>
                <div className="flex gap-2">
                  <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous team member"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white outline-none transition-colors duration-150 ease-out hover:border-white/60 focus-visible:ring-2 focus-visible:ring-amber-300">
                  
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next team member"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white outline-none transition-colors duration-150 ease-out hover:border-white/60 focus-visible:ring-2 focus-visible:ring-amber-300">
                  
                    <ArrowRightIcon className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {/* Description — right */}
            <div className="relative flex flex-col lg:h-full lg:overflow-y-auto">
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-neutral-950/80 text-neutral-200 outline-none transition-colors duration-150 ease-out hover:border-white/50 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300">
              
                <XIcon className="h-5 w-5" aria-hidden />
              </button>

              <div className="mx-auto w-full max-w-2xl px-6 py-12 lg:px-14 lg:py-20">
                <p className="text-sm text-amber-300">{member.role}</p>
                <h2
                id="spotlight-name"
                className="mt-3 text-4xl font-medium tracking-tight text-white lg:text-6xl">
                
                  {member.name}
                </h2>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" aria-hidden />
                    {member.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" aria-hidden />
                    {member.tenure}
                  </span>
                </div>

                <div className="mt-10 space-y-5 border-t border-white/10 pt-10">
                  {member.bio.map((paragraph, index) =>
                <p
                  key={index}
                  className={
                  index === 0 ?
                  'text-lg leading-relaxed text-neutral-100 lg:text-xl' :
                  'leading-relaxed text-neutral-400'
                  }>
                  
                      {paragraph}
                    </p>
                )}
                </div>

                <div className="mt-10">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Focus
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {member.focus.map((item) =>
                  <li
                    key={item}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-neutral-300">
                    
                        {item}
                      </li>
                  )}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
                  {member.links.map((link) =>
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 outline-none transition-colors duration-150 ease-out hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
                  
                      {link.label}
                    </a>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>);

}