---
layout: post
title: ランダムに単語を返してくれる random-word-api 使ってみた
subtitle: "random-word-apiの基本的な使い方をcurlで確認"
description: "ランダムな英単語を返すrandom-word-apiの使い方を、curlコマンドとレスポンス例を使ってわかりやすく紹介します。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/2025-06-17/random-word-api_bg.webp
share-img: /assets/img/2025-06-17/random-word-api_bg.webp
tags: [API]
category: errlog
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
<img src="/assets/img/2025-06-17/random-word-api.webp" alt="scret" style="max-width: 600px;" />

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
    },
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

その他の記事もぜひご覧ください！

**お問い合わせ:** hiromacha1116@icloud.com
