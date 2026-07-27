import { FiChevronDown } from 'react-icons/fi';

import { Tool, TOOL_DOMAIN_LABELS, TOOL_STATUS_LABELS } from '@/data/tools';

import cn from '@/common/libs/cn';

import ToolIcon from './ToolIcon';

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}

const ToolStatus = ({ tool }: { tool: Tool }) => (
  <span className='shrink-0 rounded border border-neutral-300 bg-neutral-100 px-2 py-1 font-code text-[10px] font-medium uppercase text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'>
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
      <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <ToolIcon name={tool.icon} />
      </span>
      <div className='min-w-0'>
        <h4 className='break-words text-[15px] font-medium text-neutral-900 dark:text-neutral-100'>
          {tool.name}
        </h4>
        <p className='mt-0.5 font-code text-[11px] text-neutral-500'>
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
            'h-4 w-4 text-neutral-500 transition-transform duration-200 motion-reduce:transition-none',
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
  if (featured) {
    return (
      <article className='h-full rounded-lg border border-neutral-300 bg-[var(--surface-subtle)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-400 motion-reduce:transform-none motion-reduce:transition-none dark:border-neutral-700 dark:hover:border-neutral-500'>
        <ToolHeading tool={tool} />
        <p className='mt-4 text-sm font-medium text-neutral-800 dark:text-neutral-200'>
          {tool.role}
        </p>
        <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
          Used in {tool.usedIn[0]}.
        </p>
      </article>
    );
  }

  return (
    <article
      id={`tool-${tool.slug}`}
      className='rounded-lg border border-neutral-300 bg-neutral-50 p-3 transition duration-200 focus-within:border-neutral-400 motion-reduce:transform-none motion-reduce:transition-none dark:border-neutral-800 dark:bg-neutral-950/40 dark:focus-within:border-neutral-600 md:flex md:h-full md:flex-col md:p-4 md:hover:-translate-y-0.5 md:hover:border-neutral-400 dark:md:hover:border-neutral-600'
    >
      <button
        aria-controls={`tool-details-${tool.slug}`}
        aria-expanded={expanded}
        className='flex min-h-[44px] w-full items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:hidden'
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
        <p className='mt-3 border-t border-neutral-200 pt-3 text-sm leading-6 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 md:mt-4 md:border-0 md:pt-0'>
          {tool.description}
        </p>

        <div className='pt-4 md:mt-auto md:pt-5'>
          <p className='font-code text-[10px] uppercase text-neutral-500'>
            Used in
          </p>
          <ul className='mt-2 flex flex-wrap gap-1.5'>
            {tool.usedIn.map((project) => (
              <li
                key={project}
                className='max-w-full break-words rounded border border-neutral-300 bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
              >
                {project}
              </li>
            ))}
          </ul>
          {tool.related?.length ? (
            <p className='mt-3 text-xs leading-5 text-neutral-500'>
              Related: {tool.related.join(', ')}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ToolCard;
