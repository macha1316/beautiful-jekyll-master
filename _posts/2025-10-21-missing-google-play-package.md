---
layout: post
title: "Unable to properly validate credentials due to the missing Google Play packageの対処方法"
subtitle: "RevenueCat で Missing Google Play package エラーが出たときのメモ"
description: "RevenueCat で Missing Google Play package エラーを解消するためにバンドル ID を設定し直した手順を紹介します。"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-21_2/samune.png
share-img: /assets/img/2025-10-21_2/samune.png
tags: [Google Play Console, RevenueCat]
category: errlog
author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
RevenueCat と Google Play Console の連携で詰まったポイントを、備忘録も兼ねてまとめました。
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

# はじめに

初めて Android のアプリない課金を Revenue Cat で実装しようとした時にこのようなメッセージがでて JSON が認識されませんでした。`Unable to properly validate credentials due to the missing Google Play package`
調べてみても具体的な対処方法は出てこなかったため記事にしてみました。

<img src="/assets/img/2025-10-21_2/1.png" alt="sdk" style=" height: auto; max-height: 600px" />

# 解決方法

上記の`Google Play Package`にアプリの`bundle Id`を設定するだけでした。
JSON アップした時にここでエラーメッセージ出てくれよ。。。と思いつつ解決したのでよかったです。というか僕の不注意もありますね。

<img src="/assets/img/2025-10-21_2/2.png" alt="sdk" style=" height: auto; max-height: 600px" />

# おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️
