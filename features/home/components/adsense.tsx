import Script from "next/script";

type AdSenseProps = {
    pid: string;
};

export const AdSense: React.FC<AdSenseProps> = ({ pid }) => {

    return (
        <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ pid }`}
            crossOrigin="anonymous"
        />
    )
}