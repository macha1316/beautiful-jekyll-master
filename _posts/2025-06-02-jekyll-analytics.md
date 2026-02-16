---
layout: post
title: "GitHub Pages × JekyllにGoogle Analyticsを設定する手順"
subtitle: "計測IDを設定して公開ブログのアクセス計測を始める"
description: "GitHub Pages × JekyllブログにGoogle Analytics（GA4）を設定する手順をまとめました。計測IDの発行から _config.yml の反映、計測確認までを短く解説します。"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/GitHub.png
share-img: /assets/img/GitHub.png
tags: [Jekyll, GitHub Pages, Google Analytics]
category: errlog
author: taiyou
---

## はじめに

GitHub Pages + Jekyll でブログを作ったあと、  
アクセス計測のために Google Analytics（GA4）を設定しました。

この記事では、次の流れだけに絞って手順をまとめます。

1. Google Analytics で計測ID（`G-XXXXXXXXXX`）を発行
2. Jekyll の `_config.yml` に `gtag` を設定
3. デプロイ後に計測できているか確認

---

## 1. Google Analyticsでプロパティを作成する

まずは Google Analytics にログインして、  
対象サイトのプロパティを作成します。

- [Google Analytics](https://analytics.google.com/)
- アカウント名: 任意
- プロパティ名: ブログ名など分かりやすい名前

<br>

## 2. Jekyllの`_config.yml`にgtagを設定する

プロパティ作成後、計測ID（`G-XXXXXXXXXX`）が発行されます。  
このIDを Jekyll 側に設定します。

![Google Analyticsで計測IDを確認する画面](/assets/img/2025-06-02/gtag.png)

<br>

Jekyll では `_config.yml` に設定するだけで gtag を反映できます。  
`_config.yml` 内で `gtag` を検索します。

![Jekyllの_config.ymlにgtagを設定する例](/assets/img/2025-06-02/gtag2.png)

```yaml
#gtag: "G-XXXXXXXXXX"
```

コメントアウトを外して、自分の計測IDを設定してください。

<br>

## 3. push後に計測できるか確認する

`commit -> push` で GitHub Pages が再デプロイされたら、  
Google Analytics のリアルタイム画面でアクセスが入るか確認します。

![Google Analyticsのリアルタイム計測確認](/assets/img/2025-06-02/gtag3.png)

計測できていれば設定完了です。

## おすすめ記事

- [GitHub Pages × Jekyllでブログを立ち上げる手順]({% post_url 2025-06-02-github-jekyll %})
- [Jekyllサイトにsitemap.xmlを設定したときのメモ]({% post_url 2026-02-15-set-sitemap-jekyll-trouble %})

## おわりに

GitHub Pages + Jekyll で運用しているなら、  
まずは GA4 の計測導入だけでも入れておくと改善の判断がしやすくなります。  
その他の記事もぜひご覧ください。

**お問い合わせ:** hiromacha1116@icloud.com
