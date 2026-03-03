---
name: new-post
description: 新しいブログ記事を書くときに使う。トピックやタイトル案を渡すとドラフトを_posts/に作成する。
disable-model-invocation: true
argument-hint: "[記事のトピックや書きたいこと]"
---

今日の日付: !`date +%Y-%m-%d`

ユーザーが書きたい記事のトピック: $ARGUMENTS

以下の手順でJekyllブログ記事のドラフトを作成してください。

## Step 1: 既存記事の確認

`_posts/` ディレクトリの最近の記事を2〜3本読んで、文体・構成・frontmatterのパターンを把握してください。

## Step 2: 記事タイプの判断

トピックから記事タイプを判断する:

- **レビュー系**（商品・サービス）: category: 紹介 / ログ, tags: [紹介 / ログ, ガジェット] など
- **技術系**（開発・プログラミング）: category: 開発, tags: [Expo, React Native, アプリ開発] など
- **読書感想**: category: 紹介 / ログ, tags: [紹介 / ログ, 読書感想]
- **雑記・体験談**: category: 紹介 / ログ, tags: [紹介 / ログ, 一人暮らし] など

## Step 3: ファイル名の決定

- 形式: `YYYY-MM-DD-slug.md`（slugは英数字とハイフンのみ）
- 例: `2026-02-28-standing-desk-review.md`

## Step 4: 画像の確認と読み込み

`assets/img/YYYY-MM-DD/` ディレクトリが存在するか確認し、`.webp` ファイルの一覧を取得する。

ファイルが存在する場合:

- 各画像ファイルをRead toolで読み込み、**何が写っているか**を把握する
- 記事の内容と照らし合わせて、どの見出しの近くに挿入するのが自然かを判断しておく

画像の挿入形式:

```html
<img
  src="/assets/img/YYYY-MM-DD/1.webp"
  alt="説明"
  style="height: auto; max-height: 520px"
/>
```

`cover-img` には最も記事を代表する画像（外観・全体感が分かるもの）を使う。
ファイルが存在しない場合は `cover-img: /assets/img/YYYY-MM-DD/samune.webp` とプレースホルダーにする。

## Step 5: ドラフト作成

frontmatterを以下の形式で書く:

```
---
layout: post
title: "【フック】タイトル"
subtitle: "サブタイトル（記事の補足）"
description: "SEO用の説明文（100〜120文字程度）"
cover-img: /assets/img/YYYY-MM-DD/N.webp
tags: [タグ1, タグ2]
category: カテゴリ
categories: [カテゴリ]
author: taiyou
---
```

本文の構成ルール（過去記事のトーンを参考に）:

- **結論から先に書く**（「結論から言うと〜」という書き出しが多い）
- 一人暮らし・個人開発者目線の等身大な体験談ベース
- 「よかった点」「微妙な点」を正直に書く
- 見出し（##）と箇条書きを使って読みやすくする
- レビュー系なら最後に総評として星評価（★〜★★★★★）をつける
- 技術系なら参考URLセクションをつける
- アフィリエイトリンクは `※この記事にはアフィリエイトリンクを含みます。` と書くだけでOK（リンク自体はプレースホルダーでよい）
- **画像はStep 4で把握した内容をもとに、文脈に合った見出しの直後に挿入する**

## Step 6: ファイルを書き出す

`_posts/YYYY-MM-DD-slug.md` にドラフトを書き出してください。

書き出したら、作成したファイルパスと、記事の概要（タイトル・構成の見出し一覧）をユーザーに伝えてください。
