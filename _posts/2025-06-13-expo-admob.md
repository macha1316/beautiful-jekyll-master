---
layout: post
title: expoでgoogle admobを導入してみた
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/expo_admob.png
share-img: /assets/img/expo_admob.png
tags: [Expo, Google Admob]
author: taiyou
---

## はじめに

expo sdk53 で google admob を実装してみました。  
今回は Mac の Simulator を使ってリワードとバナーの実装をテストしてみます。  
ほとんど以下のサイトを参考にしました。  
最後のテストコードだけ動かなかったので自分なりにカスタマイズしています。
https://ducker-tech.com/expo-admob/

<br>
## 必要なライブラリのインポート

```bash
yarn add react-native-google-mobile-ads
npx expo add expo-tracking-transparency
npx expo add expo-tracking-transparency
```

<br>
## 実装コード例

```ts
import { useEffect, useRef } from "react";
import {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const bannerAdUnitId = TestIds.BANNER;

const useAdmob = () => {
  // useRef で 1 インスタンスのみ生成
  const rewardedRef = useRef(RewardedAd.createForAdRequest(TestIds.REWARDED));

  const loadRewarded = () => {
    // すでにロード済みなら再ロードしない
    if (!rewardedRef.current.loaded) {
      rewardedRef.current.load();
    }
  };

  useEffect(() => {
    // 広告のロード完了後、再生
    const unsubscribeLoaded = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        rewardedRef.current.show();
      }
    );

    // 視聴完了/クローズ時など再ロードする処理も登録できる
    const unsubscribeClosed = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        // ここで再ロードしてもよい
        // rewardedRef.current.load();
      }
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const Banner = () => (
    <BannerAd
      unitId={bannerAdUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(error) => {
        console.log("BannerAd failed to load:", error);
      }}
    />
  );

  return { loadRewarded, Banner };
};

export default useAdmob;
```

## 呼び出し先コード例

```ts
import useAdmob from "@/src/test/useAdmob";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { useEffect } from "react";
import { Text, View } from "react-native";
import MobileAds from "react-native-google-mobile-ads";
export default function Index() {
  const { loadRewarded, Banner } = useAdmob();

  useEffect(() => {
    (async () => {
      // トラッキング許可の要求
      const { status: trackingStatus } =
        await requestTrackingPermissionsAsync();
      if (trackingStatus !== "granted") {
        // 拒否された場合、ここでパーソナライズ広告のオフなどをする
      }

      // AdMob初期化
      await MobileAds().initialize();
    })();
  }, []);

  return (
    <View>
      <Banner />
      <Text onPress={loadRewarded}>AdTest</Text>
    </View>
  );
}
```

## プレビルドする

広告テストするにはビルドしてプロジェクトとして実施する必要があります。  
react-native-google-mobile-ads はネイティブコードのため(expo で対応して欲しい 😭)

```bash
npm run ios
```

## Simulator 画面

バナー  
<img src="/assets//img//2025-06-13/admob1.png" alt="scret" style="max-width: 600px;" />  
リワード  
<img src="/assets//img//2025-06-13/admob2.png" alt="scret" style="max-width: 600px;" />

## おわりに

その他の記事もぜひご覧ください！

**お問い合わせ:** hiromacha1116@icloud.com
