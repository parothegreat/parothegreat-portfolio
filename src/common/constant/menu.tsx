import { BiRocket as ContactIcon } from 'react-icons/bi';
import {
  BsEnvelopeAtFill as EmailIcon,
  BsGithub as GithubIcon,
  BsInstagram as InstagramIcon,
  BsLinkedin as LinkedinIcon,
  BsTwitter as TwitterIcon,
} from 'react-icons/bs';
import {
  FiActivity as ActivityIcon,
  FiBriefcase as WorkIcon,
  FiPieChart as AnalyticsIcon,
  FiPocket as HomeIcon,
  FiTool as ToolkitIcon,
  FiUser as ProfileIcon,
} from 'react-icons/fi';

import { MenuItemProps } from '../types/menu';

const iconSize = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Home',
    type: 'Pages',
  },
  {
    title: 'Work',
    href: '/work',
    icon: <WorkIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Work',
    type: 'Pages',
  },
  {
    title: 'Activity',
    href: '/activity',
    icon: <ActivityIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Activity',
    type: 'Pages',
  },
  {
    title: 'Toolkit',
    href: '/toolkit',
    icon: <ToolkitIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Toolkit',
    type: 'Pages',
  },
  {
    title: 'About',
    href: '/about',
    icon: <ProfileIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: About',
    type: 'Pages',
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: <ContactIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Contact',
    type: 'Pages',
  },
];

export const MENU_APPS: MenuItemProps[] = [];

export const SOCIAL_MEDIA: MenuItemProps[] = [
  {
    title: 'Email',
    href: 'mailto:alvaroprayogo38@gmail.com',
    icon: <EmailIcon size={iconSize} />,
    isShow: true,
    isExternal: true,
    eventName: 'Contact: Email',
    type: 'Link',
  },

  {
    title: 'Linkedin',
    href: 'https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a',
    icon: <LinkedinIcon size={iconSize} />,
    isShow: true,
    isExternal: true,
    eventName: 'Social: Linkedin',
    type: 'Link',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/parothegreat',
    icon: <TwitterIcon size={iconSize} />,
    isShow: false,
    isExternal: true,
    eventName: 'Social: Twitter',
    type: 'Link',
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/parothegreat',
    icon: <InstagramIcon size={iconSize} />,
    isShow: false,
    isExternal: true,
    eventName: 'Social: Instagram',
    type: 'Link',
  },
  {
    title: 'Github',
    href: 'https://github.com/parothegreat',
    icon: <GithubIcon size={iconSize} />,
    isShow: true,
    isExternal: true,
    eventName: 'Social: Github',
    type: 'Link',
  },
];

export const EXTERNAL_LINKS: MenuItemProps[] = [
  {
    title: 'Analytics',
    href: 'https://parothegreat.site',
    icon: <AnalyticsIcon size={iconSize} />,
    isShow: false,
    isExternal: true,
    eventName: 'External Link: Analytics',
    type: 'Link',
  },
];
