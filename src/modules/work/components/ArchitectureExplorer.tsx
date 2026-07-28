import { useInView, useReducedMotion } from 'framer-motion';
import { CSSProperties, KeyboardEvent, useRef, useState } from 'react';

import {
  ArchitectureEdge,
  ArchitectureNode,
  WORK_ACCENT_COLORS,
  WorkItem,
} from '@/data/work';

const MAP_WIDTH = 760;
const MAP_HEIGHT = 360;
const NODE_WIDTH = 122;
const NODE_HEIGHT = 54;

const nodeCenter = (node: ArchitectureNode) => ({
  x: node.x + NODE_WIDTH / 2,
  y: node.y + NODE_HEIGHT / 2,
});

const edgePath = (edge: ArchitectureEdge, nodes: ArchitectureNode[]) => {
  const source = nodes.find((node) => node.id === edge.source);
  const target = nodes.find((node) => node.id === edge.target);
  if (!source || !target) return '';

  const start = nodeCenter(source);
  const end = nodeCenter(target);
  const horizontal = Math.abs(end.x - start.x) > Math.abs(end.y - start.y);

  if (horizontal) {
    const bend = Math.max(40, Math.abs(end.x - start.x) * 0.42);
    const direction = end.x >= start.x ? 1 : -1;
    return `M ${start.x} ${start.y} C ${start.x + bend * direction} ${start.y}, ${end.x - bend * direction} ${end.y}, ${end.x} ${end.y}`;
  }

  const bend = Math.max(34, Math.abs(end.y - start.y) * 0.42);
  const direction = end.y >= start.y ? 1 : -1;
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + bend * direction}, ${end.x} ${end.y - bend * direction}, ${end.x} ${end.y}`;
};

interface ArchitectureMapProps {
  architecture: WorkItem['architecture'];
  accent: string;
  animated?: boolean;
}

export const ArchitectureMap = ({
  architecture,
  accent,
  animated = false,
}: ArchitectureMapProps) => {
  const markerId = `arrow-${architecture.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <svg
      aria-hidden='true'
      className='h-full w-full'
      preserveAspectRatio='xMidYMid meet'
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
    >
      <defs>
        <marker
          id={markerId}
          markerHeight='6'
          markerWidth='6'
          orient='auto'
          refX='5'
          refY='3'
          viewBox='0 0 6 6'
        >
          <path d='M 0 0 L 6 3 L 0 6 z' fill={accent} />
        </marker>
      </defs>
      {architecture.edges.map((edge) => (
        <path
          key={edge.id}
          className={
            animated && edge.animated ? 'architecture-flow' : undefined
          }
          d={edgePath(edge, architecture.nodes)}
          fill='none'
          markerEnd={`url(#${markerId})`}
          opacity={edge.animated ? 0.82 : 0.45}
          stroke={accent}
          strokeDasharray={edge.animated ? '7 8' : undefined}
          strokeWidth='1.5'
        />
      ))}
      {architecture.nodes.map((node) => (
        <g key={node.id}>
          <rect
            fill='var(--surface-2)'
            height={NODE_HEIGHT}
            opacity={node.status === 'planned' ? 0.65 : 1}
            rx='7'
            stroke={node.status === 'planned' ? 'var(--signal-500)' : accent}
            strokeDasharray={node.status === 'planned' ? '4 4' : undefined}
            strokeOpacity='0.7'
            width={NODE_WIDTH}
            x={node.x}
            y={node.y}
          />
          <text
            fill='var(--text-primary)'
            fontFamily='var(--onestSans-font)'
            fontSize='11'
            fontWeight='500'
            textAnchor='middle'
            x={node.x + NODE_WIDTH / 2}
            y={node.y + 24}
          >
            {node.label}
          </text>
          <text
            fill='var(--text-tertiary)'
            fontFamily='var(--firaCode-font)'
            fontSize='7'
            textAnchor='middle'
            x={node.x + NODE_WIDTH / 2}
            y={node.y + 39}
          >
            {node.status === 'planned' ? 'planned' : node.type}
          </text>
        </g>
      ))}
    </svg>
  );
};

interface ArchitectureExplorerProps {
  project: Pick<WorkItem, 'id' | 'architecture' | 'accent'>;
}

const ArchitectureExplorer = ({ project }: ArchitectureExplorerProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '120px 0px' });
  const reduceMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState(
    project.architecture.nodes[0].id,
  );
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);
  const accent = WORK_ACCENT_COLORS[project.accent];
  const activeNode =
    project.architecture.nodes.find((node) => node.id === activeNodeId) ??
    project.architecture.nodes[0];
  const connectedNodeIds = new Set(
    project.architecture.edges.flatMap((edge) => {
      if (edge.source === activeNodeId) return [edge.target];
      if (edge.target === activeNodeId) return [edge.source];
      return [];
    }),
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    setPinnedNodeId(null);
    setActiveNodeId(project.architecture.nodes[0].id);
  };

  return (
    <section
      ref={sectionRef}
      id='architecture'
      aria-labelledby='architecture-heading'
      className='scroll-mt-24'
      onKeyDown={handleKeyDown}
    >
      <p className='signal-label'>Architecture</p>
      <div className='mt-3 max-w-3xl'>
        <h2
          id='architecture-heading'
          className='text-2xl font-medium text-[var(--text-primary)] sm:text-3xl'
        >
          {project.architecture.title}
        </h2>
        <p className='mt-3 text-base leading-7 text-[var(--text-secondary)]'>
          {project.architecture.summary}
        </p>
      </div>

      <div
        className='instrument-surface mt-7 overflow-hidden rounded-lg'
        style={{ '--project-accent': accent } as CSSProperties}
      >
        <div className='scrollbar-thin overflow-x-auto'>
          <div className='relative h-[340px] min-w-[720px]'>
            <ArchitectureMap
              accent={accent}
              animated={isInView && !reduceMotion}
              architecture={project.architecture}
            />

            {project.architecture.nodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const isConnected = connectedNodeIds.has(node.id);
              const isDimmed = !isActive && !isConnected;

              return (
                <button
                  key={node.id}
                  type='button'
                  aria-label={`${node.label}: ${node.description}`}
                  aria-pressed={pinnedNodeId === node.id}
                  className='absolute h-[54px] rounded-md bg-transparent text-transparent outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)] motion-reduce:transition-none'
                  onBlur={() => {
                    if (pinnedNodeId) setActiveNodeId(pinnedNodeId);
                  }}
                  onClick={() => {
                    setPinnedNodeId((current) =>
                      current === node.id ? null : node.id,
                    );
                    setActiveNodeId(node.id);
                  }}
                  onFocus={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  onMouseLeave={() => {
                    if (pinnedNodeId) setActiveNodeId(pinnedNodeId);
                  }}
                  style={{
                    left: `${(node.x / MAP_WIDTH) * 100}%`,
                    opacity: isDimmed ? 0.42 : 1,
                    top: `${(node.y / MAP_HEIGHT) * 100}%`,
                    width: `${(NODE_WIDTH / MAP_WIDTH) * 100}%`,
                  }}
                >
                  {node.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          aria-live='polite'
          role='status'
          className='grid gap-3 border-t border-[var(--line-default)] bg-[var(--surface-2)] px-5 py-5 sm:grid-cols-[140px_minmax(0,1fr)]'
        >
          <div>
            <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              {activeNode.type}
            </p>
            <p className='mt-1 font-medium text-[var(--text-primary)]'>
              {activeNode.label}
            </p>
          </div>
          <div>
            <p className='text-sm leading-6 text-[var(--text-secondary)]'>
              {activeNode.description}
            </p>
            {activeNode.technology ? (
              <p className='mt-2 font-code text-[11px] text-[var(--text-tertiary)]'>
                {activeNode.technology}
                {activeNode.status === 'planned' ? ' · planned' : ''}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <details className='mt-4 border-y border-[var(--line-soft)] py-2'>
        <summary className='flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-[var(--circuit-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'>
          Architecture text view
        </summary>
        <ol className='space-y-4 pb-4 pt-2'>
          {project.architecture.nodes.map((node) => (
            <li key={node.id}>
              <p className='text-sm font-medium text-[var(--text-primary)]'>
                {node.label}
                {node.status === 'planned' ? ' (planned)' : ''}
              </p>
              <p className='mt-1 text-sm leading-6 text-[var(--text-secondary)]'>
                {node.description}
              </p>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
};

export default ArchitectureExplorer;
