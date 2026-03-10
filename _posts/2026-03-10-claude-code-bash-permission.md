---
layout: post
title: "【Claude Code】Bashコマンドの確認ダイアログを止める方法"
subtitle: "settings.json の permissions 設定で、毎回の承認をスキップする"
description: "Claude CodeでBashコマンドを実行するたびに確認が出て煩わしい人向け。settings.jsonのpermissions.allowで特定コマンドを自動許可する方法をまとめました。"
cover-img: /assets/img/2026-03-01/5.webp
tags: [開発, Claude Code, AI]
category: 開発
categories: [開発]
author: たいよう
---

## 結論から言うと

`~/.claude/settings.json` に `permissions.allow` を設定するだけで解決します。

全コマンドを許可するなら `"Bash(*)"` を指定、特定コマンドだけ許可するなら `"Bash(git *)"` のようにパターンで絞り込めます。

## どういう状況か

Claude Codeを使っていると、`git status` などの読み取り系コマンドでも毎回確認ダイアログが出ることがあります。

作業の流れが途切れるので、信頼できるコマンドは自動承認させたいというのは自然な要望です。

## 設定方法

`~/.claude/settings.json` を開いて（なければ新規作成）、以下のように `permissions` を追加します。

### すべてのBashコマンドを許可する

```json
{
  "permissions": {
    "allow": ["Bash(*)"]
  }
}
```

`*` はワイルドカードで、あらゆるコマンドにマッチします。
確認なしで何でも実行されるので、信頼できる環境・プロジェクトで使う場合に向いています。

### 特定コマンドだけ許可する（推奨）

全コマンドを通すのが不安な場合は、パターンで絞り込む方法がおすすめです。

```json
{
  "permissions": {
    "allow": ["Bash(git *)", "Bash(npm *)", "Bash(ls *)", "Bash(cat *)"]
  }
}
```

こうすると `git` や `npm` 系のコマンドだけが自動許可され、`rm` や `curl` などは引き続き確認が入ります。

### プロジェクトごとに設定する

グローバル設定（`~/.claude/settings.json`）ではなく、プロジェクトルートの `.claude/settings.local.json` に書くとそのプロジェクトだけに適用できます。

```json
{
  "permissions": {
    "allow": ["Bash(npm *)", "Bash(git *)"]
  }
}
```

リポジトリごとに許可範囲を変えたい場合に便利です。

## 起動オプションで全スキップする方法もある

`--dangerously-skip-permissions` フラグを使うと、すべての許可チェックをバイパスしてClaude Codeを起動できます。

```bash
claude --dangerously-skip-permissions
```

ただし名前の通り危険な設定です。ファイル削除やネットワーク操作も確認なしで実行されるので、一時的な利用以外には向きません。

## まとめ

| 方法                               | 適用範囲                 | 安全性       |
| ---------------------------------- | ------------------------ | ------------ |
| `"Bash(*)"`                        | 全コマンド自動許可       | 低め         |
| `"Bash(git *)"` などのパターン指定 | 特定コマンドのみ         | バランスよし |
| `.claude/settings.local.json`      | プロジェクト単位         | 柔軟に調整可 |
| `--dangerously-skip-permissions`   | 全許可チェックをバイパス | 低め         |

普段の開発用途なら、よく使うコマンド（git、npm、ls など）だけパターン指定するのが現実的な落としどころだと思います。

## 参考

- [Claude Code 公式ドキュメント - Settings](https://docs.anthropic.com/ja/docs/claude-code/settings)
