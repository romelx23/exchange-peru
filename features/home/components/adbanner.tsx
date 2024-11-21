"use client"
import { FC, useEffect } from "react";

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
}

export const AdBanner: FC<AdBannerProps> = ({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive
}) => {

    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1635010729840024"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
    )
}