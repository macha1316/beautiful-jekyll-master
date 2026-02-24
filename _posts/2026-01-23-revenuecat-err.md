---
layout: post
title: "Could not validate subscriptions API permissionsに対する対処"
subtitle: "Play Console未公開が原因だった話"
description: "RevenueCatがサブスク情報を取得できないエラーは、アプリ未公開が原因。クローズドでも公開が必要。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/2025-11-15/samune.webp
share-img: /assets/img/2025-11-15/samune.webp
tags: [エラー解決, RevenueCat]
category: 開発
---

## はじめに

こんにちは、個人開発者のたいようです。  
今回はRecenueCatを使ってAndroidの課金システムを実装していた時に起きた`Could not validate subscriptions API permissions`という問題に対する対処方法について書いていきます。  
非常にシンプルな原因だったのですが、他にも同様のエラーで悩んでいる人のために残しておこうと思います。

<img src="/assets/img/2026-01-23/1.webp" alt="sdk" style=" height: auto; max-height: 600px" />

## 結論

Google Play Consoleでアプリのリリースをすればエラーは解消されます。  
というのも、RevenueCat はアプリを一度も Play ストアに公開していない状態だと、サブスク情報を取得できません。なので、クローズドトラックでいいので公開しましょう。

<img src="/assets/img/2026-01-23/2.webp" alt="sdk" style=" height: auto; max-height: 600px" />

## おわりに

[参考にしたコミュニティーチャット](https://community.revenuecat.com/general-questions-7/could-not-validate-subscription-api-permission-2983)

ご質問などがあればコメントやメールで教えていただけるとうれしいです。お時間があるときに他の記事や私のアプリも覗いていただけるとうれしいです。

