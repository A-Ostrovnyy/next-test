import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My top is the best top</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
  </>
  )
}

export default MyApp;
