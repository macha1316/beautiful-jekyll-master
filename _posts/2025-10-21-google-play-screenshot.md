---
layout: post
title: "Google Play Consoleで新しいバージョンでスクリーンショットを変える方法"
subtitle: "どこでスクショを変えられるか一見わかりづらいため記事にしてみました"
description: "Android Emulatorの通信ができないときにDNSを指定して復旧する方法を紹介します"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-21/samune.png
share-img: /assets/img/2025-10-21/samune.png
tags: [Google Play Console]
category: errlog
author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
どこでスクショを変えられるのかわからず結構な時間が溶けてしまった。。。
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

## 解決方法

以下のように`ユーザーを増やす`のタブ -> `ストアの掲載情報`から修正できます。

<img src="/assets/img/2025-10-21/1.png" alt="sdk" style=" height: auto; max-height: 600px" />

## おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️

## 関連記事

{% assign related_urls = "/2025-10-21-missing-google-play-package/" | split: "|" %}
{% assign related_posts = site.posts | where_exp: "post", "related_urls contains post.url" %}
{% include related-posts.html posts=related_posts %}
