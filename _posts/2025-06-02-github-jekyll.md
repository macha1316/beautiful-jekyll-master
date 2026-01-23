---
layout: post
title: GitHub Pages × Jekyllでブログを作るときにつまづいたことまとめ
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/header.png
thumbnail-img: /assets/img/GitHub.png
share-img: /assets/img/GitHub.png
tags: [Jekyll]
category: app-Intro
author: taiyou
---

## はじめに

自分のサイトを無料で公開したい！と思い、**GitHub Pages + Jekyll** にチャレンジしました。

情報はたくさんあるものの、初心者の自分には意外とハードルがあり、**何度もエラーに悩まされました**。  
この記事では、僕が実際に詰まったポイントをまとめておきます。

この記事では一から制作について記述していません。
エラーで詰まった時などに参考になれば幸いです 🙏

参考にしたサイト
[ゼロからわかる！GitHub Pages を使った自前無料ブログの作り方（Jekyll）](https://qiita.com/madoreenu/items/b47833bf785562c77819)

---

## 標準の Ruby は使い物にならない

Mac には最初から `ruby` が入っていますが、**Jekyll の最新版と相性が悪く、動かない**ケースがあります。

### ✅ 解決方法：

```bash
brew install ruby
```

その後、~/.zshrc に以下を追記：

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

<br>

## Permission 関連で落ちる

遭遇したエラー

```bash
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions, or consider exploring the `enablement` parameter for this action. Error: Resource not accessible by integration - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
Error: HttpError: Resource not accessible by integration - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
```

![画像読み込みエラー](/assets/img/2025-06-02/permission.png)

私は最初 private でリポジトリを管理していたのですが、Github Pages を使うには public に設定しないといけないみたいです。
これに気づかずに多くの時間を浪費しました 😭

こうなってたら private になっている ↓
![画像読み込みエラー](/assets/img/2025-06-02/change-public.png)

<br>

## Bundler・Gem 関連でエラー多発

GitHub Actions でビルドするとき、こんなエラーが出てました 👇

```bash
cannot load such file -- logger
bigdecimal も同様に…
```

### ✅ 解決方法：

Gemfile に以下を追記しました。

```ruby
gem "logger"
gem "bigdecimal"
```

<br>

## vendor ディレクトリを除外しないと事故る

遭遇したエラー

```bash
Error: could not read file /home/runner/work/beautiful-jekyll-master/beautiful-jekyll-master/vendor/bundle/ruby/3.3.0/gems/jekyll-4.4.1/lib/site_template/_posts/0000-00-00-welcome-to-jekyll.markdown.erb: Invalid date '<%= Time.now.strftime('%Y-%m-%d %H:%M:%S %z') %>': Document 'vendor/bundle/ruby/3.3.0/gems/jekyll-4.4.1/lib/site_template/_posts/0000-00-00-welcome-to-jekyll.markdown.erb' does not have a valid date in the YAML front matter.
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    Invalid date '<%= Time.now.strftime('%Y-%m-%d %H:%M:%S %z') %>': Document 'vendor/bundle/ruby/3.3.0/gems/jekyll-4.4.1/lib/site_template/_posts/0000-00-00-welcome-to-jekyll.markdown.erb' does not have a valid date in the YAML front matter.
```

bundle install --path vendor/bundle を使うと、本来 build する必要のないライブラリを処理しようとして CI で落ちます。

### ✅ 解決方法：

\_config.yml に以下を追加します。

```bash
exclude:
  - vendor
```

他にも .gitignore にも vendor を追加しておくとよいです。

<br>

## deploy 用のコマンドがなくて画面が表示されない

Jekyll からそのままテンプレートを持ってきている場合、ci.yml に deploy 用のコマンドが記述されていません。
そのため、デプロイが成功していざサイトに訪れても 404 エラーになってしまいます。

### ✅ 解決方法:

ci.yml に以下を追加

```bash
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## おわりに

その他の記事もぜひご覧ください！

**お問い合わせ:** hiromacha1116@icloud.com
