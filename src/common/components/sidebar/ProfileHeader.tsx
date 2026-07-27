import Link from 'next/link';

import { PROFILE } from '@/data/profile';

import Image from '../elements/Image';

const ProfileHeader = () => {
  return (
    <div className='px-2'>
      <Image
        src={PROFILE.profileImage}
        alt={`${PROFILE.name} portrait`}
        width={72}
        height={72}
        rounded='rounded-full'
        className='h-[72px] w-[72px] object-cover transition-transform duration-200 hover:scale-[1.02] motion-reduce:transition-none'
        priority
      />
      <div className='mt-4'>
        <Link
          href='/'
          className='text-lg font-medium text-neutral-950 hover:text-blue-600 dark:text-neutral-100 dark:hover:text-blue-400'
        >
          {PROFILE.name}
        </Link>
        <p className='mt-1 text-sm text-neutral-500'>@{PROFILE.username}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
