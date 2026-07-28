import Image from 'next/image';
import {
  FiActivity,
  FiCloud,
  FiCoffee,
  FiCpu,
  FiServer,
  FiShield,
  FiWifi,
} from 'react-icons/fi';

import { WORK_ACCENT_COLORS, WorkItem } from '@/data/work';
import {
  getPrimaryWorkMedia,
  WorkMedia,
  WorkPlaceholderState,
} from '@/data/work-media';

import ProjectVisualPlaceholder from './ProjectVisualPlaceholder';

interface ProjectVisualProps {
  project: Pick<
    WorkItem,
    'title' | 'category' | 'stack' | 'accent' | 'mediaIds'
  >;
  media?: WorkMedia;
  priority?: boolean;
  sizes?: string;
}

const categoryIcon = (category: string) => {
  const normalized = category.toLowerCase();

  if (normalized.includes('iot')) return <FiCpu />;
  if (normalized.includes('cloud')) return <FiCloud />;
  if (normalized.includes('monitor')) return <FiActivity />;
  if (normalized.includes('security')) return <FiShield />;
  if (normalized.includes('network')) return <FiWifi />;
  if (normalized.includes('coffee')) return <FiCoffee />;
  return <FiServer />;
};

const ProjectVisual = ({
  project,
  media = getPrimaryWorkMedia(project.mediaIds),
  priority = false,
  sizes = '100vw',
}: ProjectVisualProps) => {
  const accent = WORK_ACCENT_COLORS[project.accent];

  if (media?.type === 'image' && media.src) {
    return (
      <div className='relative h-full w-full overflow-hidden bg-[var(--surface-1)]'>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className={
            media.src.endsWith('.svg') ? 'object-contain p-8' : 'object-cover'
          }
          priority={priority}
        />
      </div>
    );
  }

  return (
    <ProjectVisualPlaceholder
      accent={accent}
      category={project.category}
      icon={categoryIcon(project.category)}
      label={media?.placeholderLabel}
      projectTitle={project.title}
      stack={project.stack}
      state={
        media?.placeholderState ??
        ('visual-pending' satisfies WorkPlaceholderState)
      }
    />
  );
};

export default ProjectVisual;
