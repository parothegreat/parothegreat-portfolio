import SearchBox from '../../elements/SearchBox';
import ThemeToggleButton from '../../elements/ThemeToggleButton';
import Navigation from '../../sidebar/Navigation';
import ProfileHeader from '../../sidebar/ProfileHeader';

const Sidebar = () => {
  return (
    <aside
      id='sidebar'
      className='sticky top-0 flex h-screen flex-col py-10'
      aria-label='Primary navigation'
    >
      <ProfileHeader />
      <div className='mt-8'>
        <SearchBox />
      </div>
      <div className='mt-5'>
        <Navigation />
      </div>
      <div className='mt-auto space-y-5 border-t border-neutral-200 pt-5 dark:border-neutral-800'>
        <div className='flex items-start gap-2 px-2 text-xs leading-5 text-neutral-600 dark:text-neutral-400'>
          <span
            aria-hidden='true'
            className='mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500'
          />
          <span>Open to junior infrastructure and DevOps opportunities.</span>
        </div>
        <ThemeToggleButton showLabel />
      </div>
    </aside>
  );
};

export default Sidebar;
