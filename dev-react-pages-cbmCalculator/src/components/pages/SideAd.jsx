import React from "react";
import AdSense from "react-adsense";

const SideAd = () => {
  return (
    // <>
    //   <script
    //     async
    //     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    //   ></script>
    //   <ins
    //     class="adsbygoogle"
    //     style={{ display: "block" }}
    //     data-ad-client="ca-pub-5708410027420247"
    //     data-ad-slot="4542608339"
    //     data-ad-format="auto"
    //     data-full-width-responsive="true"
    //   ></ins>
    //   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    // </>
    <AdSense.Google
        style={{ display: "block" }}
        client="ca-pub-5708410027420247"
        slot="4542608339"
        format="auto"
        responsive="true"
  ></AdSense.Google>
  );
};

export default SideAd;
