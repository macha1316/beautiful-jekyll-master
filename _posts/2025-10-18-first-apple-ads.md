---
layout: post
title: "初めてApple Adsに自分のアプリを出してみた"
subtitle: "考え中"
description: ""
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-18/samune.png
share-img: /assets/img/2025-10-18/samune.png
tags: [Apple Ads]
author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
初めて Apple Ads に自分のアプリの広告を出してみたよ！
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/bear.jpeg" message=bubble_dev_taiyou_intro %}

{% capture bubble_dev_josyu_intro %}
効果あるのかな 🤔
{% endcapture %}
{% include speech-bubble.html side="left" name="助手" avatar="/assets/img/josyu.png" message=bubble_dev_josyu_intro %}

{% capture bubble_dev_taiyou_intro %}
実際の数値を見てみよう！
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/bear.jpeg" message=bubble_dev_taiyou_intro %}

# はじめに

タイトルの通り、自分のアプリを Apple Ads に出稿してみました。  
この記事では広告の出し方そのものではなく、どの国でどの程度の結果が得られたのかに焦点を当てて振り返ります。これからアプリ広告を検討している方の目安になれば幸いです。

# 広告に出したアプリ

広告を出したのは「アイデアメモ -AI」（英語名: Idea Memo Spark）というアプリです。

<img src="/assets/img/2025-10-18/idea-note-1.png" alt="sdk" style=" height: auto;" />
[アイデアメモ-AI](https://apps.apple.com/jp/app/%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2%E3%83%A1%E3%83%A2-ai/id6752848069)

# どのようなキャンペーンで出したか

## そもそもキャンペーンとは

App Store 内で自分のアプリを宣伝する広告単位のことで、例えば 3 つのグループに分けてそれぞれ別の地域別に単価を決めて広告を出したい時にキャンペーンを 3 つに分けて出します。

## 実際の画面で見てみる

今回のケースでは 3 つのキャンペーン（3 つの地域）に分けています。

キャンペーン名| 国| 今回出した 1DL にかける単価
お試し新興国| インド、マレーシア|50 円
お試し\_中堅| 日本|80 円
お試し| アメリカ、オーストラリア|80 円

このようにすることで、別々の単価で広告が出せます。

<img src="/assets/img/2025-10-18/1.png" alt="sdk" style=" height: auto;" />

# 数値で見る

今回は検索タブに広告を出してみました。  
1 日あたりの広告費は各キャンペーンで`1000円`、期間は`10日間`に設定しています。  
検索タブとは、`App Store`の検索ページに移動したときに最初に候補として表示されるアプリ群のことで、そこに差し込まれる広告を指します。

## インプレッション

`インプレッション` ... ユーザーにアプリが表示された回数のこと。  
今回は`新興国キャンペーン`が`93680回`と圧倒的に多い結果になりました。1DL あたりの単価が安いにもかかわらずここまで表示されました。逆に他のキャンペーンでは、もっと単価を上げないと表示すらされないということです。

<img src="/assets/img/2025-10-18/2.png" alt="sdk" style=" height: auto;" />

## インストール数

インストール数 ... ユーザーが実際にインストールした回数。  
新興国では`93680回`表示されたにもかかわらず、インストールは`20回`程度にとどまっています。これは検索タブ広告がアプリの周知を目的として使われるためで、インプレッションに対してインストール数が大幅に下がる傾向があります。

<img src="/assets/img/2025-10-18/3.png" alt="sdk" style=" height: auto;" />

## コンバージョン率

`コンバージョン率` ... アプリをクリックしたユーザーがインストールした割合。  
結果は`8.74%`でした。平均は 10% 前後と言われているので少し低めですが、極端に悪いわけではなくてひと安心です。  
ここの数値が極端に低い場合は、アプリのスクリーンショットなどを見直す必要があると思います。

## 総評

今回は初めて`Apple Ads`に広告を出してみました。  
実際には新興国キャンペーンだけが動いていたので、単価設定そのものを見直す必要がありそうです。  
検索タブは認知獲得向けの枠なので、1DL あたりの単価が高騰しやすい点も学びでした。次回は`検索結果タブ`で試し、違いを比較してみたいと思います。

# おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️
