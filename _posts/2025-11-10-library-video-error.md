---
layout: post
title: "Error: The operation couldn’t be completed. (PHPhotosErrorDomain error 3164.) の対処"
subtitle: "iCloud 上の動画を取るときの 3164 対策"
description: "expo-image-pickerを使って、動画をライブラリから取得しようとした時に起きました。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/2025-11-10/samune.webp
share-img: /assets/img/2025-11-10/samune.webp
tags: [Expo, react-native, エラー解決]
category: errlog
---

{% capture bubble_dev_taiyou_intro %}
日本語での対処方法があらず苦戦しました 💦
{% endcapture %}
{% include speech-bubble.html side="right" name="たいよう" avatar="/assets/img/hiromasa.webp" message=bubble_dev_taiyou_intro %}

## 症状

`expo-image-picker` でライブラリから動画を取得しようとしたときに、下記のダイアログが表示され、動画が選択できませんでした。

```
Error: The operation couldn’t be completed. (PHPhotosErrorDomain error 3164.)
```

## 原因

動画が iCloud にのみ存在していて、まだ端末にダウンロードされていない状態でした。iOS は一度編集モードなどを挟んでユーザー操作を確認できるフローであれば、自動的にダウンロード処理を走らせてくれます。

## 対処方法

オプションに `allowsEditing = true` を加える。
これで、自動的に iCloud から動画がダウンロードされ、エラーが消えました。

[参考にしたページ](https://github.com/expo/expo/issues/39937)

```ts
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  quality: 1,
  allowsMultipleSelection: false,
  allowsEditing: true, // ←ここ
});
```

## おわり

いかがだったでしょうか。今回の記事が少しでも参考になったら幸いです。  
よければサイドバーからアプリをチェックしたり、メールで感想を送ってもらえたらうれしいです ☺️

