import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { CSSProperties, KeyboardEvent, useRef, useState } from 'react';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';

import {
  DOCUMENTATION_LEVEL_LABELS,
  WORK_ACCENT_COLORS,
  WORK_STATUS_LABELS,
  WorkItem,
} from '@/data/work';
import { getPrimaryWorkMedia } from '@/data/work-media';

import { ArchitectureMap } from './ArchitectureExplorer';
import ProjectVisual from './ProjectVisual';

interface WorkExplorerProps {
  items: WorkItem[];
  compact?: boolean;
}

const WorkExplorer = ({ items, compact = false }: WorkExplorerProps) => {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const desktopRows = useRef<Array<HTMLAnchorElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  if (!selected) return null;

  const selectedAccent = WORK_ACCENT_COLORS[selected.accent];
  const selectedMedia = getPrimaryWorkMedia(selected.mediaIds);
  const selectedHasRealMedia =
    selectedMedia?.type === 'image' && Boolean(selectedMedia.src);
  const handleDesktopKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const offset = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (index + offset + items.length) % items.length;
    setSelectedId(items[nextIndex].id);
    desktopRows.current[nextIndex]?.focus();
  };

  return (
    <div>
      <div className='hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]'>
        <ol className='border-t border-[var(--line-default)]'>
          {items.map((item, index) => {
            const isSelected = item.id === selected.id;
            const accent = WORK_ACCENT_COLORS[item.accent];

            return (
              <li
                key={item.id}
                className='relative border-b border-[var(--line-default)]'
              >
                {isSelected ? (
                  <span
                    aria-hidden='true'
                    className='absolute inset-y-4 left-0 w-0.5 rounded-full'
                    style={{ backgroundColor: accent }}
                  />
                ) : null}
                <Link
                  ref={(element) => {
                    desktopRows.current[index] = element;
                  }}
                  href={`/work/${item.slug}`}
                  aria-label={`Open ${item.title} case study`}
                  aria-current={isSelected ? 'true' : undefined}
                  className='group grid min-h-[148px] grid-cols-[42px_minmax(0,1fr)] gap-3 py-6 pl-4 pr-2 outline-none transition-colors duration-200 hover:bg-[color:var(--surface-1)] focus-visible:bg-[var(--surface-1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none'
                  onFocus={() => setSelectedId(item.id)}
                  onKeyDown={(event) => handleDesktopKeyDown(event, index)}
                  onMouseEnter={() => setSelectedId(item.id)}
                >
                  <span className='pt-1 font-code text-[11px] text-[var(--text-tertiary)]'>
                    {String(item.index).padStart(2, '0')}
                  </span>
                  <span className='min-w-0'>
                    <span className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                      <span
                        className='text-lg font-medium text-[var(--text-primary)] transition-colors duration-200 motion-reduce:transition-none'
                        style={isSelected ? { color: accent } : undefined}
                      >
                        {item.title}
                      </span>
                      <span className='inline-flex items-center gap-1.5 font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                        <span
                          aria-hidden='true'
                          className='h-1.5 w-1.5 rounded-full'
                          style={{ backgroundColor: accent }}
                        />
                        {WORK_STATUS_LABELS[item.status]}
                      </span>
                    </span>
                    <span className='mt-2 block text-sm leading-6 text-[var(--text-secondary)]'>
                      {item.shortDescription}
                    </span>
                    <span className='mt-4 block truncate font-code text-[10px] text-[var(--text-tertiary)]'>
                      {item.stack.slice(0, compact ? 4 : 5).join(' · ')}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <aside className='self-start lg:sticky lg:top-6' aria-live='polite'>
          <div
            className='instrument-surface overflow-hidden rounded-lg'
            style={{ '--project-accent': selectedAccent } as CSSProperties}
          >
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={selected.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
              >
                <div
                  className={`relative overflow-hidden border-b border-[var(--line-default)] bg-[var(--bg-layer)] ${
                    selectedHasRealMedia
                      ? compact
                        ? 'grid h-56 grid-rows-[1.3fr_0.7fr]'
                        : 'grid h-[340px] grid-rows-[1.35fr_0.65fr]'
                      : compact
                        ? 'h-56'
                        : 'h-[340px]'
                  }`}
                >
                  <div
                    aria-hidden='true'
                    className='absolute inset-x-0 top-0 h-0.5'
                    style={{ backgroundColor: selectedAccent }}
                  />
                  {selectedHasRealMedia ? (
                    <>
                      <ProjectVisual
                        media={selectedMedia}
                        project={selected}
                        sizes='(min-width: 1024px) 38vw, 100vw'
                      />
                      <div className='min-h-0 border-t border-[var(--line-default)]'>
                        <ArchitectureMap
                          accent={selectedAccent}
                          architecture={selected.architecture}
                          variant='preview'
                        />
                      </div>
                    </>
                  ) : (
                    <ArchitectureMap
                      accent={selectedAccent}
                      architecture={selected.architecture}
                      variant='preview'
                    />
                  )}
                </div>

                <div className='p-5'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                        {selected.category} ·{' '}
                        {WORK_STATUS_LABELS[selected.status]}
                      </p>
                      <h3 className='mt-2 text-xl font-medium text-[var(--text-primary)]'>
                        {selected.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden='true'
                      className='mt-1 h-2.5 w-2.5 shrink-0 rounded-sm'
                      style={{
                        backgroundColor: selectedAccent,
                      }}
                    />
                  </div>
                  <p className='mt-3 text-sm leading-6 text-[var(--text-secondary)]'>
                    {selected.outcome}
                  </p>

                  <dl className='mt-5 grid gap-3 border-y border-[var(--line-soft)] py-4 text-xs'>
                    <div className='grid grid-cols-[86px_minmax(0,1fr)] gap-3'>
                      <dt className='font-code uppercase text-[var(--text-tertiary)]'>
                        Role
                      </dt>
                      <dd className='text-[var(--text-secondary)]'>
                        {selected.role.join(' / ')}
                      </dd>
                    </div>
                    <div className='grid grid-cols-[86px_minmax(0,1fr)] gap-3'>
                      <dt className='font-code uppercase text-[var(--text-tertiary)]'>
                        Document
                      </dt>
                      <dd className='text-[var(--text-secondary)]'>
                        {
                          DOCUMENTATION_LEVEL_LABELS[
                            selected.documentationLevel
                          ]
                        }
                      </dd>
                    </div>
                    {selectedMedia?.type === 'placeholder' ? (
                      <div className='grid grid-cols-[86px_minmax(0,1fr)] gap-3'>
                        <dt className='font-code uppercase text-[var(--text-tertiary)]'>
                          Visual
                        </dt>
                        <dd className='text-[var(--text-secondary)]'>
                          {selectedMedia.placeholderLabel}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  <Link
                    href={`/work/${selected.slug}`}
                    className='mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--circuit-500)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  >
                    Open documentation
                    <FiArrowUpRight aria-hidden='true' />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>

      <ol className='border-t border-[var(--line-default)] lg:hidden'>
        {items.map((item) => {
          const isExpanded = expandedId === item.id;
          const media = getPrimaryWorkMedia(item.mediaIds);
          const hasRealMedia = media?.type === 'image' && Boolean(media.src);
          const panelId = `work-preview-${item.id}`;

          return (
            <li key={item.id} className='border-b border-[var(--line-default)]'>
              <button
                type='button'
                aria-controls={panelId}
                aria-expanded={isExpanded}
                className='grid min-h-[164px] w-full grid-cols-[36px_minmax(0,1fr)] gap-2 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]'
                onClick={() =>
                  setExpandedId((current) =>
                    current === item.id ? null : item.id,
                  )
                }
              >
                <span className='pt-1 font-code text-[10px] text-[var(--text-tertiary)]'>
                  {String(item.index).padStart(2, '0')}
                </span>
                <span className='min-w-0'>
                  <span className='flex items-start justify-between gap-3'>
                    <span>
                      <span className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                        {item.category} · {WORK_STATUS_LABELS[item.status]}
                      </span>
                      <span className='mt-2 block text-lg font-medium text-[var(--text-primary)]'>
                        {item.title}
                      </span>
                    </span>
                    <FiChevronDown
                      aria-hidden='true'
                      className={`mt-1 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 motion-reduce:transition-none ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                  <span className='mt-2 block text-sm leading-6 text-[var(--text-secondary)]'>
                    {item.shortDescription}
                  </span>
                  <span className='mt-4 block break-words font-code text-[10px] leading-5 text-[var(--text-tertiary)]'>
                    {item.stack.slice(0, compact ? 4 : 5).join(' · ')}
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    id={panelId}
                    initial={
                      reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { height: 'auto', opacity: 1 }
                    }
                    exit={
                      reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
                    className='overflow-hidden'
                  >
                    <div className='mb-6 ml-9 overflow-hidden rounded-md border border-[var(--line-default)] bg-[var(--surface-1)]'>
                      <div className='h-40 bg-[var(--bg-layer)]'>
                        {hasRealMedia ? (
                          <ProjectVisual
                            media={media}
                            project={item}
                            sizes='calc(100vw - 76px)'
                          />
                        ) : (
                          <ArchitectureMap
                            accent={WORK_ACCENT_COLORS[item.accent]}
                            architecture={item.architecture}
                            variant='preview'
                          />
                        )}
                      </div>
                      <div className='border-t border-[var(--line-soft)] p-4'>
                        <p className='text-sm leading-6 text-[var(--text-secondary)]'>
                          {item.outcome}
                        </p>
                        <p className='mt-3 font-code text-[10px] text-[var(--text-tertiary)]'>
                          {item.role.join(' / ')} ·{' '}
                          {DOCUMENTATION_LEVEL_LABELS[item.documentationLevel]}
                        </p>
                        {media?.type === 'placeholder' ? (
                          <p className='mt-2 font-code text-[9px] uppercase text-[var(--text-tertiary)]'>
                            Visual: {media.placeholderLabel}
                          </p>
                        ) : null}
                        <p className='mt-4 border-l border-[var(--line-strong)] pl-3 text-xs leading-5 text-[var(--text-secondary)]'>
                          {item.architecture.summary}
                        </p>
                        <Link
                          href={`/work/${item.slug}`}
                          className='mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--circuit-500)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                        >
                          Open documentation
                          <FiArrowUpRight aria-hidden='true' />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default WorkExplorer;
