import localFont from 'next/font/local';

export const firaCode = localFont({
  src: './fonts/fira-code-latin.woff2',
  display: 'swap',
  weight: '300 700',
});

export const onestSans = localFont({
  src: './fonts/onest-latin.woff2',
  display: 'fallback',
  weight: '100 900',
});
