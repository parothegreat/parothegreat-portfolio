import { HTMLAttributes, PointerEvent, useEffect, useState } from 'react';

export const InteractiveSurface = ({
  children,
  className = '',
  onPointerMove,
  onPointerLeave,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const style = event.currentTarget.style;
    style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    const style = event.currentTarget.style;
    style.removeProperty('--spotlight-x');
    style.removeProperty('--spotlight-y');
  };

  return (
    <div
      className={`instrument-surface interactive-surface ${className}`}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {children}
    </div>
  );
};

const SIGNAL_GLYPHS = '01/#<>[]{}';

export const SignalText = ({ children }: { children: string }) => {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(children.length);
      return;
    }

    const step = Math.max(1, Math.ceil(children.length / 18));
    const interval = window.setInterval(() => {
      setRevealed((current) => {
        if (current + step >= children.length) {
          window.clearInterval(interval);
          return children.length;
        }
        return current + step;
      });
    }, 28);

    return () => window.clearInterval(interval);
  }, [children]);

  const scrambled = children
    .split('')
    .map((character, index) => {
      if (character === ' ' || index < revealed) return character;
      return SIGNAL_GLYPHS[(index + revealed) % SIGNAL_GLYPHS.length];
    })
    .join('');

  return (
    <>
      <span aria-hidden='true' className='motion-reduce:hidden'>
        {scrambled}
      </span>
      <span aria-hidden='true' className='hidden motion-reduce:inline'>
        {children}
      </span>
      <span className='sr-only'>{children}</span>
    </>
  );
};
