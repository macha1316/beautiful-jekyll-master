---
layout: post
title: "[FirebaseError: Firebase Storage: Object '' does not exist. (storage/object-not-found)]の時に確認すべきこと"
subtitle: "Firebase Storageのobject-not-foundエラー原因と解決メモ"
description: "Firebase Storageでobject-not-foundエラーが発生したときに確認したポイントと、実際に解決できた原因を共有します。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/firestorage-logo.webp
share-img: /assets/img/firestorage-logo.webp
tags: [Firebase, Expo, エラー解決]
category: errlog
author: taiyou
---

## はじめに

fireStorage から画像を取得しようとしても  
`[FirebaseError: Firebase Storage: Object '' does not exist. (storage/object-not-found)]`  
がでてしまい取得できないことがありました。  
パスは絶対あっているし、おかしいなあと思っていたのですが、意外な問題でした。

## 原因

バケットをすべてのロケーションから選択していた。

## 解決策

firebase を無料枠で使用している場合、料金不要のロケーションを選択する必要があるようです。
当たり前かもしれませんが、エラーメッセージ的にバケットまでは参照できてそうだから、気がつきませんでした。。。

<img src="/assets/img/2025-07-19/firestorage.webp" alt="scret" style="max-width: 600px;" />

これで問題なく参照できます。

## おわりに

その他の記事もぜひご覧ください！

**お問い合わせ:** hiromacha1116@icloud.com
