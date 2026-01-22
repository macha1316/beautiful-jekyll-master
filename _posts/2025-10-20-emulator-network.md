---
layout: post
title: "Emulatorがインターネットに接続されない時の対処法"
subtitle: "DNS設定でネット接続を取り戻す手順"
description: "Android Emulatorの通信ができないときにDNSを指定して復旧する方法を紹介します"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-20/samune.png
share-img: /assets/img/2025-10-20/samune.png
tags: [Expo, Emulator, Android, エラー解決]
author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
Android Emulator が突然ネットに繋がらなくなり、開発が止まってしまったので対処手順をまとめました。
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

# はじめに

Android Emulator でブラウザも API 通信も通らなくなり、アプリの動作確認ができなくなるトラブルに遭遇しました。再インストールなど大掛かりな対応をする前に、DNS を指定して立ち上げ直すだけで解決できたので、忘備録として残しておきます。

<img src="/assets/img/2025-10-20/1.png" alt="sdk" style=" height: auto; max-height: 600px" />

# 解決方法

## Emulator で使う端末名を調べる

`Android Studio`で使用する端末名を調べます。
私は`Medium_Phone_API_36.0`です。

<img src="/assets/img/2025-10-20/5.png" alt="sdk" style=" height: auto; max-height: 600px" />

## Terminal から Emulator を立ち上げる

以下のようにコマンドをターミナルで打ちます。  
⚠️ `Medium_Phone_API_36.0`の部分はあなたの端末名に変更してください。

```
cd Library/Android/sdk/emulator
./emulator -avd Medium_Phone_API_36.0 -dns-server 8.8.8.8
```

1 行目 emulator ディレクトリへ移動  
2 行目 DNS サーバーを 8.8.8.8 に指定して対象の 端末 を起動

<img src="/assets/img/2025-10-20/6.png" alt="sdk" style=" height: auto; max-height: 600px" />

すると、`Emulator`でインターネット接続されていることが確認できます ✨

<img src="/assets/img/2025-10-20/2.png" alt="sdk" style=" height: auto; max-height: 600px" />

# おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️
