---
layout: post
title: "Android App Bundle が誤った鍵で署名されています。のエラーに対処"
subtitle: "Expoを使っている場合の対応策です"
description: "Expo で誤って新しいアップロードキーを作ってしまい、Play Console で AAB を受け付けられなくなった時の復旧手順。"
cover-img: /assets/img/header.webp
thumbnail-img: /assets/img/2026-01-20/samune.webp
share-img: /assets/img/2026-01-20/samune.webp
tags: [Expo, react-native, エラー解決]
category: errlog
---

{% capture bubble_dev_taiyou_intro %}
考え中
{% endcapture %}
{% include speech-bubble.html side="right" name="たいよう" avatar="/assets/img/hiromasa.webp" message=bubble_dev_taiyou_intro %}

## はじめに

`eas build` の途中で `generate new fingerprint` にうっかり `yes` を選んでしまい、  
新しい署名キー（アップロードキー）を作成してしまいました。  
その結果、Google Play Console で AAB が受け付けられなくなりました。  
原因は「Expo 側で持っているアップロードキー」と「Play Console が登録しているアップロードキー」が
一致していないことです。  
この場合は、**ローカルで新しいアップロードキーを作り直し、Expo と Play Console の両方に適用**すれば復旧できます。
以下、実際にやった手順をまとめます。

<img src="/assets/img/2026-01-20/1.webp" alt="sdk" style=" height: auto; max-height: 600px" />

## 解決策

少し工程が多いですが、順を追って解説します。  
私は、以下の作業をプロジェクトのルートで行いました。

### 1. 新規に JKS を作成する

ローカルでアップロードキー用の JKS を作ります。

```bash
keytool -genkeypair -v \
  -storetype JKS \
  -keystore upload-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

作成時に聞かれるパスワードは後で使うので控えておきます。

### 2. PEM を作成する

Play Console の「アップロードキーのリセット申請」に必要なので、証明書（PEM）を出力します。

```bash
keytool -export -rfc \
  -keystore upload-key.jks \
  -alias upload \
  -file upload_certificate.pem
```

### 3. credentials.json を作成する

EAS にアップロードキーを認識させるため、`credentials.json` を用意します。

credentials.json

```json
{
  "android": {
    "keystore": {
      "keystorePath": "upload-key.jks",
      "keystorePassword": "JKSのパスワード",
      "keyAlias": "upload",
      "keyPassword": "キーのパスワード(JKSのパスワードと同じものでOK)"
    }
  }
}
```

<br>
eas.jsonにはbuild時のcredentialsSourceにlocalを参照するように記述します。

```json
{
  "cli": {
    "version": ">= 16.13.3",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true,
      "android": {
        "credentialsSource": "local" // <-ここ
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

<br>
このようなディレクトリ構造になりました。  
囲んであるのが、今回作成か変更を加えたファイルになります。

<img src="/assets/img/2026-01-20/4.webp" alt="sdk" style=" height: auto; max-height: 600px" />

### 4. EAS に新しいキーを登録する

```bash
eas build -p android --profile=production
```

<br>
新規ビルドすることで、ローカルのキー情報がExpo側に反映されます。  
localのcredentialsSourceを参照しているというような文言がコマンド入力後に表示されると思います(具体的な文言はスクショ撮り忘れました🙏)。

### 5. Play Console でアップロードキーのリセットを申請

Play Console の  
**「アプリの完全性 > Play アプリ署名の設定 > アップロード鍵の証明書 > アップロード鍵のリセットのリクエスト** から  
さきほど生成した`upload_certificate.pem` を使って申請します。

<img src="/assets/img/2026-01-20/2.webp" alt="sdk" style=" height: auto; max-height: 600px" />

## 待つ

申請が完了したら、もう少しだけ待ってねという通知が来ると思うので、新しいキーが有効になるまで待ちます。
有効になったら、新規AABを再提出しましょう！

<img src="/assets/img/2026-01-20/3.webp" alt="sdk" style=" height: auto; max-height: 600px" />

## おわりに

「誤った鍵で署名されています」系のエラーは、**アップロードキーの不一致**が原因で起きることが多いです。  
新しいキーを作成して、Expo と Play Console の両方を同じ鍵に揃えれば解決できます。

ご質問や追加のエラーがあればコメントやメールで教えていただけるとうれしいです。  
お時間があるときに他の記事やプロジェクトも覗いていただけるとうれしいです ☺️

