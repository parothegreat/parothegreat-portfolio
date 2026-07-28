import { ReactNode } from 'react';

import HeaderSidebar from './header/HeaderSidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen'>
      <a
        href='#main-content'
        className='fixed left-4 top-3 z-[1000] -translate-y-20 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0 motion-reduce:transition-none'
      >
        Skip to content
      </a>
      <div className='mx-auto max-w-[1088px] lg:grid lg:grid-cols-[96px_minmax(0,960px)] lg:gap-8 lg:px-6'>
        <HeaderSidebar />
        <main id='main-content' className='min-w-0' tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
