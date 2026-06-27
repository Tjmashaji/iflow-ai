import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="iFlow AI" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body style={{margin:0,background:'#000'}}>
        <Main /><NextScript />
      </body>
    </Html>
  )
}
