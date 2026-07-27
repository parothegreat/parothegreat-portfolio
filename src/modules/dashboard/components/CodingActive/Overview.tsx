import { IconType } from 'react-icons';
import { FiCode, FiDatabase, FiFileText, FiTerminal } from 'react-icons/fi';
import {
  SiC,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiDart,
  SiElixir,
  SiGnubash,
  SiGo,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiKotlin,
  SiLua,
  SiMarkdown,
  SiOpenjdk,
  SiPerl,
  SiPhp,
  SiPython,
  SiR,
  SiRuby,
  SiRust,
  SiScala,
  SiSolidity,
  SiSwift,
  SiTypescript,
} from 'react-icons/si';

import { formatDate } from '@/common/helpers';

const LANGUAGE_ICONS: Record<string, { icon: IconType; className: string }> = {
  bash: { icon: SiGnubash, className: 'text-green-500' },
  c: { icon: SiC, className: 'text-blue-500' },
  'c#': { icon: SiCsharp, className: 'text-violet-500' },
  'c++': { icon: SiCplusplus, className: 'text-blue-500' },
  css: { icon: SiCss3, className: 'text-blue-400' },
  dart: { icon: SiDart, className: 'text-sky-500' },
  elixir: { icon: SiElixir, className: 'text-violet-400' },
  go: { icon: SiGo, className: 'text-cyan-500' },
  haskell: { icon: SiHaskell, className: 'text-violet-400' },
  html: { icon: SiHtml5, className: 'text-orange-500' },
  java: { icon: SiOpenjdk, className: 'text-orange-500' },
  javascript: { icon: SiJavascript, className: 'text-yellow-400' },
  json: { icon: SiJson, className: 'text-amber-400' },
  kotlin: { icon: SiKotlin, className: 'text-violet-500' },
  lua: { icon: SiLua, className: 'text-blue-500' },
  markdown: { icon: SiMarkdown, className: 'text-neutral-500' },
  perl: { icon: SiPerl, className: 'text-blue-400' },
  php: { icon: SiPhp, className: 'text-indigo-400' },
  python: { icon: SiPython, className: 'text-yellow-400' },
  r: { icon: SiR, className: 'text-blue-400' },
  ruby: { icon: SiRuby, className: 'text-red-500' },
  rust: { icon: SiRust, className: 'text-orange-400' },
  scala: { icon: SiScala, className: 'text-red-500' },
  shell: { icon: FiTerminal, className: 'text-green-500' },
  solidity: { icon: SiSolidity, className: 'text-neutral-500' },
  sql: { icon: FiDatabase, className: 'text-sky-500' },
  swift: { icon: SiSwift, className: 'text-orange-500' },
  text: { icon: FiFileText, className: 'text-neutral-500' },
  typescript: { icon: SiTypescript, className: 'text-blue-400' },
};

interface OverviewProps {
  data?: {
    human_readable_total?: string;
    human_readable_daily_average?: string;
    best_day?: {
      text?: string;
      date?: string;
    };
    languages?: {
      name: string;
      percent?: number;
    }[];
    start_date?: string;
    end_date?: string;
  };
  totalLabel: string;
}

const Overview = ({ data, totalLabel }: OverviewProps) => {
  const total = data?.human_readable_total || 'N/A';
  const dailyAverage = data?.human_readable_daily_average || 'N/A';
  const bestDayTime = data?.best_day?.text || 'N/A';
  const bestDayDate = data?.best_day?.date;
  const topLanguage = data?.languages?.[0];
  const topLanguageText = topLanguage
    ? `${topLanguage.name} (${Math.round(topLanguage.percent ?? 0)}%)`
    : 'N/A';
  const dateRange =
    data?.start_date && data?.end_date
      ? `${formatDate(data.start_date, 'MMM d')} – ${formatDate(
          data.end_date,
          'MMM d, yyyy',
        )}`
      : 'Date range unavailable';
  const bestDay = bestDayDate
    ? `${bestDayTime} · ${formatDate(bestDayDate, 'MMM d')}`
    : bestDayTime;
  const secondaryMetrics = [
    { label: 'Daily average', value: dailyAverage },
    { label: 'Best day', value: bestDay },
    {
      label: 'Top language',
      value: topLanguageText,
      language: topLanguage?.name,
    },
  ];

  return (
    <div className='mt-8 border-y border-neutral-200 dark:border-neutral-800 lg:grid lg:grid-cols-[1.1fr_1fr]'>
      <div className='py-7 lg:pr-10'>
        <p className='font-code text-xs uppercase text-neutral-500'>
          {totalLabel} coding time
        </p>
        <p className='mt-3 text-4xl font-medium text-neutral-950 dark:text-neutral-50 sm:text-5xl'>
          {total}
        </p>
        <p className='mt-3 text-sm text-neutral-500'>{dateRange}</p>
      </div>

      <dl className='grid grid-cols-2 border-t border-neutral-200 dark:border-neutral-800 lg:border-l lg:border-t-0'>
        {secondaryMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={[
              'min-w-0 px-4 py-5 sm:px-5',
              index === 0
                ? 'border-r border-neutral-200 dark:border-neutral-800'
                : '',
              index === 2
                ? 'col-span-2 border-t border-neutral-200 dark:border-neutral-800'
                : '',
            ].join(' ')}
          >
            <dt className='text-xs text-neutral-500'>{metric.label}</dt>
            <dd className='mt-2 flex items-center gap-2 break-words text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base'>
              {metric.language
                ? (() => {
                    const languageIcon = LANGUAGE_ICONS[
                      metric.language.toLowerCase()
                    ] ?? {
                      icon: FiCode,
                      className: 'text-neutral-500',
                    };
                    const LanguageIcon = languageIcon.icon;

                    return (
                      <LanguageIcon
                        aria-hidden='true'
                        className={`h-5 w-5 shrink-0 ${languageIcon.className}`}
                      />
                    );
                  })()
                : null}
              <span>{metric.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Overview;
