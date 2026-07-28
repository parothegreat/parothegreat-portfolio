import {
  AnimatePresence,
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

import styles from './Dock.module.css';

import cn from '@/common/libs/cn';

export interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
  separatorBefore?: boolean;
}

interface DockItemProps extends DockItemData {
  mouseY: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

interface DockProps {
  items?: DockItemData[];
  className?: string;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
}

const DEFAULT_SPRING: SpringOptions = {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
};

const DockItem = ({
  icon,
  label,
  onClick,
  active = false,
  className,
  separatorBefore = false,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const mouseDistance = useTransform(mouseY, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    return value - (rect?.top ?? 0) - baseItemSize / 2;
  });
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);
  const itemSize = reduceMotion ? baseItemSize : size;

  return (
    <motion.button
      ref={ref}
      type='button'
      style={{ width: itemSize, height: itemSize }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        styles.item,
        active && styles.active,
        separatorBefore && styles.separator,
        className,
      )}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      <span aria-hidden='true' className={styles.icon}>
        {icon}
      </span>
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className={styles.label}
            role='tooltip'
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
};

const Dock = ({
  items = [],
  className,
  spring = DEFAULT_SPRING,
  magnification = 64,
  distance = 150,
  baseItemSize = 44,
}: DockProps) => {
  const mouseY = useMotionValue(Infinity);

  return (
    <nav className={styles.outer} aria-label='Primary navigation'>
      <motion.div
        onPointerMove={({ clientY }) => mouseY.set(clientY)}
        onPointerLeave={() => mouseY.set(Infinity)}
        className={cn(styles.panel, className)}
        role='toolbar'
        aria-orientation='vertical'
      >
        {items.map((item) => (
          <DockItem
            key={item.label}
            {...item}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </motion.div>
    </nav>
  );
};

export default Dock;
