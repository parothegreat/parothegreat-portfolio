import { IconType } from 'react-icons';
import {
  FiActivity,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiRadio,
  FiShield,
  FiTerminal,
  FiTool,
  FiWifi,
} from 'react-icons/fi';
import {
  SiApache,
  SiCisco,
  SiCloudflare,
  SiCss3,
  SiDocker,
  SiEspressif,
  SiFedora,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGo,
  SiGrafana,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiMariadb,
  SiMikrotik,
  SiMysql,
  SiNextcloud,
  SiNginx,
  SiNodedotjs,
  SiPrometheus,
  SiRaspberrypi,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTelegram,
  SiThreedotjs,
  SiTplink,
  SiUbuntu,
  SiVite,
  SiZsh,
} from 'react-icons/si';

import cn from '@/common/libs/cn';

interface ToolIconProps {
  name: string;
  className?: string;
}

const TOOL_ICONS: Record<string, { icon: IconType; className?: string }> = {
  activity: { icon: FiActivity, className: 'text-sky-400' },
  apache: { icon: SiApache, className: 'text-red-400' },
  bash: { icon: SiGnubash, className: 'text-green-400' },
  cisco: { icon: SiCisco, className: 'text-sky-400' },
  cloudflare: { icon: SiCloudflare, className: 'text-orange-400' },
  code: { icon: FiCode, className: 'text-neutral-300' },
  cpu: { icon: FiCpu, className: 'text-teal-400' },
  css: { icon: SiCss3, className: 'text-blue-400' },
  database: { icon: FiDatabase, className: 'text-sky-400' },
  docker: { icon: SiDocker, className: 'text-blue-400' },
  espressif: { icon: SiEspressif, className: 'text-red-400' },
  fedora: { icon: SiFedora, className: 'text-blue-400' },
  git: { icon: SiGit, className: 'text-orange-400' },
  github: { icon: SiGithub, className: 'text-neutral-200' },
  globe: { icon: FiGlobe, className: 'text-sky-400' },
  go: { icon: SiGo, className: 'text-cyan-400' },
  grafana: { icon: SiGrafana, className: 'text-orange-400' },
  gsap: { icon: SiGreensock, className: 'text-lime-400' },
  html: { icon: SiHtml5, className: 'text-orange-400' },
  javascript: { icon: SiJavascript, className: 'text-yellow-300' },
  kali: { icon: SiKalilinux, className: 'text-cyan-400' },
  linux: { icon: SiLinux, className: 'text-neutral-200' },
  mariadb: { icon: SiMariadb, className: 'text-cyan-300' },
  mikrotik: { icon: SiMikrotik, className: 'text-red-400' },
  mysql: { icon: SiMysql, className: 'text-blue-400' },
  network: { icon: FiWifi, className: 'text-cyan-400' },
  nextcloud: { icon: SiNextcloud, className: 'text-blue-400' },
  nginx: { icon: SiNginx, className: 'text-green-400' },
  node: { icon: SiNodedotjs, className: 'text-green-400' },
  prometheus: { icon: SiPrometheus, className: 'text-orange-400' },
  radio: { icon: FiRadio, className: 'text-amber-300' },
  'raspberry-pi': { icon: SiRaspberrypi, className: 'text-rose-400' },
  react: { icon: SiReact, className: 'text-cyan-400' },
  rust: { icon: SiRust, className: 'text-orange-300' },
  shield: { icon: FiShield, className: 'text-emerald-400' },
  tailwind: { icon: SiTailwindcss, className: 'text-cyan-300' },
  telegram: { icon: SiTelegram, className: 'text-sky-400' },
  terminal: { icon: FiTerminal, className: 'text-neutral-300' },
  three: { icon: SiThreedotjs, className: 'text-neutral-200' },
  'tp-link': { icon: SiTplink, className: 'text-cyan-400' },
  ubuntu: { icon: SiUbuntu, className: 'text-orange-400' },
  vite: { icon: SiVite, className: 'text-violet-400' },
  wifi: { icon: FiWifi, className: 'text-cyan-400' },
  zsh: { icon: SiZsh, className: 'text-neutral-200' },
};

const ToolIcon = ({ name, className }: ToolIconProps) => {
  const icon = TOOL_ICONS[name] ?? {
    icon: FiTool,
    className: 'text-neutral-500',
  };
  const Icon = icon.icon;

  return (
    <Icon
      aria-hidden='true'
      className={cn('h-5 w-5 shrink-0', icon.className, className)}
    />
  );
};

export default ToolIcon;
