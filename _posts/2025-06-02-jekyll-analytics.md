---
layout: post
title: GitHub Pages × JekyllにGoogle Analyticsをつける
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/GitHub.png
thumbnail-img: /assets/img/GitHub.png
share-img: /assets/img/GitHub.png
tags: [tech, Jekyll]
author: taiyou
---

## はじめに

Github Pages + Jekyll で自分の blog サイトを作ってみたので、  
続いてアナリティクスの設定をしたので備忘録として残してみました。  
ちょーーー簡単です。

---

## Google Analytics の設定

以下サイトにログイン
[Google Analitics](https://developers.google.com/analytics?hl=ja)
アカウントとプロパティを設定しましょう。

アカウント| 好きなアカウント名を設定
プロパティ| 自分は web サイトの名前にしました

<br>

## Gtag を設定する

以下のような形で gtag を設定するように出てくると思います。
![gtag](/assets/img/2025-06-02/gtag.png)

<br>

Jekyll では`_config.yml`に設定するだけで勝手に内部で設定してくれます。  
`_config.yml`内で gtag で検索します。

![gtag2](/assets//img//2025-06-02/gtag2.png)

```
#gtag: "G-XXXXXXXXXX"
```

ここに自身の Gtag を設定してください。

<br>
あとは commit -> push で再デプロイされるのを待ちます!

![gtag3](/assets//img//2025-06-02/gtag3.png)
ちゃんと情報が取得されました 👏

## おわりに

自分はアナリティクスをとっても簡単に設定できて感動しました ☺️  
無料でここまでできるのに感謝です!

Youtube、X なども更新しているのでよかったらみてください!!  
ゲーム開発もしているのでそちらの記事もぜひ ☺️

YouTube チャンネル
[たいようのゲーム開発チャンネル](https://www.youtube.com/@taiyou-game-w5t)  
問い合わせはこちらまで
taiyou.game.channel@gmail.com
