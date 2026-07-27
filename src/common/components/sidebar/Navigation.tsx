import { MENU_APPS, MENU_ITEMS } from '@/common/constant/menu';

import Menu from './Menu';

const Navigation = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  const filteredAppsMenu = MENU_APPS?.filter((item) => item?.isShow);

  return (
    <>
      <Menu list={filteredMenu} />
      {filteredAppsMenu.length > 0 ? <Menu list={filteredAppsMenu} /> : null}
    </>
  );
};

export default Navigation;
