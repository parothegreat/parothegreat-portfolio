import Sidebar from '../partials/Sidebar';
import Profile from '../../sidebar/Profile';

const HeaderSidebar = () => {
  return (
    <header>
      <div className='lg:hidden'>
        <Profile />
      </div>
      <div className='hidden lg:block'>
        <Sidebar />
      </div>
    </header>
  );
};

export default HeaderSidebar;
