export type WorkStatus =
  | 'active'
  | 'maintained'
  | 'completed'
  | 'experimental'
  | 'ongoing'
  | 'documenting';

export interface WorkItem {
  id: string;
  slug: string;
  index: number;
  title: string;
  shortDescription: string;
  category: string;
  role: string[];
  stack: string[];
  status: WorkStatus;
  featured?: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
  caseStudyAvailable?: boolean;
}

export const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  active: 'Active',
  maintained: 'Maintained',
  completed: 'Completed',
  experimental: 'Experimental / Active',
  ongoing: 'Ongoing',
  documenting: 'Documenting',
};

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'team-it-work-order',
    slug: 'team-it-work-order-system',
    index: 1,
    title: 'Team IT Work Order System',
    shortDescription:
      'Operational workflow platform for school IT requests and technical work tracking.',
    category: 'Systems',
    role: ['Backend', 'DevOps'],
    stack: ['Go', 'Gin', 'MariaDB', 'Docker', 'Nginx'],
    status: 'active',
    featured: true,
    caseStudyAvailable: false,
  },
  {
    id: 'rfid-door-access',
    slug: 'rfid-door-access-system',
    index: 2,
    title: 'RFID Door Access System',
    shortDescription:
      'RFID-based access control connecting embedded hardware, backend validation, and operational alerts.',
    category: 'IoT',
    role: ['Embedded', 'Backend'],
    stack: ['ESP32-C6', 'MFRC522', 'Go', 'MariaDB', 'Telegram Bot API'],
    status: 'active',
    featured: true,
    caseStudyAvailable: false,
  },
  {
    id: 'school-cloud-service',
    slug: 'school-cloud-service',
    index: 3,
    title: 'School Cloud Service',
    shortDescription:
      'Self-hosted collaboration service operated behind a reverse proxy and secure tunnel.',
    category: 'Infrastructure',
    role: ['System Administration'],
    stack: [
      'Ubuntu Server',
      'Nextcloud',
      'Apache',
      'Nginx',
      'Cloudflare Tunnel',
    ],
    status: 'maintained',
    featured: true,
    caseStudyAvailable: false,
  },
  {
    id: 'monitoring-stack',
    slug: 'monitoring-stack',
    index: 4,
    title: 'Monitoring Stack',
    shortDescription:
      'Linux infrastructure metrics collection and operational dashboards for school and lab systems.',
    category: 'Observability',
    role: ['Infrastructure', 'Monitoring'],
    stack: ['Prometheus', 'Grafana', 'Node Exporter'],
    status: 'maintained',
    caseStudyAvailable: false,
  },
  {
    id: 'recon-engine',
    slug: 'recon-engine',
    index: 5,
    title: 'Recon Engine',
    shortDescription:
      'Automation workflow for scoped asset discovery, HTTP validation, crawling, and security checks.',
    category: 'Security',
    role: ['Security Automation'],
    stack: ['Node.js', 'Bash', 'Subfinder', 'httpx', 'Nuclei', 'Katana'],
    status: 'experimental',
    caseStudyAvailable: false,
  },
  {
    id: 'school-network-operations',
    slug: 'school-network-operations',
    index: 6,
    title: 'School Network Operations',
    shortDescription:
      'Ongoing wireless monitoring, segmentation, switching, and connectivity troubleshooting.',
    category: 'Networking',
    role: ['Network Operations'],
    stack: ['TP-Link Omada', 'MikroTik', 'Cisco IOS', 'VLAN', 'TCP/IP'],
    status: 'ongoing',
    caseStudyAvailable: false,
  },
];

export const FEATURED_WORK = WORK_ITEMS.filter((item) => item.featured);
