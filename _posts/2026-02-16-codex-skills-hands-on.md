---
layout: post
title: "Codex Skillsを使ってみたら衝撃だった話（会話しながら独自Skillを作る）"
subtitle: "初見でもできた、Codexとの対話ハンズオン記録"
description: "Codex Skillsの仕組みをざっくり説明しつつ、実際にCodexと会話しながらSEO対策Skillを作って運用した手順と結果をまとめました。"
cover-img: /assets/img/codex.jpeg
tags: [雑談, Codex, SEO, ブログ運営]
category: chat
author: taiyou
---

## はじめに

最近、Codex-Skillsをちゃんと触ってみたんですが、
正直、**「これ、思ってたよりずっと実用的だな…」** というのが第一印象でした。

この記事では、

- そもそもSkillsって何か
- 実際にCodexと会話しながらどう作るか
- 最終的にどんなSkillができたか

を、1本でまとめます。

## そもそもCodex Skillsって何？

ざっくり言うと、**Codexに特定タスクのやり方を覚えさせるためのローカル手順書**です。

普通に毎回プロンプトで指示しても動いてくれますが、
同じ作業を繰り返すなら、Skill化しておくとかなりラクになります。

例えばこんな用途です。

- Jekyll記事のSEOチェック手順を固定化する
- エラー調査時のチェック順を固定化する
- リリース前の確認手順をテンプレ化する

つまり「よくやる作業」を再利用可能な形にするイメージです。

## 今回やったこと（ハンズオン）

今回は、
**「Jekyll記事のSEOを整えるためのSkill」** を作ってみました。

流れはシンプルです。

1. Codexに「サイト全体のSEO改善をしたい」と伝える
2. Codexが実際に動くskillを作成してくれる

## Codexとの実際の会話

<img src="/assets/img/2026-02-17/1.png" alt="" style="height: auto; max-height: 520px" />

> 自分: SEO対策のskill作成お願い
>
> Codex: 了解。(必要なファイルを作成)

あとは、skillが作成してくれた、skill名を叩くだけで、記事内容を読み取って、どこがSEO的にダメかを見て修正まで行ってくれます。なんて、便利な。。プロンプトでもできることですが、skillを使えば、1コマンドで済むという。

ちなみに、skillコマンドはlocalの`user/.codex`以下に作成されます。

<img src="/assets/img/2026-02-17/3.png" alt="" style="height: auto; max-height: 520px" />

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
ちょうどいいバランスで回せる感じです。

## 実際に使ってみた例

実際に、初期に作って放置していたこの記事に適用しました。

- 対象記事: [GitHub Pages × JekyllにGoogle Analyticsを設定する手順]({% post_url 2025-06-02-jekyll-analytics %})

実際に変わったポイントはこんな感じでした。

1. タイトルを「手順が分かる形」に変更して検索意図と一致させる
2. `description` を具体化して、記事を開く前に内容が伝わる状態にする
3. 見出しを「1 → 2 → 3」の手順型にして、流し読みしやすくする
4. 関連記事リンクを追加して、次に読む導線を作る
5. 画像の `alt` と画像パスの表記ゆれを修正する

このあたりは、頭では分かっていても地味に抜けやすいので、
Skillでチェック順を固定化した恩恵が大きかったです。

<img src="/assets/img/2026-02-17/5.png" alt="Codex Skillsで既存記事をSEO改善した実行例" style="height: auto; max-height: 520px" />

## 他にどんなことができそう？

SEOはあくまで1例で、Skillsはもっと広く使えます。

- コードレビュー前のチェック手順を固定化する
- リリース前の確認項目（設定・ログ・監視）をテンプレ化する
- バグ調査の切り分け手順を毎回同じ流れで実行する
- 議事録や日報の下書きフォーマットを作って運用する
- 読書メモや比較検討の観点を定型化して整理する

つまり、コード作業だけでなく、
「考える順番」や「確認漏れを減らす型」を持たせたい場面なら
だいたいSkills化の余地があると思っています。

## まとめ

Codex Skillsは、
「便利そうだけど設定が重そう」という印象がありました。

でも実際は、**会話しながら小さく作って育てる** だけで十分使えます。

まだ微妙だなと思う点はその都度どんどん改善して、
自分にとって使いやすいSkillに育てていくのが一番よさそうです。

最後まで読んでいただきありがとうございます！  
私の記事が少しでも参考になったなら幸いです。
