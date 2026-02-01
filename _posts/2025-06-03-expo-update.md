---
layout: post
title: Expo SDK を アップデートした時にライブラリの互換性を合わせる
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-06-03/expo_logo.png
share-img: /assets/img/2025-06-03/expo_logo.png
tags: [Expo]
category: errlog
author: taiyou
---

## はじめに

Expo SDK を 52 から 53 にアップデートしたらライブラリの互換性がなくなり、ちょっと面倒だったので記事にしてみました。

---

## エラー内容

<img src="/assets//img//2025-06-03/expo_sdk_err.png" alt="sdk" style="max-width: 300px;" />

## 解決策

互換性のチェックコマンド

```bash
npx expo doctor
```

使っている SDK のバージョンに合わせてライブラリを再インストールしてくれます。

```bash
npx expo upgrade
```

## おわりに

その他の記事もぜひご覧ください！

**お問い合わせ:** hiromacha1116@icloud.com

## 関連記事

{% assign related_urls = "/2026-01-20-google-play-uploadl-err/|/2025-11-15-expo-build-properties/|/2025-11-10-library-video-error/" | split: "|" %}
{% assign related_posts = site.posts | where_exp: "post", "related_urls contains post.url" %}
{% include related-posts.html posts=related_posts %}
