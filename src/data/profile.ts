export interface Profile {
  name: string;
  fullName: string;
  username: string;
  location: string;
  timezone: string;
  headline: string;
  shortBio: string;
  availability: string;
  primaryFocus: string[];
  profileImage: string;
}

export const PROFILE: Profile = {
  name: 'Alvaro Prayogo',
  fullName: 'Moehammad Alvaro Pirata Prayogo',
  username: 'parothegreat',
  location: 'Bekasi, Indonesia',
  timezone: 'GMT+7',
  headline: 'I build, operate, and secure practical systems.',
  shortBio:
    "I'm an Industrial Electronics Engineering student focused on Linux, DevOps, networking, backend services, cybersecurity, and IoT.",
  availability:
    'Open to junior infrastructure, DevOps, system administration, and security opportunities.',
  primaryFocus: [
    'Infrastructure & Linux',
    'Networking',
    'Backend systems',
    'Cybersecurity',
    'IoT',
  ],
  profileImage: '/images/profile/pfp.jpeg',
};

export const PROFILE_STATUS = [
  { label: 'Location', value: PROFILE.location },
  { label: 'Primary OS', value: 'Fedora Linux' },
  { label: 'Focus', value: 'Infrastructure & Security' },
  { label: 'Building', value: 'Portfolio & school systems' },
  { label: 'Availability', value: 'Open to opportunities' },
] as const;

export const PROOF_POINTS = [
  'Linux-first workflow',
  'Self-hosted infrastructure',
  'School network operations',
  'Backend and IoT systems',
] as const;

export const CAPABILITIES = [
  {
    id: 'infrastructure',
    title: 'Infrastructure & Linux Operations',
    description:
      'Operating Linux workstations, servers, self-hosted services, and access controls.',
    evidence: 'School cloud services and home lab',
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    description:
      'Packaging services, routing traffic, and making deployments repeatable.',
    evidence: 'Docker, Nginx, and Cloudflare Tunnel',
  },
  {
    id: 'networking',
    title: 'Networking & Wireless Operations',
    description:
      'Troubleshooting connectivity, segmentation, switching, and managed wireless.',
    evidence: 'MikroTik, Cisco IOS, and TP-Link Omada',
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description:
      'Building operational APIs and services around real infrastructure workflows.',
    evidence: 'Team IT Work Order and RFID access services',
  },
  {
    id: 'security',
    title: 'Security Research & Reconnaissance',
    description:
      'Running authorized labs and automating scoped reconnaissance workflows.',
    evidence: 'Recon Engine and controlled security labs',
  },
  {
    id: 'iot',
    title: 'IoT & Access Control',
    description:
      'Connecting embedded hardware to backend services and operational alerts.',
    evidence: 'ESP32 RFID door access system',
  },
] as const;

export const WORKING_PRINCIPLES = [
  {
    title: 'Reliability over unnecessary complexity',
    description:
      'Choose understandable systems that can be operated and repaired under real constraints.',
  },
  {
    title: 'Evidence before assumptions',
    description:
      'Use logs, metrics, packet data, and reproducible checks to guide technical decisions.',
  },
  {
    title: 'Automation for repeatable work',
    description:
      'Automate recurring operational steps while keeping the process visible and reviewable.',
  },
  {
    title: 'Security as an operational responsibility',
    description:
      'Treat access, exposure, updates, and monitoring as part of everyday system ownership.',
  },
] as const;
