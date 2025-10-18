---
layout: post
title: "[革命] Expoアプリで16KB対応に引っかかったライブラリを調べる方法"
subtitle: "Google Play Consoleで表示される16KB警告の原因調査と回避手順"
description: "ExpoでビルドしたAndroidアプリをGoogle Play Consoleにアップロードした際に表示される「16KB対応」警告について、原因となるライブラリの見つけ方の手順をまとめました。"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-10-15/samune.png
share-img: /assets/img/2025-10-15/samune.png
tags: [Expo, エラー解決]
author: taiyou
---

{% capture bubble_dev %}
先日初めて android 向けにアプリをリリースしました
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/bear.jpeg" message=bubble_dev %}

{% capture bubble_dev %}
いいね！
{% endcapture %}
{% include speech-bubble.html side="left" name="助手" avatar="/assets/img/josyu.png" message=bubble_dev %}

{% capture bubble_dev %}
けど、アプリが 16KB に対応していないって怒られてしまって。。。
{% endcapture %}
{% include speech-bubble.html side="right" name="taiyou" avatar="/assets/img/bear.jpeg" message=bubble_dev %}

{% capture bubble_dev %}
なにそれ。。とりあえず解説みていこう
{% endcapture %}
{% include speech-bubble.html side="left" name="助手" avatar="/assets/img/josyu.png" message=bubble_dev %}

# はじめに

Expo で android 向けにアップロードし終えひと段落かと思いきや、このような警告が出てきたことはないでしょうか。
`アプリは16KBメモリのページサイズをサポートしている必要があります`

<img src="/assets/img/2025-10-15/1.png" alt="sdk" style=" height: auto;" />

よくわからず放置していたのですが、いつかは解消しないといけないことなので重い腰を上げて問題解決してみました。

# ライブラリを調べる

## Google Play Console での作業

最初に何の`.so`かを突き止めます。
Google Play Console で問題が起きているプロジェクトに入り、以下の画像の`最新のリリースとApp Bundle`へ進みます。

<img src="/assets/img/2025-10-15/1.png" alt="sdk" style=" height: auto;" />

その App Bundle のページを下の方にスクロールすると、`16KB非対応`の項目が出てくると思います。
その項目をどこかにメモしておきましょう。  
今回の場合は`base/lib/arm64-v8a/librenderscript-toolkit.so`と`base/lib/x86_64/librenderscript-toolkit.so`です。

<img src="/assets/img/2025-10-15/5.png" alt="sdk" style=" height: auto;" />

## Expo プロジェクト内での作業

まず Expo プロジェクトのルートにいきます。
すでに android 向けにビルドしているはずなので

```
cd android
```

で android ディレクトリに移り

以下の画像のように打ちます。

```
./gradlew app:dependencies > deps.txt
```

<img src="/assets/img/2025-10-15/6.png" alt="sdk" style=" height: auto;" />

おそらく少し時間がかかると思いますが、android アップで使われている依存関係の一覧を `deps.txt` に列挙してくれています。

`gradlew`コマンドが完了したら以下のように打ちます。  
⚠️`renderscript`部分は先ほど Google Play Console であった.so の内容に合わせる必要があります。私の場合は、`../librenderscript-toolkit/.so`という形だったので、`renderscript`で検索をかけました。

```
grep -i renderscript deps.txt
```

<img src="/assets/img/2025-10-15/2.png" alt="sdk" style=" height: auto;" />

すると、今回は`vexo`というライブラリが問題の根源であるということがわかりました。
`package.json`を見てみると確かにありますね。

<img src="/assets/img/2025-10-15/3.png" alt="sdk" style=" height: auto;" />

一応公式ドキュメントを確認してみると、まさかのマイナーアップデート 1 つずれ 😱  
`expo-image`とかが原因だと思っていたので、1 から探していたら非常に時間がかかっちゃっていたと思います。。。

<img src="/assets/img/2025-10-15/4.png" alt="sdk" style=" height: auto;" />

# おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
ぜひサイドバーからアプリの閲覧、メールなどもお待ちしています ☺️
