---
layout: post
title: "Jekyll sitemapでlocが相対パスになる原因と対処法"
subtitle: "url設定で絶対URLに直す手順を検証ベースで解説"
description: "Jekyllサイトでsitemap.xmlを設定したとき、locが相対パスで出力される問題に遭遇。原因と修正手順を体験ベースでまとめました。"
tags: [Jekyll, sitemap, ブログ運営]
category: 開発
categories: [開発]
author: たいよう
cover-img: /assets/img/jekyll.webp
---

## はじめに

ブログのSEOまわりを整えたくて、今さらですが `sitemap.xml` をちゃんと設定しました。  
プラグイン自体はすぐ入ったのに、生成結果を見たら `loc` が相対パスになっていて、普通にハマりました。

結果的にはすぐ直せたので、同じところで詰まる人向けにメモとして残します。

## きっかけ

Search Consoleを見直していて、  
「sitemap送信はしているけど、内容ちゃんと見てなかったな」と気づいたのがきっかけです。

実際に `sitemap.xml` を開いたら、こんな感じでした。

- `/2025-06-02-github-jekyll/`
- `/2025-06-03-expo-update/`

これ、URLが全部相対パスです。  
「あれ、これで正しいのか？」となって確認を始めました。

<img src="/assets/img/2026-02-16/5.webp" alt="sitemap.xmlのlocが相対パスで出力されている画面" style="height: auto; max-height: 520px" />

## 詰まったポイント

`jekyll-sitemap` は入っているのに、絶対URLにならない。  
原因はシンプルで、`_config.yml` の `url` が設定されていなかったことでした。

`_config.yml` に次を追加したら解決しました。

```yml
url: "https://taiyou-tech-blog.com"
baseurl: ""
```

<img src="/assets/img/2026-02-16/2.webp" alt="_config.ymlにurl設定を追加した画面" style="height: auto; max-height: 520px" />

修正後は `loc` が `https://taiyou-tech-blog.com/...` 形式になって、想定どおりに出力されました。

<img src="/assets/img/2026-02-16/6.webp" alt="locが絶対URLで正しく出力されたsitemap.xmlの画面" style="height: auto; max-height: 520px" />

## ローカル確認で404になった件

ここで別の問題が出ました。  
`_config.yml` に本番URLを入れると、`bundle exec jekyll serve` でも `absolute_url` が本番ドメインを使うので、ローカル確認時にリンク遷移で404になりました。

これを避けるために、開発用の設定ファイルを分けました。

`_config_dev.yml`

```yml
url: "http://localhost:4000"
baseurl: ""
```

ローカル起動は次のようにしています。

```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

この形にすると、

- 本番ビルド（`_config.yml` のみ）は `https://taiyou-tech-blog.com`
- ローカル確認（`_config_dev.yml` 上書き）は `http://localhost:4000`

で切り分けできるので、開発中の404を防げました。

## やっておいてよかった確認

今回みたいな設定系は、直したあとに「本当に変わったか」を見るのが大事でした。

- `bundle exec jekyll build` で再生成
- `_site/sitemap.xml` の先頭数件を目視確認
- 開発サーバーを再起動して再確認

この3つだけでも、かなり安心できます。

## 関連記事

Jekyll運用の話はこのあたりにも書いています。

- [`GitHub Pages × Jekyllでブログを作るときにつまづいたことまとめ`](/2025-06-02-github-jekyll)
- [`GitHub Pages × JekyllにGoogle Analyticsをつける`](/2025-06-02-jekyll-analytics)

## まとめ

sitemap設定そのものは簡単でしたが、  
`url` 未設定だと `loc` が期待とズレるので、ここは最初に入れておくのが安全です。

地味な修正だけど、こういうところを1つずつ潰していくと、  
ブログ運用の不安がかなり減るなと実感しました。
