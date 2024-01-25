import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="//cdn.8thwall.com/web/xrextras/xrextras.js" strategy="beforeInteractive" />
        <Script
          src={`//apps.8thwall.com/xrweb?appKey=${process.env.NEXT_PUBLIC_8THWALL_API_KEY}`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
