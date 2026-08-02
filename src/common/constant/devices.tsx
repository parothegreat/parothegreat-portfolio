import {
  BsLaptop,
  BsPhone,
  BsSmartwatch,
  BsSpeaker,
  BsTablet,
  BsTv,
} from 'react-icons/bs';

import { DeviceInfoProps } from '../types/spotify';

const iconSize = 24;
const iconClassName = 'w-auto text-neutral-700 dark:text-neutral-300';

export const PAIR_DEVICES: Record<string, DeviceInfoProps> = {
  Computer: {
    icon: <BsLaptop className={iconClassName} size={iconSize} />,
    model: 'Laptop',
    id: 'parothegreat-laptop',
  },
  Smartphone: {
    icon: <BsPhone className={iconClassName} size={iconSize} />,
    model: 'Smartphone',
    id: 'parothegreat-phone',
  },
  Tablet: {
    icon: <BsTablet className={iconClassName} size={iconSize} />,
    model: 'Tablet',
    id: 'parothegreat-tablet',
  },
  Smartwatch: {
    icon: <BsSmartwatch className={iconClassName} size={iconSize} />,
    model: 'Smartwatch',
    id: 'parothegreat-watch',
  },
  Speaker: {
    icon: <BsSpeaker className={iconClassName} size={iconSize} />,
    model: 'Sony',
    id: 'parothegreat-speaker',
  },
  TV: {
    icon: <BsTv className={iconClassName} size={iconSize} />,
    model: 'Android TV',
    id: 'parothegreat-tv',
  },
};
