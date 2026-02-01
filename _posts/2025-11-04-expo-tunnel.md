---
layout: post
title: "同じ Wi-Fi でも Expo Go でテストできないときの対処方法"
subtitle: "外出先 Wi-Fi でも Expo Go を繋ぐための手順"
description: "Expo Go が外部 Wi-Fi で繋がらないときに試したトンネル経由の接続方法をまとめました。"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-11-04/samune.png
share-img: /assets/img/2025-11-04/samune.png
tags: [Expo, react-native, エラー解決]
category: errlog
---

{% capture bubble_dev_taiyou_intro %}
外で Expo Go が使えなくて困っている人の役に立てば幸いです ☺️
{% endcapture %}
{% include speech-bubble.html side="right" name="たいよう" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

## はじめに

自宅の Wi-Fi だと問題なく `Expo Go` で接続できるのに、外出先の Wi-Fi ではうまくつながらないという問題に直面しました。

<!-- 画像貼る -->

## 対処方法

`npx expo start --tunnel` を使うと、インターネット経由のトンネルが張られ、同じネットワークにいない端末からでも Expo Dev Server にアクセスできるようになります。外部 Wi-Fi でポートが塞がれているときの切り札です。

1. `expo start --lan` や `expo start --localhost` で接続できないことを確認します。
2. `npx expo start --tunnel` を実行します。
3. ターミナルに表示された QR コードを Expo Go で読み取り、トンネル経由で接続できるか確かめます。

初回実行時に `@expo/ngrok` のインストールを求められますが、私の環境では自動インストールが失敗しました。

<img src="/assets/img/2025-11-04/3.png" alt="sdk" style=" height: auto; max-height: 600px" />
 
私と同じようになった場合は、次のコマンドで手動インストールしましょう。

```
sudo npm install -g @expo/ngrok@^4.1.0 --unsafe-perm
```

インストール後に再度 `npx expo start --tunnel` を実行すると、`Expo Go` からアプリにアクセスできました ✨
懸念点として、通常の Wi-Fi 接続よりも端末にダウンロードされるまでの時間が大幅に伸びます。ここは妥協ポイントとして受け入れることにしました 😭

<img src="/assets/img/2025-11-04/5.png" alt="sdk" style=" height: auto; max-height: 600px" />

## おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️

## 関連記事

{% assign related_urls = "/2026-01-20-google-play-uploadl-err/|/2025-11-15-expo-build-properties/|/2025-11-10-library-video-error/" | split: "|" %}
{% assign related_posts = site.posts | where_exp: "post", "related_urls contains post.url" %}
{% include related-posts.html posts=related_posts %}
