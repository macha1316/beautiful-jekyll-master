---
layout: post
title: "Expo SDK 55 Betaを見据えたEAS Update運用ガイド"
subtitle: "New Architecture前提でOTA更新を安全に回す実践手順"
description: "2026年2月15日時点の公式情報をもとに、Expo SDK 55 Beta移行を見据えたEAS Update運用の設計ポイントを整理します。"
cover-img: /assets/img/expo.png
tags: [Expo, EAS Update, React Native, OTA]
category: app-dev-beginner
---

## はじめに

Expoでアプリ運用を続けると、必ず悩むのが「どこまでをOTAで出して、どこからを再ビルドにするか」です。

この記事では、**2026年2月15日時点の公式情報**をベースに、SDK 55 Beta移行を見据えたEAS Update運用を整理します。

## 結論

- `runtimeVersion` の方針を先に決める（`appVersion` か `fingerprint`）
- `production` と `staging` のチャンネルを分ける
- ネイティブ依存の変更時はOTAではなく新規ビルドを作る
- SDK 55系ではNew Architecture固定なので、移行前に依存ライブラリ互換性を確認する

## まず押さえる前提

2026年2月15日時点では、Expo公式Changelog上で **SDK 55はBeta公開（2026年1月22日）** です。  
またExpo公式ドキュメントでは、SDK 55以降はNew Architectureのみで動作し、Legacy Architectureは使えない前提になっています。

「今すぐ本番でSDK 55に固定する」より、まずはSDK 54運用を安定させたうえで、55対応を進めるのが安全です。

## 手順1: runtimeVersionポリシーを決める

EAS Updateは、`runtimeVersion` が一致するビルドにしか配信されません。  
つまり、ここを曖昧にすると「更新が届かない」「届いたがネイティブ不整合」が起きやすくなります。

実運用では次のどちらかが扱いやすいです。

- `appVersion`: リリース単位でバージョン管理したい場合に向く
- `fingerprint`: ネイティブ互換性の事故をより避けたい場合に向く

SDKアップデート時に依存関係を揃える流れは、  
[`Expo SDK を アップデートした時にライブラリの互換性を合わせる`](/2025-06-03-expo-update)
も参考になります。

## 手順2: チャンネル設計を固定する

EAS Updateは「チャンネル」と「ブランチ」の対応で配信先を切り替えます。  
まずはシンプルに次の2チャンネルで十分です。

- `production`: 本番ユーザー向け
- `staging`: 検証端末向け

公開時は以下のようにチャンネルを明示します。

```bash
eas update --channel production --message "fix: crash on settings screen"
```

Expo Go / 開発端末の接続で詰まる場合は、  
[`同じ Wi-Fi でも Expo Go でテストできないときの対処方法`](/2025-11-04-expo-tunnel)
もあわせて確認してください。

## 手順3: OTAでやる変更と、ビルドし直す変更を分ける

EAS Updateで向いているのは、JS/スタイル/画像などの非ネイティブ変更です。  
一方、以下は原則として新規ビルドが必要です。

- ネイティブコードの変更
- SDKバージョン更新
- 権限追加などストア審査影響の大きい変更

公開フロー全体で迷う場合は、  
[`今からアプリ開発を始めるならExpoがおすすめな5つの理由`](/2026-02-13-why-expo-for-app-dev)
のEAS運用パートも先に読むと全体像を掴みやすいです。

## 手順4: SDK 55 Beta移行前の確認

SDK 55系ではNew Architecture前提なので、以下を先に確認します。

- `newArchEnabled: false` 前提の設定や分岐が残っていないか
- 主要ライブラリがNew Architectureで動作実績があるか
- iOS/Android両方でstagingチャンネルに更新が届くか

iOSネイティブ設定で詰まりやすい場合は、  
[`Expo＋Firebaseで出る iOS ビルドエラーをexpo-build-propertiesで解決`](/2025-11-15-expo-build-properties)
が実践的です。

## よくある詰まりどころ

- 依存関係のバージョン不整合
- `runtimeVersion` の更新漏れで想定外の配信になる
- productionとstagingの切り分けが曖昧で検証漏れが起きる
- 「OTAで直せる」と思った変更が実はネイティブ変更だった

## まとめ

SDK 55 Beta時点では、まず運用設計を固めるのが最優先です。

- `runtimeVersion` のルールを明文化
- チャンネル運用を固定
- OTA対象/非対象の境界をチームで共有

この3点を先に作っておけば、SDK 55正式移行後も事故を減らして更新サイクルを回せます。

## 参考URL

- [Expo SDK 55 Beta is now available](https://expo.dev/changelog/sdk-55-beta)
- [React Native's New Architecture (Expo Docs)](https://docs.expo.dev/guides/new-architecture/)
- [EAS Update Introduction](https://docs.expo.dev/eas-update/introduction/)
- [Runtime versions and updates](https://docs.expo.dev/eas-update/runtime-versions/)
- [Manage branches and channels with EAS CLI](https://docs.expo.dev/eas-update/eas-cli/)
