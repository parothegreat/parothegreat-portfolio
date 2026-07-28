import { CSSProperties, KeyboardEvent, useId, useState } from 'react';

import {
  ArchitectureEdge,
  ArchitectureNode,
  WORK_ACCENT_COLORS,
  WorkItem,
} from '@/data/work';

const MAP_WIDTH = 760;
const MAP_HEIGHT = 360;
const NODE_WIDTH = 122;
const NODE_HEIGHT = 64;

const NODE_CODES: Record<ArchitectureNode['type'], string> = {
  client: 'CLI',
  network: 'NET',
  proxy: 'PRX',
  service: 'SVC',
  database: 'DB',
  storage: 'STO',
  hardware: 'HW',
  monitoring: 'OBS',
  security: 'SEC',
  external: 'EXT',
};

const nodeCenter = (node: ArchitectureNode) => ({
  x: node.x + NODE_WIDTH / 2,
  y: node.y + NODE_HEIGHT / 2,
});

const edgeGeometry = (edge: ArchitectureEdge, nodes: ArchitectureNode[]) => {
  const source = nodes.find((node) => node.id === edge.source);
  const target = nodes.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  const start = nodeCenter(source);
  const end = nodeCenter(target);
  const horizontal = Math.abs(end.x - start.x) > Math.abs(end.y - start.y);

  if (horizontal) {
    const direction = end.x >= start.x ? 1 : -1;
    const sourceX = source.x + (direction > 0 ? NODE_WIDTH : 0);
    const targetX = target.x + (direction > 0 ? 0 : NODE_WIDTH);
    const midX = (sourceX + targetX) / 2;

    return {
      path: `M ${sourceX} ${start.y} H ${midX} V ${end.y} H ${targetX}`,
      labelX: midX + 5,
      labelY: (start.y + end.y) / 2 - 5,
    };
  }

  const direction = end.y >= start.y ? 1 : -1;
  const sourceY = source.y + (direction > 0 ? NODE_HEIGHT : 0);
  const targetY = target.y + (direction > 0 ? 0 : NODE_HEIGHT);
  const midY = (sourceY + targetY) / 2;

  return {
    path: `M ${start.x} ${sourceY} V ${midY} H ${end.x} V ${targetY}`,
    labelX: (start.x + end.x) / 2 + 5,
    labelY: midY - 5,
  };
};

interface ArchitectureMapProps {
  architecture: WorkItem['architecture'];
  accent: string;
  activeNodeId?: string;
  variant?: 'detail' | 'preview';
}

const getPreviewNodes = (architecture: WorkItem['architecture']) => {
  const targeted = new Set(architecture.edges.map((edge) => edge.target));
  const first =
    architecture.nodes.find((node) => !targeted.has(node.id)) ??
    architecture.nodes[0];
  const ordered: ArchitectureNode[] = first ? [first] : [];

  while (ordered.length < 4) {
    const current = ordered[ordered.length - 1];
    const nextEdge = architecture.edges.find(
      (edge) =>
        edge.source === current?.id &&
        !ordered.some((node) => node.id === edge.target),
    );
    const next = architecture.nodes.find(
      (node) => node.id === nextEdge?.target,
    );
    if (!next) break;
    ordered.push(next);
  }

  for (const node of architecture.nodes) {
    if (ordered.length >= 4) break;
    if (!ordered.some((item) => item.id === node.id)) ordered.push(node);
  }

  return ordered;
};

const PreviewArchitectureMap = ({
  accent,
  architecture,
  markerId,
}: ArchitectureMapProps & { markerId: string }) => {
  const nodes = getPreviewNodes(architecture);
  const positions = [
    { x: 42, y: 58 },
    { x: 368, y: 58 },
    { x: 368, y: 184 },
    { x: 42, y: 184 },
  ];
  const width = 230;
  const height = 78;
  const points = positions.slice(0, nodes.length).map((position) => ({
    x: position.x + width / 2,
    y: position.y + height / 2,
  }));

  return (
    <svg
      aria-hidden='true'
      className='h-full w-full'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 640 320'
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
      <text
        fill='var(--text-tertiary)'
        fontFamily='var(--firaCode-font)'
        fontSize='10'
        x='42'
        y='28'
      >
        KEY SYSTEM PATH
      </text>
      <text
        fill='var(--text-tertiary)'
        fontFamily='var(--firaCode-font)'
        fontSize='9'
        textAnchor='end'
        x='598'
        y='28'
      >
        {architecture.nodes.length} NODES / {architecture.edges.length} LINKS
      </text>
      <line stroke='var(--line-default)' x1='42' x2='598' y1='40' y2='40' />

      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const horizontal = point.y === next.y;
        const forward = horizontal ? next.x > point.x : next.y > point.y;
        const path = horizontal
          ? `M ${point.x + (forward ? width / 2 : -width / 2)} ${point.y} H ${next.x + (forward ? -width / 2 : width / 2)}`
          : `M ${point.x} ${point.y + (forward ? height / 2 : -height / 2)} V ${next.y + (forward ? -height / 2 : height / 2)}`;

        return (
          <g key={`${nodes[index].id}-${nodes[index + 1].id}`}>
            <path
              d={path}
              fill='none'
              markerEnd={`url(#${markerId})`}
              stroke='var(--diagram-track)'
              strokeWidth='5'
            />
            <path
              d={path}
              fill='none'
              markerEnd={`url(#${markerId})`}
              stroke={accent}
              strokeWidth='1.5'
            />
          </g>
        );
      })}

      {nodes.map((node, index) => {
        const position = positions[index];
        return (
          <g key={node.id}>
            <rect
              fill='var(--surface-1)'
              height={height}
              rx='3'
              stroke='var(--line-strong)'
              strokeDasharray={node.status === 'planned' ? '5 4' : undefined}
              width={width}
              x={position.x}
              y={position.y}
            />
            <rect
              fill={node.status === 'planned' ? 'var(--signal-500)' : accent}
              height={height}
              width='6'
              x={position.x}
              y={position.y}
            />
            <text
              fill={accent}
              fontFamily='var(--firaCode-font)'
              fontSize='9'
              x={position.x + 18}
              y={position.y + 22}
            >
              {String(index + 1).padStart(2, '0')} / {NODE_CODES[node.type]}
            </text>
            <text
              fill='var(--text-primary)'
              fontFamily='var(--onestSans-font)'
              fontSize='15'
              fontWeight='500'
              x={position.x + 18}
              y={position.y + 49}
            >
              {node.label}
            </text>
            <text
              fill='var(--text-tertiary)'
              fontFamily='var(--firaCode-font)'
              fontSize='8'
              textAnchor='end'
              x={position.x + width - 14}
              y={position.y + 66}
            >
              {node.status === 'planned' ? 'PLANNED' : 'ACTIVE'}
            </text>
          </g>
        );
      })}

      {architecture.nodes.length > nodes.length ? (
        <text
          fill='var(--text-secondary)'
          fontFamily='var(--firaCode-font)'
          fontSize='9'
          textAnchor='end'
          x='598'
          y='300'
        >
          + {architecture.nodes.length - nodes.length} NODES IN FULL SCHEMATIC
        </text>
      ) : null}
    </svg>
  );
};

export const ArchitectureMap = ({
  architecture,
  accent,
  activeNodeId,
  variant = 'detail',
}: ArchitectureMapProps) => {
  const instanceId = useId().replace(/:/g, '');
  const markerId = `arrow-${instanceId}`;
  const connectedNodeIds = new Set(
    architecture.edges.flatMap((edge) => {
      if (!activeNodeId) return [];
      if (edge.source === activeNodeId) return [edge.target];
      if (edge.target === activeNodeId) return [edge.source];
      return [];
    }),
  );

  if (variant === 'preview') {
    return (
      <PreviewArchitectureMap
        accent={accent}
        architecture={architecture}
        markerId={markerId}
      />
    );
  }

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
          orient='auto-start-reverse'
          refX='5'
          refY='3'
          viewBox='0 0 6 6'
        >
          <path d='M 0 0 L 6 3 L 0 6 z' fill={accent} />
        </marker>
      </defs>
      {architecture.edges.map((edge) => {
        const geometry = edgeGeometry(edge, architecture.nodes);
        if (!geometry) return null;
        const isActive =
          !activeNodeId ||
          edge.source === activeNodeId ||
          edge.target === activeNodeId;
        const edgeLabel = edge.protocol ?? edge.label;

        return (
          <g key={edge.id} opacity={isActive ? 1 : 0.48}>
            <path
              d={geometry.path}
              fill='none'
              stroke='var(--diagram-track)'
              strokeWidth='5'
            />
            <path
              d={geometry.path}
              fill='none'
              markerEnd={`url(#${markerId})`}
              markerStart={
                edge.direction === 'bidirectional'
                  ? `url(#${markerId})`
                  : undefined
              }
              stroke={accent}
              strokeWidth='1.5'
            />
            {edgeLabel ? (
              <text
                fill='var(--text-tertiary)'
                fontFamily='var(--firaCode-font)'
                fontSize='7'
                x={geometry.labelX}
                y={geometry.labelY}
              >
                {edgeLabel.toUpperCase()}
              </text>
            ) : null}
          </g>
        );
      })}
      {architecture.nodes.map((node, index) => {
        const isActive = node.id === activeNodeId;
        const isConnected = connectedNodeIds.has(node.id);
        const isDimmed = activeNodeId && !isActive && !isConnected;
        const nodeAccent =
          node.status === 'planned' ? 'var(--signal-500)' : accent;

        return (
          <g key={node.id} opacity={isDimmed ? 0.58 : 1}>
            <rect
              fill='var(--surface-1)'
              height={NODE_HEIGHT}
              rx='3'
              stroke={isActive ? nodeAccent : 'var(--line-strong)'}
              strokeDasharray={node.status === 'planned' ? '5 4' : undefined}
              strokeWidth={isActive ? '2' : '1'}
              width={NODE_WIDTH}
              x={node.x}
              y={node.y}
            />
            <rect
              fill={nodeAccent}
              height={NODE_HEIGHT}
              opacity={isActive ? 1 : 0.72}
              width='5'
              x={node.x}
              y={node.y}
            />
            <circle
              cx={node.x}
              cy={node.y + NODE_HEIGHT / 2}
              fill='var(--surface-1)'
              r='3'
              stroke='var(--line-strong)'
            />
            <circle
              cx={node.x + NODE_WIDTH}
              cy={node.y + NODE_HEIGHT / 2}
              fill='var(--surface-1)'
              r='3'
              stroke='var(--line-strong)'
            />
            <text
              fill={nodeAccent}
              fontFamily='var(--firaCode-font)'
              fontSize='8'
              x={node.x + 14}
              y={node.y + 18}
            >
              {NODE_CODES[node.type]}
            </text>
            <text
              fill='var(--text-tertiary)'
              fontFamily='var(--firaCode-font)'
              fontSize='7'
              textAnchor='end'
              x={node.x + NODE_WIDTH - 10}
              y={node.y + 18}
            >
              {String(index + 1).padStart(2, '0')}
            </text>
            <text
              fill='var(--text-primary)'
              fontFamily='var(--onestSans-font)'
              fontSize='11'
              fontWeight='500'
              x={node.x + 14}
              y={node.y + 41}
            >
              {node.label}
            </text>
            <text
              fill='var(--text-tertiary)'
              fontFamily='var(--firaCode-font)'
              fontSize='7'
              x={node.x + 14}
              y={node.y + 55}
            >
              {node.status === 'planned' ? 'PLANNED' : node.type.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

interface ArchitectureExplorerProps {
  project: Pick<WorkItem, 'id' | 'architecture' | 'accent'>;
}

const ArchitectureExplorer = ({ project }: ArchitectureExplorerProps) => {
  const [activeNodeId, setActiveNodeId] = useState(
    project.architecture.nodes[0].id,
  );
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);
  const accent = WORK_ACCENT_COLORS[project.accent];
  const activeNode =
    project.architecture.nodes.find((node) => node.id === activeNodeId) ??
    project.architecture.nodes[0];
  const activeNodeIndex = project.architecture.nodes.findIndex(
    (node) => node.id === activeNode.id,
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    setPinnedNodeId(null);
    setActiveNodeId(project.architecture.nodes[0].id);
  };

  return (
    <section
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
        <div className='flex flex-col gap-4 border-b border-[var(--line-default)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='font-code text-[10px] uppercase text-[var(--text-primary)]'>
              System schematic
            </p>
            <p className='mt-1 font-code text-[9px] uppercase text-[var(--text-tertiary)]'>
              Select a node to inspect its role and connections
            </p>
          </div>
          <div className='flex flex-wrap gap-x-5 gap-y-2 font-code text-[9px] uppercase text-[var(--text-tertiary)]'>
            <span>{project.architecture.nodes.length} nodes</span>
            <span>{project.architecture.edges.length} links</span>
            <span className='inline-flex items-center gap-2'>
              <span
                aria-hidden='true'
                className='h-2 w-2 rounded-sm'
                style={{ backgroundColor: accent }}
              />
              selected path
            </span>
            <span className='inline-flex items-center gap-2'>
              <span
                aria-hidden='true'
                className='h-2 w-2 rounded-sm bg-[var(--signal-500)]'
              />
              planned
            </span>
          </div>
        </div>
        <div className='scrollbar-thin overflow-x-auto'>
          <div className='relative h-[360px] min-w-[760px] bg-[var(--bg-layer)]'>
            <ArchitectureMap
              accent={accent}
              activeNodeId={activeNodeId}
              architecture={project.architecture}
            />

            {project.architecture.nodes.map((node) => {
              return (
                <button
                  key={node.id}
                  type='button'
                  aria-label={`${node.label}: ${node.description}`}
                  aria-pressed={pinnedNodeId === node.id}
                  className='absolute h-[64px] rounded-sm bg-transparent text-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)]'
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
          className='grid gap-5 border-t border-[var(--line-default)] bg-[var(--surface-2)] px-5 py-5 sm:grid-cols-[110px_130px_minmax(0,1fr)]'
        >
          <div>
            <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Node
            </p>
            <p className='mt-1 font-code text-sm text-[var(--text-primary)]'>
              {String(activeNodeIndex + 1).padStart(2, '0')} /{' '}
              {NODE_CODES[activeNode.type]}
            </p>
          </div>
          <div>
            <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Component
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
