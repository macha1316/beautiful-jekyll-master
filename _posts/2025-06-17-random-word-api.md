---
layout: post
title: ランダムに単語を返してくれる random-word-api 使ってみた
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/2025-06-17/random-word-api_bg.png
thumbnail-img: /assets/img/2025-06-17/random-word-api_bg.png
share-img: /assets/img/2025-06-17/random-word-api_bg.png
tags: [curl, api, typescript, random-word-api]
author: taiyou
---

## はじめに

API を投げるとランダムな英単語を返してくれる random-word-api の使い方をまとめてみました。

## ひとまず叩いてみる

下記コマンドを terminal で実行してみましょう。

```bash
curl "https://random-word-api.herokuapp.com/word?number=5"
```

おー！ 下記のような結果が返ってきました
`["sleepovers","tedders","recalculating","kenning","timesaver"]`
<img src="/assets//img//2025-06-17/random-word-api.png" alt="scret" style="max-width: 600px;" />

## コマンド解説

複数のパラメータを指定することができます。  
`?number` ... 単語数指定  
`?lang` ... 言語指定(ドイツ語, スペイン語, 中国語, ポルトガル語, フランス語, イタリア語 から指定)  
`?length` ... 返す単語の文字数を指定

#### 組み合わせ例

スペイン語の文字数が 7 の単語を 10 個返す

```bash
curl https://random-word-api.herokuapp.com/word?length=7&lang=es&number=10
```

<br>
## 実際にコードに組み込む

今回は TS でテストしてみます。
REST API なので TS 以外でも同様に使えると思います。

```ts
export const getRandomWord = async () => {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=5`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const words = await res.json();
  console.log("Random Words:", words);
  return words;
};
```

## 公式ドキュメント

詳しく公式ドキュメントを参照してください  
独自の言語を追加することもできるみたいです!  
<a href="https://random-word-api.herokuapp.com" target="_blank" rel="noopener noreferrer">
random-word-api
</a>

## おわりに

1 つ使いにくい点を挙げるとしたら、難しい単語が結構な頻度ででてくることですかね。。  
主要単語のみフィルタのような機能があれば。。。  
無料で使わせていただいている時点でありがたいですけどね ☺️

Youtube、X なども更新しているのでよかったらみてください!!  
ゲーム開発もしているのでそちらの記事もぜひ ☺️

YouTube チャンネル
[たいようのゲーム開発チャンネル](https://www.youtube.com/@taiyou-game-w5t)
問い合わせはこちらまで  
taiyou.game.channel@gmail.com
