---
layout: post
title: Expo SDK を アップデートした時にライブラリの互換性を合わせる
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/2025-06-03/expo_logo.png
thumbnail-img: /assets/img/2025-06-03/expo_logo.png
share-img: /assets/img/2025-06-03/expo_logo.png
tags: [tech, expo]
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
