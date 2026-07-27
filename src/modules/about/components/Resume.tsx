import Link from 'next/link';
import { LuDownload as DownloadIcon } from 'react-icons/lu';

const Resume = () => {
  const RESUME_URL =
    'mailto:alvaroprayogo38@gmail.com?subject=Resume%20Request';

  return (
    <div className='space-y-5'>
      <Link
        href={RESUME_URL}
        target='_blank'
        passHref
        className='flex w-fit items-center gap-2 rounded-lg border border-neutral-400 px-4 py-2.5 text-sm text-neutral-600 transition-all duration-300 hover:gap-3 hover:border-neutral-500 hover:text-neutral-700 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 hover:dark:border-neutral-300 hover:dark:text-neutral-300'
        data-umami-event='Download Resume'
      >
        <DownloadIcon />
        <span>Request Resume</span>
      </Link>
    </div>
  );
};

export default Resume;
