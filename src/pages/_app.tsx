import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import 'tailwindcss/tailwind.css';
import '@/common/styles/globals.css';

import CommandPalette from '@/common/components/elements/CommandPalette';
import Layout from '@/common/components/layouts';
import { CommandPaletteProvider } from '@/common/context/CommandPaletteContext';
import { firaCode, onestSans } from '@/common/styles/fonts';

import defaultSEOConfig from '../../next-seo.config';

const ProgressBar = dynamic(
  () => import('src/common/components/elements/ProgressBar'),
  { ssr: false },
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            --firaCode-font: ${firaCode.style.fontFamily};
            --onestSans-font: ${onestSans.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...defaultSEOConfig} />
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <CommandPaletteProvider>
          <Layout>
            <CommandPalette />
            <ProgressBar />
            <Component {...pageProps} />
          </Layout>
        </CommandPaletteProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
