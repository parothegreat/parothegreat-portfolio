export type SocialLinkIcon = 'email' | 'github' | 'linkedin' | 'instagram';

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: SocialLinkIcon;
  visible: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:alvaroprayogo38@gmail.com',
    icon: 'email',
    visible: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a',
    icon: 'linkedin',
    visible: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/parothegreat',
    icon: 'github',
    visible: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/parothegreat',
    icon: 'instagram',
    visible: false,
  },
];
