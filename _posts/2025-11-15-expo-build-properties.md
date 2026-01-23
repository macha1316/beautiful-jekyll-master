---
layout: post
title: "Expo＋Firebaseで出る iOS ビルドエラーをexpo-build-propertiesで解決"
subtitle: "Swift podsの静的リンクとRNヘッダのモジュール化問題を設定で回避"
description: "deploymentTargetやuseFrameworksなどのexpo-build-properties設定を使って、Firebase関連のiOSビルドエラー（静的ライブラリ／non-modularヘッダ）を安定的に対処する手順。"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/2025-11-15/samune.png
share-img: /assets/img/2025-11-15/samune.png
tags: [Expo, react-native, エラー解決]
category: errlog
---

{% capture bubble_dev_taiyou_intro %}
絶対にまた同じ問題に直面する気がするので備忘録です〜
{% endcapture %}
{% include speech-bubble.html side="right" name="たいよう" avatar="/assets/img/hiromasa.png" message=bubble_dev_taiyou_intro %}

## はじめに

Firebase の機能を React Native（Expo）アプリに導入して iOS ビルドを実行したところ、ネイティブ依存の組み合わせが原因で `The following Swift pods cannot yet be integrated as static libraries` や `include of non-modular header inside framework module 'RNFBApp...` といったエラーに遭遇しました。

この記事では `expo-build-properties` プラグインによる設定でどのように対処したかを、原因とともに順を追って説明します。同じような問題に直面している方の参考になればと思います。

## The following Swift pods cannot yet be integrated as static libraries に対する対応

このエラーは、Swift ポッドが静的ライブラリ（static）として統合されたときに、モジュールの互換性やアーキテクチャ要件を満たしていないために発生します。Firebase を含むいくつかのライブラリは静的リンクとの相性が悪く、Expo が生成するデフォルト設定となじまないケースがあります。

`expo-build-properties` プラグインを使うことで、Xcode プロジェクトの iOS ビルド設定を Expo の設定ファイルから安全に上書きできます。以下のように `useModularHeaders`, `useFrameworks`, `deploymentTarget` を指定することで、React Native 周辺の依存関係を静的フレームワークとして正しく扱えるようになります。

```json
"expo": {
  "plugins": [
    [
      "expo-build-properties",
      {
        "ios": {
          "deploymentTarget": "15.1",
          "useModularHeaders": true,
          "useFrameworks": "static"
        }
      }
    ]
  ]
}
```

<br>
・`deploymentTarget`: Firebase やその他のライブラリが要求する最小 iOS バージョンに合わせる  
・`useModularHeaders`: CocoaPods にモジュラーヘッダの依存関係を正しく解決させる  
・`useFrameworks`: `static` を指定することで Swift/CocoaPods 側の仕様に合わせてビルド

この設定を加えることで当初のエラーは解消され、Xcode のプロジェクト構造も Expo の自動管理のまま変更する必要がありません。

## include of non-modular header inside framework module 'RNFBApp... に対する対応

ただし先の設定で `useModularHeaders: true` を有効にすると、React Native のヘッダが framework モジュール内で「non-modular」として扱われるようになり、`include of non-modular header inside framework module 'RNFBApp...` のようなビルドエラーが発生することがあります。これは CocoaPods のモジュール化周りで React Native のソースコードが直接組み込まれていないためです。

この問題を回避するために `buildReactNativeFromSource` を `true` にして、React Native のネイティブコードをソースからビルドするようにします。こうすることでモジュールヘッダの解決と linking が整い、上記エラーが解消します。

```json
"expo": {
  "plugins": [
    [
      "expo-build-properties",
      {
        "ios": {
          "deploymentTarget": "15.1",
          "useModularHeaders": true,
          "useFrameworks": "static",
          "buildReactNativeFromSource": true
        }
      }
    ]
  ]
}
```

この設定は React Native の依存関係をソースから組み込むため少しビルド時間が伸びますが、モジュール互換性の問題を避けたい場合には安定した解決策になります。

## おわりに

`expo-build-properties` を使って Expo の iOS 設定をカスタムすることで、Firebase をはじめとする Swift ポッドとの静的リンクの問題や React Native のヘッダのモジュール化のエラーに対処できました。今回紹介した設定をそのまま使っても安全ですが、アプリの要件に応じて `deploymentTarget` などの値を調整してください。

ご質問や追加のエラーがあればコメントやメールで教えていただけるとうれしいです。お時間があるときに他の記事やプロジェクトも覗いていただけるとうれしいです ☺️
