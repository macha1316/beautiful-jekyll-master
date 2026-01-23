---
layout: post
title: "Macでスクリーンショットの保存場所をコマンド一つで自由に変える"
subtitle: "考え中"
description: "考え中"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-23/samune.png
share-img: /assets/img/2025-10-23/samune.png
tags: [Mac, ユーティリティ]
category: errlog
# author: たいよう
---

{% capture bubble_dev_taiyou_intro %}
たくさんスクショをとる人にとっては嬉しい実装だと思う
{% endcapture %}
{% include speech-bubble.html side="right" name="たいよう" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

## はじめに

最近ブログの更新や、動画制作においてスクショを撮ることが増えてきました。
Mac の場合、デフォルトがデスクトップなので素材を撮り終わった頃にはデスクトップがぐちゃぐちゃになっていて、その時点で結構萎えます。なので、簡単に保存場所を変えることができたら楽だなーと思いシェルで作ってみました。
簡単なのでプログラミングがわからない方も是非手を動かしてみてください。

<!-- # 動画はこちら　 -->

<!-- こちらの動画も併せてご覧になると、迷わずに実装できると思います ↓ -->
<!-- 動画 -->

## 実装

### 実装例 1

`そこまで頻繁に保存場所を変えないという方は実装例 1` で OK です。  
こちらのコマンドを`terminal`を開いてそのままコピーアンドペーストしてみてください。  
デスクトップに`テスト`というフォルダが作成されていることがわかると思います。スクショをとるとこの`テスト`配下に保存されることも確認してください。

```sh
mkdir -p ~/Desktop/テスト && defaults write com.apple.screencapture location ~/Desktop/テスト && killall SystemUIServer
```

<br>
あなたの好きな場所に保存したい場合、上記コマンドの`~/Desktop/テスト`この箇所だけ変更したいパスに書き換えます。  
2 箇所あるのでどちらも書き換えてください。

### 実装例 2

`頻繁に保存箇所を変更したい方はこちらの実装例 2`の方が適していると思います。

### 1. シェルスクリプトダウンロード

下記のボタンからシェルスクリプトをダウンロードしてください。

<p class="download-button">
  <a class="btn btn-primary" href="{{ 'assets/file/2025-10-23/set_screenshot_path.sh' | relative_url }}" download>📁 set_screentshot_path.sh</a>
</p>
中身はこんな感じです。実装例 1 の処理に引数でパスを指定できるようにしただけです。

```sh
#!/bin/bash
## 使い方: set_screenshot_path.sh ~/Desktop/Screenshots

if [ -z "$1" ]; then
  echo "❌ 保存先パスを指定してください。"
  echo "例: $0 ~/Desktop/Screenshots"
  exit 1
fi

## ~ を展開して絶対パスに変換
TARGET_PATH=$(eval echo "$1")

mkdir -p "$TARGET_PATH"
defaults write com.apple.screencapture location "$TARGET_PATH"
killall SystemUIServer

echo "✅ スクリーンショット保存先を「$TARGET_PATH」に変更しました。"
```

### 2. 実行できるようにする

下記のコマンドをそのままコピーして`terminal`に貼り付けます。ダウンロードしたファイルに対する権限を聞かれたら`許可`を押します。

やっていることはこんな感じ

- ファイルを`home/bin`以下に移動
- ターミナルから呼び出せるようにパスを通す
- 実行権限を与える

```sh
mkdir -p ~/bin
mv ~/Downloads/set_screenshot_path.sh ~/bin/
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
chmod +x ~/bin/set_screenshot_path.sh
```

### 3. 実行する

準備はできたので実行するだけです。試しに、以下のコマンドを実行してからスクショをとります。  
問題なく`/Desktop/スクショ用`に保存されたら成功です。

```sh
set_screenshot_path.sh ~/Desktop/スクショ用
```

<br>
いつでも`terminal`から呼び出せるので使い倒してみてください！

## おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️
