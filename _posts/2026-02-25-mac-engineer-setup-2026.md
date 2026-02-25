---
layout: post
title: "エンジニアのMac環境構築 2026年版｜最初に入れるもの全部見せます"
subtitle: "新MacBook・新学期・転職後に使えるセットアップまとめ"
description: "エンジニアがMacを手に入れたら最初にやること・入れるアプリをまとめました。開発ツール、ターミナル、生産性ツールまで実際に使っているものだけ紹介します。"
cover-img: /assets/img/beginner.webp
tags: [Mac, 環境構築, エンジニア, 開発環境]
category: 開発
---

## はじめに

新しいMacを手に入れたとき、あるいは新年度・転職のタイミングで環境を整え直すとき。
「何から入れればいいんだっけ」ってなること、ありますよね。

この記事では、個人開発もしている自分が**実際に使っているもの**だけを紹介します。
「とりあえず入れておけ」という余計なものは省いています。

---

## まずやること

### Homebrewを入れる

これがないと始まりません。
パッケージマネージャーで、ほぼすべてのツールをコマンド一発で入れられます。

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Apple Siliconの場合は `.zprofile` にパスを追加するのを忘れずに。

### システム設定をざっくり整える

細かいことは後でいいので、最初だけこれはやっておきます。

- **Dock** → 自動的に隠す（画面が広くなる）
- **トラックパッド** → 軌跡の速さを最大にする
- **キーリピート** → 最速にする（コード書くとき体感が全然違う）
- **Caps Lock → Control** に変更（ターミナルで死ぬほど使う）

---

## ターミナル・シェル環境

### iTerm2

標準のターミナルより格段に使いやすくなります。
分割表示、テキスト選択でのコピーなど、地味に便利な機能が揃っています。

```bash
brew install --cask iterm2
```

### Oh My Zsh

Zshの設定を管理するフレームワーク。
プラグインとテーマを入れるだけで補完が効いてかなり使いやすくなります。

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

自分は `zsh-autosuggestions` と `zsh-syntax-highlighting` を入れています。
過去に打ったコマンドが薄く表示されて、Tabで補完できるのが地味に快適です。

---

## 開発ツール

### Git

MacにはデフォルトでGitが入っていますが、Homebrewで入れ直した方が最新版を使えます。

```bash
brew install git
```

入れたら最初にユーザー情報だけ設定しておきます。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "your@email.com"
```

### Node.js（nvm経由で入れる）

直接入れると後でバージョン管理がつらくなります。
`nvm` 経由で入れておくのが無難です。

```bash
brew install nvm
```

その後 `.zshrc` に設定を追加して、`nvm install --lts` で最新LTSを入れる流れです。

### VS Code

自分はメインエディタとして使っています。
拡張機能が豊富で、何を作るにしても困ることがほぼないです。

```bash
brew install --cask visual-studio-code
```

インストール後に `Shell Command: Install 'code' command in PATH` を実行しておくと、ターミナルから `code .` でそのままVS Codeが開けます。

### Docker Desktop

ローカルで環境を汚さずに何でも動かせます。
特に複数プロジェクトを同時に進めるときに重宝します。

```bash
brew install --cask docker
```

---

## ブラウザ

### Google Chrome

開発には必須です。DevToolsが使いやすく、拡張機能も充実しています。

よく使うChrome拡張：
- **uBlock Origin**：広告ブロック
- **Vimium**：キーボードでブラウジング（慣れると手放せない）
- **JSON Formatter**：APIのレスポンスを見やすくする

---

## 生産性ツール

### Raycast

Spotlightの完全上位互換です。
アプリ起動、ファイル検索、クリップボード履歴、Snippets機能など、
これ一個でかなりの作業が効率化できます。

自分はSpotlightのショートカット（`Cmd + Space`）をRaycastに割り当てています。

### Notion

メモ・タスク管理・設計書をまとめています。
個人開発の仕様まとめや進捗管理に使っています。

### Obsidian

長期的なメモや知識の整理にはObsidianを使い分けています。
マークダウンでローカルに保存されるのが気に入っています。

---

## その他

### DeepL

翻訳アプリです。英語の公式ドキュメントを読むときに使います。
ショートカット一発で選択テキストを翻訳できるので、調べ物が格段に速くなります。

### Keka

Macの標準の解凍ツールはZip以外がつらいです。
KeekaはZip/tar.gz/7zなど主要な形式に対応していて、ドラッグ&ドロップで使えます。

### Bartender（または Ice）

メニューバーのアイコンが増えてごちゃごちゃしてきたら整理に使います。
Bartenderは有料ですが、無料の代替として**Ice**もおすすめです。

---

## デスク環境も整えると効果が大きい

ツールと同じくらい、物理的な環境も大切だと感じています。

- **昇降式デスク**：姿勢が整って腰の負担が減りました。
  → [昇降式デスクを在宅ワーク中心の人に激推しする理由](/2026-02-20-standing-desk-engineer-reasons)

- **縦置きスタンド**：デスクが広く使えるようになります。
  → [UGREEN 縦型 ノートPCスタンドのレビュー](/2026-02-18-ugreen-vertical-laptop-stand-review)

ツールの最適化をやりきった後は、物理環境の投資対効果が高いと実感しています。

---

## まとめ

| カテゴリ | ツール |
|---|---|
| パッケージ管理 | Homebrew |
| ターミナル | iTerm2 + Oh My Zsh |
| バージョン管理 | Git |
| ランタイム管理 | nvm |
| エディタ | VS Code |
| コンテナ | Docker Desktop |
| ランチャー | Raycast |
| メモ・設計 | Notion / Obsidian |
| 翻訳 | DeepL |

環境構築は「完璧にしてから作業を始める」よりも、
**最小限入れてから実際に作りながら整えていく**のが合っていると感じています。

最初に紹介したHomebrewさえ入れれば、他はすぐ追加できます。
まずはそこから始めてみてください。
