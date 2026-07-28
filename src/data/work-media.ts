export type WorkMediaType = 'image' | 'diagram' | 'video' | 'placeholder';

export type WorkPlaceholderState =
  | 'visual-pending'
  | 'hardware-pending'
  | 'screenshot-pending';

export type WorkPlaceholderLabel =
  | 'INTERFACE CAPTURE PENDING'
  | 'HARDWARE PHOTO PENDING'
  | 'TOPOLOGY VISUAL PENDING'
  | 'DASHBOARD CAPTURE PENDING'
  | 'SANITIZED OUTPUT PENDING'
  | 'DOCUMENTATION ASSET PENDING';

export interface WorkMedia {
  id: string;
  projectSlug: string;
  type: WorkMediaType;
  src?: string;
  alt: string;
  caption?: string;
  redacted?: boolean;
  primary?: boolean;
  aspectRatio?: `${number}/${number}`;
  placeholderState?: WorkPlaceholderState;
  placeholderLabel?: WorkPlaceholderLabel;
}

export const WORK_MEDIA: WorkMedia[] = [
  {
    id: 'smart-green-hub-dashboard',
    projectSlug: 'smart-green-hub',
    type: 'image',
    src: '/images/work/smart-green-hub/main-dashboard.png',
    alt: 'Smart Green Hub dashboard with hydroponic readings, actuator controls, and trend charts',
    caption: 'Main monitoring and control dashboard.',
    primary: true,
    aspectRatio: '1903/1085',
  },
  {
    id: 'smart-green-hub-warning',
    projectSlug: 'smart-green-hub',
    type: 'image',
    src: '/images/work/smart-green-hub/warning.png',
    alt: 'Smart Green Hub warning interface for hydroponic conditions',
    caption: 'Condition warnings generated from the current dashboard rules.',
    aspectRatio: '1918/1085',
  },
  {
    id: 'smart-green-hub-report',
    projectSlug: 'smart-green-hub',
    type: 'image',
    src: '/images/work/smart-green-hub/report.png',
    alt: 'Smart Green Hub daily reporting interface',
    caption: 'Daily summaries and recorded operating conditions.',
    aspectRatio: '1918/1085',
  },
  {
    id: 'smart-green-hub-settings',
    projectSlug: 'smart-green-hub',
    type: 'image',
    src: '/images/work/smart-green-hub/settings.png',
    alt: 'Smart Green Hub plant profile and controller settings interface',
    caption: 'Plant profiles, thresholds, and controller settings.',
    aspectRatio: '1918/1085',
  },
  {
    id: 'smart-green-hub-mark',
    projectSlug: 'smart-green-hub',
    type: 'image',
    src: '/images/work/smart-green-hub/leaf.svg',
    alt: 'Smart Green Hub leaf mark',
    caption: 'Project interface mark.',
    aspectRatio: '1/1',
  },
  {
    id: 'team-it-work-order-interface',
    projectSlug: 'team-it-work-order',
    type: 'placeholder',
    alt: 'Pending interface capture for Team IT Work Order System',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'screenshot-pending',
    placeholderLabel: 'INTERFACE CAPTURE PENDING',
  },
  {
    id: 'rfid-door-access-hardware',
    projectSlug: 'rfid-door-access',
    type: 'placeholder',
    alt: 'Pending hardware photograph for RFID Door Access System',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'hardware-pending',
    placeholderLabel: 'HARDWARE PHOTO PENDING',
  },
  {
    id: 'school-cloud-service-interface',
    projectSlug: 'school-cloud-service',
    type: 'placeholder',
    alt: 'Pending sanitized interface capture for School Cloud Service',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'screenshot-pending',
    placeholderLabel: 'INTERFACE CAPTURE PENDING',
  },
  {
    id: 'monitoring-stack-dashboard',
    projectSlug: 'monitoring-stack',
    type: 'placeholder',
    alt: 'Pending sanitized dashboard capture for Monitoring Stack',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'screenshot-pending',
    placeholderLabel: 'DASHBOARD CAPTURE PENDING',
  },
  {
    id: 'recon-engine-output',
    projectSlug: 'recon-engine',
    type: 'placeholder',
    alt: 'Pending sanitized output for Recon Engine',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'visual-pending',
    placeholderLabel: 'SANITIZED OUTPUT PENDING',
  },
  {
    id: 'school-network-operations-topology',
    projectSlug: 'school-network-operations',
    type: 'placeholder',
    alt: 'Pending sanitized topology visual for School Network Operations',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'visual-pending',
    placeholderLabel: 'TOPOLOGY VISUAL PENDING',
  },
  {
    id: 'mitra-coffeeshop-interface',
    projectSlug: 'mitra-coffeeshop',
    type: 'placeholder',
    alt: 'Pending interface capture for Mitra Coffeeshop',
    primary: true,
    aspectRatio: '16/9',
    placeholderState: 'screenshot-pending',
    placeholderLabel: 'INTERFACE CAPTURE PENDING',
  },
];

const WORK_MEDIA_BY_ID = new Map(WORK_MEDIA.map((item) => [item.id, item]));

export const getWorkMedia = (mediaIds: string[]) =>
  mediaIds.flatMap((id) => {
    const item = WORK_MEDIA_BY_ID.get(id);
    return item ? [item] : [];
  });

export const getPrimaryWorkMedia = (mediaIds: string[]) => {
  const media = getWorkMedia(mediaIds);
  return media.find((item) => item.primary) ?? media[0];
};
