---
layout: post
title: "Codex Skillsを使ってみたら衝撃だった話（会話しながら独自Skillを作る）"
subtitle: "初見でもできた、作成から運用までの実践メモ"
description: "Codex Skillsの基本と、ブログ記事のSEOチェックを自動化するSkillを会話ベースで作る手順・運用結果を具体例つきで解説します。"
cover-img: /assets/img/codex.webp
tags: ["Codex Skills", Jekyll, SEO, ブログ運営]
category: 紹介 / ログ
author: taiyou
---

{% capture bubble_dev_taiyou_intro %}
なんでもっと早くSkillについて調べなかったのか後悔
{% endcapture %}
{% include speech-bubble.html side="left" name="taiyou" avatar="/assets/img/hiromasa.webp" message=bubble_dev_taiyou_intro %}

## はじめに

この記事では、

- そもそもSkillsって何か
- 実際にCodexと会話しながらどう作るか
- 最終的にどんなSkillができたか

を、手順ベースで書いていきます。

## そもそもCodex Skillsって何？

Codex Skillsは、**特定タスクの進め方をCodexに渡すためのローカル手順書**です。

普通に毎回プロンプトで指示しても動いてくれますが、
同じ作業を繰り返すなら、Skill化しておくと毎回の手間が減ります。

例えばこんな用途です。

- ブログ記事のSEOチェック手順を固定化する
- エラー調査時のチェック順を固定化する
- リリース前の確認手順をテンプレ化する

要するに「よくやる作業」を再利用できる形にしておく方法です。

## 今回やったこと（ハンズオン）

今回は、
**「ブログ記事のSEOを整えるためのSkill」** を作成しました。

流れはシンプルです。

1. Codexに「サイト全体のSEO改善をしたい」と伝える
2. Codexが実際に動くskillを作成してくれる

## Codexとの実際の会話

<img src="/assets/img/2026-02-17/1.webp" alt="CodexにSEO対策Skillの作成を依頼している会話画面" style="height: auto; max-height: 520px" />

> 自分: SEO対策のskill作成お願い
>
> Codex: 了解。(必要なファイルを作成)

作成後は、skill名を実行するだけで記事を読んで改善点を出し、修正まで進めてくれます。
プロンプトで都度指示する方法でも可能ですが、skill化すると1コマンドで進められます。

skillコマンドはローカルの`user/.codex`以下に作成されます。

<img src="/assets/img/2026-02-17/3.webp" alt="ローカルの .codex 配下にSkillが作成された様子" style="height: auto; max-height: 520px" />

## 実際に作られたSkill

```
---

name: jekyll-post-seo
description: Optimize SEO for Jekyll blog posts, especially markdown files under \_posts/\*.md. Use when improving search visibility, click-through rate, and on-page structure for articles by editing title/subtitle/description/front matter, heading hierarchy, internal links, images/alt text, and metadata consistency.

---

# Jekyll Post SEO

## Workflow

1. Identify the target post and goal keyword/theme.
2. Audit front matter, heading structure, search intent coverage, internal links, and media metadata.
3. Apply concrete edits directly to the markdown file.
4. Return a short changelog with SEO rationale and any remaining gaps.

## Front Matter Standards

For posts in this repo, prioritize these fields:

- `layout`: keep `post`.
- `title`: place the core topic early; remove noisy punctuation and unclear wording.
- `subtitle`: keep as a supporting promise, not a duplicate title.
- `description`: write a concise summary that matches search intent and main keyword naturally.
- `tags`: use 2-5 specific tags; avoid overly broad tag-only sets.
- `category` / `categories`: keep values consistent if both are present.
- `cover-img` or other image fields: keep valid project paths and remove malformed paths (for example accidental double slashes).
- `author`: preserve existing author unless asked to change.

## Content Optimization Rules

- Start body content at `##` headings because page title is already rendered from front matter.
- Ensure heading hierarchy is monotonic (`##` -> `###` -> `####`) without level jumps.
- Make the opening section answer the article's main intent quickly.
- Keep paragraphs concise and scannable; prefer concrete claims over vague statements.
- Add or refine sections only when they strengthen intent coverage.
- Preserve the writer's tone and language (Japanese-first unless asked otherwise).

## Internal Linking Process

1. Find related posts under `_posts/` by topic keywords.
2. Add 2-5 contextual internal links where they improve navigation.
3. Use descriptive anchor text; avoid generic anchors like "こちら" alone.
4. Prefer links to evergreen or strongly related content.

## Media and Link Hygiene

- Ensure each meaningful image has useful `alt` text.
- Keep image usage relevant to nearby content.
- For affiliate/promotional external links, keep appropriate `rel` attributes when applicable.
- Do not add unverifiable facts, fake statistics, or fabricated citations.

## Output Contract

When asked to optimize a post, do all of the following:

1. Edit the target file directly.
2. Summarize key changes in short bullets (what changed and why).
3. If useful, propose 2-3 title alternatives and 1-2 meta description alternatives.
4. Call out unresolved items requiring user decisions.

## Reference

- For strict audits and scoring, use `references/seo-checklist.md`.

```

## 結果どうだったか

結論、**記事公開前の仕上げ速度が明確に上がりました。**

特に効いたのはこの3つです。

- 毎回どこを直すか迷わない
- 抜けやすい `description` や内部リンクを忘れにくい
- 記事ごとのSEO品質がぶれにくい

「最終調整は人間、土台はSkill」で分担すると、
無理なく運用を続けられます。

## 実際に使ってみた例

実際に、初期に作って放置していた記事へ適用しました。

- 対象記事: [GitHub Pages × JekyllにGoogle Analyticsを設定する手順]({% post_url 2025-06-02-jekyll-analytics %})

実際に変わったポイントはこんな感じでした。

1. タイトルを「手順が分かる形」に変更して検索意図と一致させる
2. `description` を具体化して、記事を開く前に内容が伝わる状態にする
3. 見出しを「1 → 2 → 3」の手順型にして、流し読みしやすくする
4. 関連記事リンクを追加して、次に読む導線を作る
5. 画像の `alt` と画像パスの表記ゆれを修正する

このあたりは、頭では分かっていても地味に抜けやすいので、
Skillでチェック順を固定化した恩恵が大きかったです。

<img src="/assets/img/2026-02-17/5.webp" alt="Codex Skillsで既存記事をSEO改善した実行例" style="height: auto; max-height: 520px" />

## 他にどんなことができそう？

SEOはあくまで1例で、Skillsはもっと広く使えます。

- コードレビュー前のチェック手順を固定化する
- リリース前の確認項目（設定・ログ・監視）をテンプレ化する
- バグ調査の切り分け手順を毎回同じ流れで実行する
- 議事録や日報の下書きフォーマットを作って運用する
- 読書メモや比較検討の観点を定型化して整理する

つまり、コード作業だけでなく、
「考える順番」や「確認漏れを減らす型」を持たせたい場面なら
Skills化できる場面は広いです。

## まとめ

Codex Skillsは、
「便利そうだけど設定が重そう」という印象がありました。

実際は、**会話しながら少しずつ作る** だけでも十分に使えます。

まだ微妙だなと思う点はその都度どんどん改善して、
自分の作業に合う形へ少しずつ調整していくのが現実的です。

関連記事:

最後まで読んでいただきありがとうございます！  
私の記事が少しでも参考になったなら幸いです。
