import { ReactNode } from 'react';

import { WorkPlaceholderLabel, WorkPlaceholderState } from '@/data/work-media';

interface ProjectVisualPlaceholderProps {
  projectTitle: string;
  category: string;
  accent: string;
  stack: string[];
  icon: ReactNode;
  state: WorkPlaceholderState;
  label?: WorkPlaceholderLabel;
}

const DEFAULT_LABELS: Record<WorkPlaceholderState, WorkPlaceholderLabel> = {
  'visual-pending': 'DOCUMENTATION ASSET PENDING',
  'hardware-pending': 'HARDWARE PHOTO PENDING',
  'screenshot-pending': 'INTERFACE CAPTURE PENDING',
};

const ProjectVisualPlaceholder = ({
  projectTitle,
  category,
  accent,
  stack,
  icon,
  state,
  label = DEFAULT_LABELS[state],
}: ProjectVisualPlaceholderProps) => {
  return (
    <div
      role='img'
      aria-label={`${projectTitle}. ${label.toLowerCase()}.`}
      className='relative flex h-full min-h-[160px] w-full flex-col justify-between overflow-hidden bg-[var(--bg-layer)] p-5'
    >
      <div className='relative flex items-start justify-between gap-4'>
        <span
          aria-hidden='true'
          className='inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--line-strong)] bg-[var(--surface-1)] text-lg'
          style={{ color: accent }}
        >
          {icon}
        </span>
        <span className='text-right font-code text-[9px] uppercase leading-4 text-[var(--text-tertiary)]'>
          {category}
          <span className='block'>Media 00</span>
        </span>
      </div>

      <div
        className='relative mt-10 border-l-2 pl-4'
        style={{ borderColor: accent }}
      >
        <p className='font-code text-[9px] uppercase text-[var(--text-tertiary)]'>
          Documentation status
        </p>
        <p
          className='mt-2 font-code text-[10px] uppercase'
          style={{ color: accent }}
        >
          {label}
        </p>
        <p className='mt-3 text-lg font-medium text-[var(--text-primary)]'>
          {projectTitle}
        </p>
      </div>

      <div className='relative mt-5 flex items-end justify-between gap-4 border-t border-[var(--line-default)] pt-3'>
        <p className='truncate font-code text-[9px] text-[var(--text-tertiary)]'>
          {stack.slice(0, 4).join(' / ')}
        </p>
        <span className='shrink-0 font-code text-[8px] uppercase text-[var(--text-tertiary)]'>
          {state.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
};

export default ProjectVisualPlaceholder;
