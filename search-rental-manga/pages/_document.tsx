import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="ja">
            <Head>
                {/* Google Adsense */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6645684605618765"
                    crossOrigin="anonymous"></script>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123608423-1"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-123608423-1');
                            `
                }} />
            </Head>
            <body>
                <Main></Main>
                <NextScript></NextScript>
            </body>
        </Html>
    );
};

export default Document;