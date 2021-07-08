import ThemeSwitcher from '@/components/ThemeSwitcher';
import '@/styles/index.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_SITE_TITLE}
        />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_SITE_URL}
        />
        <meta
          property="twitter:title"
          content={process.env.NEXT_PUBLIC_SITE_TITLE}
        />
        <meta
          property="twitter:description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`}
        />
        <meta name="theme-color" content="#06b6d4" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="shortcut icon" href="/icon-192.png" />
      </Head>
      <Component {...pageProps} />
      <ThemeSwitcher />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default MyApp;
