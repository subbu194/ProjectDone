import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ProDone - Web App & AI Solutions</title>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 