// import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
// import type { AppProps } from 'next/app';

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
