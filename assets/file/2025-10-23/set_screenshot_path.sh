#!/bin/bash
# 使い方: set_screenshot_path.sh ~/Desktop/Screenshots

if [ -z "$1" ]; then
  echo "❌ 保存先パスを指定してください。"
  echo "例: $0 ~/Desktop/Screenshots"
  exit 1
fi

# ~ を展開して絶対パスに変換
TARGET_PATH=$(eval echo "$1")

mkdir -p "$TARGET_PATH"
defaults write com.apple.screencapture location "$TARGET_PATH"
killall SystemUIServer

echo "✅ スクリーンショット保存先を「$TARGET_PATH」に変更しました。"