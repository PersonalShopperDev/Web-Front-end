/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M5G3WBR');`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '570808527254325'); 
            fbq('track', 'PageView');`,
            }}
          />
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <script
            type="text/javascript"
            src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
            charSet="utf-8"
          />
          <script
            type="text/javascript"
            src="https://developers.kakao.com/sdk/js/kakao.js"
            charSet="utf-8"
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=570808527254325&ev=PageView&noscript=1"
          />`,
            }}
          />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<noscript><iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M5G3WBR"
              height="0"
              width="0"
              style="display:none;visibility:hidden"></iframe></noscript>`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
