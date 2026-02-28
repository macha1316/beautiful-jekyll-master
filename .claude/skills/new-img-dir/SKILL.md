---
name: new-img-dir
description: 今日の日付で assets/img/YYYY-MM-DD/ フォルダを作成する。新しい記事を書くときに使う。
disable-model-invocation: true
---

今日の日付: !`date +%Y-%m-%d`

上記の日付を使って `assets/img/<日付>/` ディレクトリを作成してください。

Bashで以下を実行する:
- `mkdir -p assets/img/<日付>`

作成後、「`assets/img/<日付>/` を作成しました」と一言だけ伝えてください。
