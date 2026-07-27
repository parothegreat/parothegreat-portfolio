export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  logo?: string;
  location: string;
  startDate: string;
  endDate?: string;
  type: 'organization' | 'internship' | 'employment' | 'volunteer';
  workMode?: 'onsite' | 'remote' | 'hybrid';
  responsibilities: string[];
  technologies?: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'team-it-member',
    role: 'IT Organization Member',
    organization: 'IT Mitra Industri Vocational High School',
    logo: '/images/logos/team-it.jpg',
    location: 'Bekasi, Indonesia',
    startDate: '2024-11',
    type: 'organization',
    workMode: 'onsite',
    responsibilities: [
      'Contribute across infrastructure, networking, backend development, network security, and DevOps tasks for school-related systems.',
      'Assist with maintaining internal services, troubleshooting network issues, and improving operational reliability.',
      'Build practical tools and automations to support technical workflows inside the organization.',
    ],
    technologies: [
      'Linux',
      'MikroTik',
      'TP-Link Omada',
      'Go',
      'Docker',
    ],
  },
  {
    id: 'denso-intern',
    role: 'IT System Intern',
    organization: 'Denso Manufacturing / PT Denso Indonesia',
    logo: '/images/logos/denso.svg',
    location: 'Bekasi, Indonesia',
    startDate: '2025-07',
    endDate: '2025-10',
    type: 'internship',
    workMode: 'onsite',
    responsibilities: [
      'Assisted with internal network monitoring and connection troubleshooting.',
      'Supported basic system security checks and day-to-day IT operations.',
      'Observed manufacturing technology workflows and strengthened practical infrastructure fundamentals.',
    ],
    technologies: ['Network monitoring', 'Troubleshooting', 'System security'],
  },
];
