---
layout: post
title: "expo + firebaseアプリにAppleサインインの実装(EXPO SDK53)"
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/GitHub.png
share-img: /assets/img/GitHub.png
tags: [Expo]
category: errlog
author: taiyou
---

## はじめに

Expo + firebase で管理しているアプリに Apple SignIn を実装してみました。  
[そのアプリ](https://apps.apple.com/app/eigo-read/id6748108116)

情報を探ってみても ExpoSDK のバージョンが異なっていたりして、自分の環境だとうまくいかなかったので  
同じような人に参考になれば幸いです。
<br>
<br>

## 完成形

このような形で firebase の Authentication にアカウントが追加されます。
<img src="/assets//img//2025-07-28/1.png" alt="sdk" style="max-width: 600px;" />
<br>
<br>

## 事前準備

expo-apple-authentication をインストール

```bash
npx expo install expo-apple-authentication
```

<br>
app.jsonのpluginsにexpo-apple-authenticationを使うように記述

```json
"plugins": [
      "expo-apple-authentication"
    ]
```

<br>
<br>

## コード

一部こちらのコードを参考にさせていただいています。
[Qiita](https://qiita.com/mildsummer/items/5a0e95a765df6040535e)

```ts
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { OAuthProvider, signInWithCredential } from "firebase/auth";

function nonceGen(length: number) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const useSignInContainer = () => {
  const signInWithApple = async () => {
    try {
      const nonce = nonceGen(32); // ランダム文字列（ノンス）を生成
      const digestedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
      ); // SHA256でノンスをハッシュ化
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          // ユーザー情報のスコープを設定（名前とメールアドレスのみ可）
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: digestedNonce, // Apple側にはハッシュ化したノンスを渡す
      });
      console.log("Apple Sign In result: ", result);
      let provider = new OAuthProvider("apple.com");
      let credential = provider.credential({
        idToken: result.identityToken ?? undefined,
        rawNonce: nonce, // Firebase側には元のノンスを渡して検証させる
      });
      const firebaseResult = await signInWithCredential(auth, credential);
      pageReplace("/home/library");
      console.log("Firebase Auth result: ", firebaseResult);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    signInWithApple,
  };
};
```

<br>
あとは、UI 側で`signInWithApple`を置だけです。

<br>
<br>

## おわりに

その他の記事もぜひご覧ください！

個人制作アプリ  
[英語長文リーダー](https://apps.apple.com/app/eigo-read/id6748108116)  
[倉庫番](https://apps.apple.com/us/app/%E6%8E%98%E3%81%A3%E3%81%A6%E9%81%8B%E3%81%B6%E6%96%B0%E6%84%9F%E8%A6%9A%E5%80%89%E5%BA%AB%E7%95%AA%E3%82%B2%E3%83%BC%E3%83%A0/id1610742687)

**お問い合わせ:** hiromacha1116@icloud.com
