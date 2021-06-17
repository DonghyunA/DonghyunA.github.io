import React from "react";
import AdSense from "react-adsense";

const ContentAd = () => {
  return (
    // <>
    //   <script
    //     async
    //     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    //   ></script>
    //   <ins
    //     class="adsbygoogle"
    //     style={{ display: "block", textAlign: "center" }}
    //     data-ad-layout="in-article"
    //     data-ad-format="fluid"
    //     data-ad-client="ca-pub-5708410027420247"
    //     data-ad-slot="1754176350"
    //   ></ins>
    //   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    // </>
    <AdSense.Google
      style={{ display: "block", textAlign: "center" }}
      layout="in-article"
      format="fluid"
      client="ca-pub-5708410027420247"
      slot="1754176350"
    ></AdSense.Google>
  );
};

export default ContentAd;
