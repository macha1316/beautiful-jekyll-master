---
name: to-webp
description: 画像ファイルをwebpに変換する。引数なしで今日の日付フォルダを自動対象にする。jpg, png, heic など任意の拡張子に対応。
disable-model-invocation: true
argument-hint: "[ファイルパス ...]"
---

今日の日付: !`date +%Y-%m-%d`

## 変換対象の決定

- `$ARGUMENTS` が **空の場合**: `assets/img/!`date +%Y-%m-%d`/` 以下にある `.webp` 以外の画像ファイルを全て対象にする
- `$ARGUMENTS` が **指定されている場合**: そのファイルのみを対象にする

対象の拡張子: `jpg`, `jpeg`, `png`, `gif`, `heic`, `heif`, `tiff`, `bmp`

## 変換手順

対象ファイルをファイル名順（アルファベット順）にソートし、1.webp, 2.webp, 3.webp ... と連番で命名して出力する。
出力先は元ファイルと同じディレクトリ。

**通常形式（jpg, jpeg, png, gif, tiff, bmp）の場合:**
```
cwebp -q 85 "入力ファイル" -o "ディレクトリ/N.webp"
```

**HEICなどcwebpが非対応の形式の場合:**
```
sips -s format png "入力ファイル" --out "中間.png"
# PNGが生成できた場合のみ続行
cwebp -q 85 -quiet "中間.png" -o "ディレクトリ/N.webp"
rm "中間.png"
```

注意:
- `sips` に `--quiet` オプションは存在しないので使わないこと
- 変換が成功した（webpファイルが生成された）場合のみ元ファイルを削除する
- 失敗した場合は元ファイルを保持してエラーを報告する

## 完了後の報告

変換したファイル一覧を以下の形式で伝える:

```
変換完了:
  IMG_3696.heic → 1.webp (元: 1.0MB → 変換後: 565KB)
  IMG_3697.heic → 2.webp (元: 1.0MB → 変換後: 404KB)
元ファイルを削除しました。
```
