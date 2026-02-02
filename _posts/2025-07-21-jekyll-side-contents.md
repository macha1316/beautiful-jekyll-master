---
layout: post
title: "jekyll で作成したサイトにサイドバー広告つけてみた"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/GitHub.png
share-img: /assets/img/GitHub.png
tags: [Jekyll]
category: errlog
author: taiyou
---

## はじめに

このサイトは beautiful-jekyll-master のテンプレートから作成されています。
こちらですね
[beautifuljekyll](https://beautifuljekyll.com/)

しかし、テンプレートを見て貰えばわかるのですが、左右に広告やコンテンツ情報を載せるには自分で html と css をいじる必要があります。
とても簡単に実装できるので参考に慣ればと思います。

## 完成形

今見ているこのページの両サイドに広告が表示されていると思います。  
このような形で作成できます。

今回のコードの github リンク  
[html](https://github.com/macha1316/beautiful-jekyll-master/blob/main/_layouts/post.html)  
[css](https://github.com/macha1316/beautiful-jekyll-master/blob/main/assets/css/beautifuljekyll.css)

## コードをいじる

### \_layout/post.html

post.html の row クラスを以下のように書き換えます。
コメントアウトしている箇所に好きに広告やコンテンツを埋め込みましょう。

```html
<div class="main-row">
  <div class="left-container">
    <!-- サイドバー右 -->
  </div>
  <div class="center-container">
    <!-- メインコンテンツ -->
  </div>
  <div class="right-container">
    <!-- サイドバー左 -->
  </div>
</div>
```

<br>
<br>
### assets/css/beautifuljekyll.css
以下を付け加えます。

```css
.main-row {
  display: flex;
}
.left-container {
  width: 200px;
  min-width: 100px;
  padding-right: 2.25rem;
}

.right-container {
  width: 200px;
  min-width: 100px;
  padding-left: 2.25rem;
}

.center-container {
  flex: 1;
  min-width: 0;
}

/* 幅が狭いとき、サイドバー非表示 */
@media (max-width: 900px) {
  .right-container {
    display: none;
  }
}
@media (max-width: 1200px) {
  .left-container {
    display: none;
  }
}
```

## おわりに

その他の記事もぜひご覧ください！

個人制作アプリ  
[英語長文リーダー](https://apps.apple.com/app/eigo-read/id6748108116)  
[倉庫番](https://apps.apple.com/us/app/%E6%8E%98%E3%81%A3%E3%81%A6%E9%81%8B%E3%81%B6%E6%96%B0%E6%84%9F%E8%A6%9A%E5%80%89%E5%BA%AB%E7%95%AA%E3%82%B2%E3%83%BC%E3%83%A0/id1610742687)

**お問い合わせ:** hiromacha1116@icloud.com

