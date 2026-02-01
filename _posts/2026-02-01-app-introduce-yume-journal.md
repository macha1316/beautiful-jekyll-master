---
layout: post
title: "ゆめ日記"
subtitle: "ゆめ日記のアプリ紹介"
description: ""
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/dream.png
share-img: /assets/img/dream.png
tags: [ゆめ日記]
category: app-Intro
---

## アプリ概要

「見た夢、すぐ忘れていませんか？」
ゆめ日記は、眠っている間に見た夢を手軽に記録できるアプリです。
起きた直後に忘れてしまいがちな夢も、日記のように残すことであとから振り返ることができます。
書き残した夢はAIが大まかなカテゴリごとに整理してくれるので、
自分でも気づかなかった心の動きや発想に出会えるかもしれません。

## こんな人におすすめ

- 朝起きたときに夢をよく忘れてしまう人
- 夢をヒントに発想やひらめきを得たい人
- 自分の内面の変化やパターンを知りたい人
- ちょっと不思議で面白い記録を続けたい人

## 主な特徴

### 1. 夢をすぐ書けるシンプルな記録

起きた直後でも迷わず入力できる、日記のようなシンプルなUI。
思い出せる範囲で書くだけで、夢をしっかり残せます。

<img src="/assets/img/2026-02-01/1.png" alt="sdk" style=" height: auto; max-height: 300px" />

### 2. AIがカテゴリで整理

書いた夢をAIが大まかなカテゴリに分類してくれるので、
自分では気づかなかったテーマや傾向が見えてきます。

<img src="/assets/img/2026-02-01/2.png" alt="sdk" style=" height: auto; max-height: 300px" />

### 3. 記録を促す通知

通知をONにすれば、起きた時間に記録を知らせてくれます。
習慣化が苦手な人でも続けやすい設計です。

## ゆめ日記を使うと何が嬉しいのか

### 1. 夢の「忘却」を防げる

見た夢をそのまま消してしまわず、あとから読み返せる記録として残せます。

### 2. 自分の内面に気づける

AIのカテゴリ整理で、夢に表れる感情や思考のパターンが見えてくるかもしれません。

### 3. 毎日がちょっと不思議で面白くなる

日常の記録とはひと味違う、あなただけの夢のアーカイブができあがります。

## ダウンロードはこちらから

[ゆめ日記 iOS](https://apps.apple.com/app/id6752232946)  
[ゆめ日記 Android](https://play.google.com/store/apps/details?id=com.anonymous.yumejournal)

## 最後に

## 関連記事

{% assign related_urls = "/2026-01-26-app-introduce-skima/|/2026-01-23-revenuecat-err/|/2026-01-23-three-month-dev/" | split: "|" %}
{% assign related_posts = site.posts | where_exp: "post", "related_urls contains post.url" %}
{% include related-posts.html posts=related_posts %}
