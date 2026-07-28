import { FiChevronDown } from 'react-icons/fi';

import {
  Tool,
  TOOL_DOMAIN_LABELS,
  TOOL_STATUS_LABELS,
  ToolDomain,
} from '@/data/tools';

import cn from '@/common/libs/cn';

import ToolIcon from './ToolIcon';

const DOMAIN_ACCENTS: Record<ToolDomain, string> = {
  development: 'var(--circuit-500)',
  infrastructure: 'var(--circuit-400)',
  networking: '#7b83ff',
  security: 'var(--fault-500)',
  observability: 'var(--telemetry-500)',
  iot: 'var(--signal-500)',
};

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}

const ToolStatus = ({ tool }: { tool: Tool }) => (
  <span className='shrink-0 rounded border border-[var(--line-default)] bg-[var(--surface-2)] px-2 py-1 font-code text-[10px] font-medium uppercase text-[var(--text-secondary)]'>
    {TOOL_STATUS_LABELS[tool.status]}
  </span>
);

const ToolHeading = ({
  tool,
  expandable = false,
  expanded = false,
}: {
  tool: Tool;
  expandable?: boolean;
  expanded?: boolean;
}) => (
  <div className='flex w-full items-start justify-between gap-3'>
    <div className='flex min-w-0 items-center gap-3'>
      <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--line-default)] bg-[var(--surface-2)]'>
        <ToolIcon name={tool.icon} />
      </span>
      <div className='min-w-0'>
        <h4 className='break-words text-[15px] font-medium text-[var(--text-primary)]'>
          {tool.name}
        </h4>
        <p className='mt-0.5 font-code text-[11px] text-[var(--text-tertiary)]'>
          {TOOL_DOMAIN_LABELS[tool.domain]}
        </p>
      </div>
    </div>
    <div className='flex shrink-0 items-center gap-2'>
      <ToolStatus tool={tool} />
      {expandable ? (
        <FiChevronDown
          aria-hidden='true'
          className={cn(
            'h-4 w-4 text-[var(--text-tertiary)] transition-transform duration-200 motion-reduce:transition-none',
            expanded && 'rotate-180',
          )}
        />
      ) : null}
    </div>
  </div>
);

const ToolCard = ({
  tool,
  featured = false,
  expanded = false,
  onToggle,
}: ToolCardProps) => {
  const accent = DOMAIN_ACCENTS[tool.domain];

  if (featured) {
    return (
      <article
        className='h-full rounded-lg border border-l-2 border-[var(--line-default)] bg-[var(--surface-1)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] motion-reduce:transform-none motion-reduce:transition-none'
        style={{ borderLeftColor: accent }}
      >
        <ToolHeading tool={tool} />
        <p className='mt-4 text-sm font-medium text-[var(--text-primary)]'>
          {tool.role}
        </p>
        <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
          Used in {tool.usedIn[0]}.
        </p>
      </article>
    );
  }

  return (
    <article
      id={`tool-${tool.slug}`}
      className='rounded-lg border border-l-2 border-[var(--line-default)] bg-[var(--surface-1)] p-3 transition duration-200 focus-within:border-[var(--line-strong)] motion-reduce:transform-none motion-reduce:transition-none md:flex md:h-full md:flex-col md:p-4 md:hover:-translate-y-0.5 md:hover:border-[var(--line-strong)]'
      style={{ borderLeftColor: accent }}
    >
      <button
        aria-controls={`tool-details-${tool.slug}`}
        aria-expanded={expanded}
        className='flex min-h-[44px] w-full items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] md:hidden'
        onClick={onToggle}
        type='button'
      >
        <ToolHeading tool={tool} expandable expanded={expanded} />
      </button>
      <header className='hidden md:block'>
        <ToolHeading tool={tool} />
      </header>

      <div
        id={`tool-details-${tool.slug}`}
        className={cn(
          expanded ? 'block' : 'hidden',
          'md:flex md:flex-1 md:flex-col',
        )}
      >
        <p className='mt-3 border-t border-[var(--line-soft)] pt-3 text-sm leading-6 text-[var(--text-secondary)] md:mt-4 md:border-0 md:pt-0'>
          {tool.description}
        </p>

        <div className='pt-4 md:mt-auto md:pt-5'>
          <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
            Used in
          </p>
          <ul className='mt-2 flex flex-wrap gap-1.5'>
            {tool.usedIn.map((project) => (
              <li
                key={project}
                className='max-w-full break-words rounded border border-[var(--line-default)] bg-[var(--surface-2)] px-2 py-1 text-xs text-[var(--text-secondary)]'
              >
                {project}
              </li>
            ))}
          </ul>
          {tool.related?.length ? (
            <p className='mt-3 text-xs leading-5 text-[var(--text-tertiary)]'>
              Related: {tool.related.join(', ')}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ToolCard;
