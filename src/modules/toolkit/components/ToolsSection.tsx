import { KeyboardEvent, useMemo, useState } from 'react';
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiRotateCcw,
  FiSearch,
  FiX,
} from 'react-icons/fi';

import { TOOL_DOMAIN_LABELS, TOOL_DOMAINS, TOOLS } from '@/data/tools';

import cn from '@/common/libs/cn';
import { filterTools, ToolDomainFilter } from '@/common/libs/tools';

import ToolCard from './ToolCard';

const TOOL_BATCH_SIZE = 6;
const FEATURED_TOOLS = TOOLS.filter((tool) => tool.featured);

const ToolsSection = () => {
  const [domain, setDomain] = useState<ToolDomainFilter>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(TOOL_BATCH_SIZE);
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);
  const filteredTools = useMemo(
    () => filterTools(TOOLS, domain, query),
    [domain, query],
  );
  const visibleTools = filteredTools.slice(0, visibleCount);
  const domainCount = new Set(TOOLS.map((tool) => tool.domain)).size;
  const normalizedQuery = query.trim();
  const hasMoreTools = visibleTools.length < filteredTools.length;

  const resultLabel = normalizedQuery
    ? `${filteredTools.length} ${
        filteredTools.length === 1 ? 'result' : 'results'
      } for "${normalizedQuery}"`
    : domain === 'all'
      ? `${filteredTools.length} tools`
      : `${filteredTools.length} ${TOOL_DOMAIN_LABELS[
          domain
        ].toLowerCase()} tools`;

  const resetFilters = () => {
    setDomain('all');
    setQuery('');
    setVisibleCount(TOOL_BATCH_SIZE);
    setExpandedToolId(null);
  };

  const handleDomainChange = (nextDomain: ToolDomainFilter) => {
    setDomain(nextDomain);
    setVisibleCount(TOOL_BATCH_SIZE);
    setExpandedToolId(null);
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setVisibleCount(TOOL_BATCH_SIZE);
    setExpandedToolId(null);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') handleQueryChange('');
  };

  return (
    <section className='space-y-14 tracking-normal'>
      <dl className='flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line-default)] py-4 text-sm text-[var(--text-secondary)]'>
        <div className='flex items-baseline gap-1.5'>
          <dt className='sr-only'>Domains</dt>
          <dd>
            <strong className='font-code font-medium text-[var(--text-primary)]'>
              {domainCount}
            </strong>{' '}
            domains
          </dd>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <dt className='sr-only'>Tools and technologies</dt>
          <dd>
            <strong className='font-code font-medium text-[var(--text-primary)]'>
              {TOOLS.length}
            </strong>{' '}
            tools and technologies
          </dd>
        </div>
        <div>
          <dt className='sr-only'>Experience basis</dt>
          <dd>Project-backed experience</dd>
        </div>
      </dl>

      <div aria-labelledby='core-stack-heading' className='space-y-4'>
        <div className='flex items-center justify-between gap-3'>
          <h3
            id='core-stack-heading'
            className='text-xl font-medium text-[var(--text-primary)]'
          >
            Core Stack
          </h3>
          <span className='font-code text-xs text-[var(--text-tertiary)]'>
            {FEATURED_TOOLS.length} tools
          </span>
        </div>
        <ul
          aria-label='Core stack tools'
          className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'
        >
          {FEATURED_TOOLS.map((tool) => (
            <li key={tool.id} className='h-full min-w-0'>
              <ToolCard tool={tool} featured />
            </li>
          ))}
        </ul>
      </div>

      <div aria-labelledby='all-tools-heading' className='space-y-5'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <h3
            id='all-tools-heading'
            className='text-xl font-medium text-[var(--text-primary)]'
          >
            All Tools &amp; Technologies
          </h3>
          <p
            aria-atomic='true'
            aria-live='polite'
            className='font-code text-xs text-[var(--text-tertiary)]'
          >
            {resultLabel}
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='min-w-0 flex-1 overflow-x-auto pb-1 scrollbar-hide'>
            <div
              aria-label='Filter tools by domain'
              className='flex w-max gap-2'
              role='group'
            >
              {[{ value: 'all' as const, label: 'All' }, ...TOOL_DOMAINS].map(
                (option) => {
                  const isActive = domain === option.value;

                  return (
                    <button
                      key={option.value}
                      aria-pressed={isActive}
                      className={cn(
                        'inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] motion-reduce:transition-none',
                        isActive
                          ? 'border-[var(--circuit-500)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                          : 'border-[var(--line-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--line-strong)] hover:text-[var(--text-primary)]',
                      )}
                      onClick={() => handleDomainChange(option.value)}
                      type='button'
                    >
                      {isActive ? (
                        <FiCheck aria-hidden='true' className='h-4 w-4' />
                      ) : null}
                      {option.label}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className='relative w-full shrink-0 sm:ml-auto sm:w-72'>
            <label className='sr-only' htmlFor='tool-search'>
              Search tools, domains, or projects
            </label>
            <FiSearch
              aria-hidden='true'
              className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]'
            />
            <input
              id='tool-search'
              className='min-h-[44px] w-full rounded-md border border-[var(--line-default)] bg-[var(--surface-1)] py-2 pl-10 pr-12 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)] focus:border-[var(--circuit-500)] focus:ring-2 focus:ring-[var(--accent-soft)]'
              onChange={(event) => handleQueryChange(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder='Search tools, domains, or projects...'
              type='search'
              value={query}
            />
            {query ? (
              <button
                aria-label='Clear tool search'
                className='absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]'
                onClick={() => handleQueryChange('')}
                title='Clear search'
                type='button'
              >
                <FiX aria-hidden='true' className='h-4 w-4' />
              </button>
            ) : null}
          </div>
        </div>

        {filteredTools.length ? (
          <ul
            id='tool-results'
            aria-label='Tool results'
            className='flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3'
          >
            {visibleTools.map((tool) => (
              <li key={tool.id} className='h-full'>
                <ToolCard
                  tool={tool}
                  expanded={expandedToolId === tool.id}
                  onToggle={() =>
                    setExpandedToolId((current) =>
                      current === tool.id ? null : tool.id,
                    )
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className='border-y border-[var(--line-default)] py-12 text-center'>
            <h4 className='text-lg font-medium text-[var(--text-primary)]'>
              No matching tools
            </h4>
            <p className='mt-2 text-sm text-[var(--text-secondary)]'>
              Try another keyword or reset the active filter.
            </p>
            <button
              className='mx-auto mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--line-default)] bg-[var(--surface-2)] px-4 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
              onClick={resetFilters}
              type='button'
            >
              <FiRotateCcw aria-hidden='true' className='h-4 w-4' />
              Reset filters
            </button>
          </div>
        )}

        {filteredTools.length > TOOL_BATCH_SIZE ? (
          <div className='flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-default)] pt-4'>
            <p className='font-code text-xs text-[var(--text-tertiary)]'>
              Showing {visibleTools.length} of {filteredTools.length}
            </p>
            <div className='flex items-center gap-2'>
              {visibleCount > TOOL_BATCH_SIZE ? (
                <button
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--line-default)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--line-strong)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  onClick={() => {
                    setVisibleCount(TOOL_BATCH_SIZE);
                    setExpandedToolId(null);
                  }}
                  type='button'
                >
                  <FiChevronUp aria-hidden='true' className='h-4 w-4' />
                  Show less
                </button>
              ) : null}
              {hasMoreTools ? (
                <button
                  aria-controls='tool-results'
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--circuit-500)] px-4 py-2 text-sm text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]'
                  onClick={() =>
                    setVisibleCount((current) => current + TOOL_BATCH_SIZE)
                  }
                  type='button'
                >
                  See more
                  <FiChevronDown aria-hidden='true' className='h-4 w-4' />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ToolsSection;
