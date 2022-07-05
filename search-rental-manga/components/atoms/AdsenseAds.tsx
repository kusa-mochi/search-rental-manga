import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import styles from "./AdsenseAds.module.scss";

declare global {
    var adsbygoogle: unknown[];
}

export const AdSenseAds: FC = () => {

    const { asPath } = useRouter();
    useEffect(() => {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error(error);
        }
    }, [asPath]);

    return (
        <div key={asPath}>
            <ins
                className={`adsbygoogle ${styles.adsenseIns}`}
                data-ad-client="ca-pub-6645684605618765"
                data-ad-slot="7871341229"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};
