---
layout: post
title: "No Android connected device found, and no emulators could be started automatically.のエラー対処方法"
subtitle: "Expoでandroid端末向けにテストしたい時"
description: ""
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-17/no_device2.png
share-img: /assets/img/2025-10-17/no_device2.png
tags: [Expo, エラー解決]
category: errlog
author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
Mac で android 端末でテストしたいがエラーで落ちてしまう 😭
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

{% capture bubble_dev_josyu_intro %}
Emulator っていうのを先に立ち上げるんだよね!
{% endcapture %}
{% include speech-bubble.html side="left" name="助手" avatar="/assets/img/josyu.png" message=bubble_dev_josyu_intro %}

## はじめに

Expo なら Mac で簡単に android 向けのテストが可能です。しかし、少しだけ環境を整えるのに苦労したので備忘録も込めて記事にしました。

<img src="/assets/img/2025-10-17/1.png" alt="sdk" style=" height: auto;" />

## Emulator を立ち上げる

このエラーが出る時はバックグラウンドで Emulator が立ち上がっていないのが原因です。
まずは、Android Studio を立ち上げます。  
もしまだインストールしていない場合は、こちらからインストールしましょう。
[Android Studio インストールページ](https://developer.android.com/studio?hl=ja)

### Android Studio アプリ起動

こちらの`More Actions`から`Virtual Device Manager`を選択

<img src="/assets/img/2025-10-17/2.png" alt="sdk" style=" height: auto;" />

Device を選択して`Play▶️`を押します。

<img src="/assets/img/2025-10-17/3.png" alt="sdk" style=" height: auto;" />

再度プロジェクトに戻り`npm run android`すると、先ほど立ち上げた Emulator で立ち上がります。

<img src="/assets/img/2025-10-17/5.png" alt="sdk" style=" height: auto;" />

## おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
ぜひサイドバーからアプリの閲覧、メールなどもお待ちしています ☺️

## 関連記事

{% assign related_urls = "/2026-01-20-google-play-uploadl-err/|/2025-11-15-expo-build-properties/|/2025-11-10-library-video-error/" | split: "|" %}
{% assign related_posts = site.posts | where_exp: "post", "related_urls contains post.url" %}
{% include related-posts.html posts=related_posts %}
