---
layout: post
title: "UnityでBuildしたAABファイルでGoogle Playでデバッグモードで著名されていますのエラーが出る時の対処法"
subtitle: "Google Playのデバッグ署名エラーをUnity側で解消する手順"
description: "Unityで生成したAAB提出時にGoogle Play Consoleで発生するデバッグ署名エラーについて、原因と対処手順を解説します。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/unity.webp
share-img: /assets/img/unity.webp
tags: [Google Play, Unity, エラー解決]
category: errlog
author: taiyou
---

{% capture bubble_dev %}
Android 向けリリースはやることが多い。。。
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/hiromasa.webp" message=bubble_dev %}

## はじめに

Unity でビルドした `aab ファイル`を Google Play Console で提出しようとした時に
次のような警告がでてきました。

<img src="/assets/img/2025-10-11/1.webp" alt="sdk" style=" height: auto;" />

この警告を解消する方法を丁寧に解説していきます!

## KeyStore からリリース用署名キーを作成する

<img src="/assets/img/2025-10-11/2.webp" alt="sdk" style=" height: auto;" />

Unity で `Project Settings` -> `Player` -> `android` -> `Publishing Settings` へ移動

<img src="/assets/img/2025-10-11/4.webp" alt="sdk" style=" height: auto;" />

`Key Store Manager` を開いて、`Create New` > `AnyWhere` でキーを保存場所を決めましょう(ローカルのどこでも構いませんが、忘れない場所に保存しておきましょう)

<img src="/assets/img/2025-10-11/3.webp" alt="sdk" style=" height: auto;" />

```
keyStore のパスワード
key の Alias
key のパスワード
```

それぞれ設定して`Add Key`します。(どんな値でも構いませんが忘れない値にしましょう)

<img src="/assets/img/2025-10-11/5.webp" alt="sdk" style=" height: auto;" />

そうしたら再度ビルドして google play console にアップロードしましょう！  
問題なくアップされたら成功です ✨
