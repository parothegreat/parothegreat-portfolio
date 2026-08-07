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
      <dl className='flex flex-wrap gap-x-5 gap-y-2 border-y border-neutral-200 py-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400'>
        <div className='flex items-baseline gap-1.5'>
          <dt className='sr-only'>Domains</dt>
          <dd>
            <strong className='font-code font-medium text-neutral-900 dark:text-neutral-200'>
              {domainCount}
            </strong>{' '}
            domains
          </dd>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <dt className='sr-only'>Tools and technologies</dt>
          <dd>
            <strong className='font-code font-medium text-neutral-900 dark:text-neutral-200'>
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
            className='text-xl font-medium text-neutral-900 dark:text-neutral-200'
          >
            Core Stack
          </h3>
          <span className='font-code text-xs text-neutral-500'>
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
            className='text-xl font-medium text-neutral-900 dark:text-neutral-200'
          >
            All Tools &amp; Technologies
          </h3>
          <p
            aria-atomic='true'
            aria-live='polite'
            className='font-code text-xs text-neutral-500'
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
                        'inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:focus-visible:ring-offset-[#121212]',
                        isActive
                          ? 'border-neutral-400 bg-neutral-900 text-white dark:border-neutral-500 dark:bg-neutral-100 dark:text-neutral-950'
                          : 'border-neutral-300 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100',
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
              className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500'
            />
            <input
              id='tool-search'
              className='min-h-[44px] w-full rounded-md border border-neutral-300 bg-neutral-50 py-2 pl-10 pr-12 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-100 dark:focus:border-blue-400'
              onChange={(event) => handleQueryChange(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder='Search tools, domains, or projects...'
              type='search'
              value={query}
            />
            {query ? (
              <button
                aria-label='Clear tool search'
                className='absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 dark:hover:text-neutral-100'
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
          <div className='border-y border-neutral-300 py-12 text-center dark:border-neutral-800'>
            <h4 className='text-lg font-medium text-neutral-900 dark:text-neutral-100'>
              No matching tools
            </h4>
            <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
              Try another keyword or reset the active filter.
            </p>
            <button
              className='mx-auto mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-800 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200'
              onClick={resetFilters}
              type='button'
            >
              <FiRotateCcw aria-hidden='true' className='h-4 w-4' />
              Reset filters
            </button>
          </div>
        )}

        {filteredTools.length > TOOL_BATCH_SIZE ? (
          <div className='flex flex-wrap items-center justify-between gap-3 border-t border-neutral-300 pt-4 dark:border-neutral-800'>
            <p className='font-code text-xs text-neutral-500'>
              Showing {visibleTools.length} of {filteredTools.length}
            </p>
            <div className='flex items-center gap-2'>
              {visibleCount > TOOL_BATCH_SIZE ? (
                <button
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100'
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
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white'
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
