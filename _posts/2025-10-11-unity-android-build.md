---
layout: post
title: "UnityでBuildしたAABファイルでGoogle Playでデバッグモードで著名されていますのエラーが出る時の対処法"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/icon.png
share-img: /assets/img/icon.png
tags: [Google Play, AAB, Unity]
author: taiyou
---

# はじめに

<br>

Unity でビルドした aab ファイルを google play console で提出しようとした時に
次のような警告がでてきました。

<br>

<img src="/assets/img/2025-10-11/1.png" alt="sdk" style=" height: auto;" />

<br>

この警告を解消する方法を丁寧に解説していきます!

<br>

# KeyStore からリリース用署名キーを作成する

<img src="/assets/img/2025-10-11/2.png" alt="sdk" style=" height: auto;" />

<br>

Unity で `Project Settings` -> `Player` -> `android` -> `Publishing Settings` へ移動

<br>

<img src="/assets/img/2025-10-11/4.png" alt="sdk" style=" height: auto;" />

<br>

`Key Store Manager` を開いて、`Create New` > `AnyWhere` でキーを保存場所を決めましょう(ローカルのどこでも構いませんが、忘れない場所に保存しておきましょう)

<br>

<img src="/assets/img/2025-10-11/3.png" alt="sdk" style=" height: auto;" />

<br>
```
keyStore のパスワード  
key の Alias  
key のパスワード  
```
それぞれ設定して`Add Key`します。(どんな値でも構いませんが忘れない値にしましょう)

<br>

<img src="/assets/img/2025-10-11/5.png" alt="sdk" style=" height: auto;" />

<br>

そうしたら再度ビルドして google play console にアップロードしましょう！  
問題なくアップされたら成功です ✨
