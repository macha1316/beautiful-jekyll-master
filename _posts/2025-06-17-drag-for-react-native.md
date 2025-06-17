---
layout: post
title: React Native PanResponderGestureState で「タップ位置から単語を特定する」
# subtitle: Rubyや設定ファイルなど初心者がハマりがちなポイント
cover-img: /assets/img/react-native.png
thumbnail-img: /assets/img/react-native.png
share-img: /assets/img/react-native.png
tags: [expo, react, react-native, lingofy, PanResponderGestureState]
author: taiyou
---

## はじめに

私の開発中のアプリ(英語リーディングアプリ 仮(lingofy))で「画面をタップ(ドラッグ)したときに、そこに表示されている単語を特定する必要がありました。
挙動的にはうまくいったので抜粋して紹介したいと思います。

## 挙動

<video src="/assets/video/2025-06-17/drag.mp4" controls width="480"></video>

## コード部分

#### 文章を格単語に切り出す

```ts
const words = useMemo<Word[]>(() => {
  return Array.from(note?.content?.matchAll(/[\w'’-]+|[.,!?;]|\n+/g) ?? []).map(
    (match, index, array) => {
      const text = match[0];
      const start = match.index ?? 0;
      const end = start + text.length - 1;

      return {
        id: index,
        text,
        start,
        end,
        type: text.includes("\n") ? "newline" : "word",
        newLineCount: text.length,
        isBeforePunctuation:
          !!array[index + 1] && /[.,!?;]/.test(array[index + 1][0]),
      };
    }
  );
}, [note]);
```

#### 解説

map で Word オブジェクト配列に変換  
 • `match[0]` … 実際にヒットした単語や記号、改行  
 • `start/end` … テキスト内でのインデックス範囲  
 • `type` ... 改行（\n を含む）なら"newline" それ以外は"word"  
 • `newLineCount` ... 連続した改行の数（例：\n\n なら 2、\n なら 1） それ以外の単語は text.length（基本的には 1）  
 • `isBeforePunctuation` ... この単語の次が句読点かどうか（スペース調整, 見た目制御）

#### 単語情報を実際に登録する関数

```ts
const onWordLayout = (event: LayoutChangeEvent, id: number) => {
  const { x, y, width, height } = event.nativeEvent.layout;
  wordPositions.current = [
    ...wordPositions.current.filter((w) => w.id !== id),
    { id, x, y, width, height },
  ];
};
```

この関数を UI 側で呼び出して単語を `wordPositions` に登録していきます。

#### onWordLayout 呼び出し側

```ts
return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.textContainer}>
        {currentWords.map((word, index) => {
          const isSelected = selectedIndices.includes(index);

          const hasPunctuationAfter = /[.,!?;]/.test(
            currentWords[index + 1]?.text
          );

          return word.type === "newline" ? (
            <View
              key={word.id}
              style={{ width: "100%", height: word.newLineCount > 1 ? 16 : 1 }}
            />
          ) : (
            <Text
              key={word.id}
              style={[
                styles.mainText,
                isSelected && styles.selectedWord,
                isSelected && !hasPunctuationAfter && styles.textPadding,
                { marginRight: isSelected || word.isBeforePunctuation ? 0 : 4 },
              ]}
              onLayout={(event) => onWordLayout(event, index)}
            >
              {word.text}
            </Text>
          );
        })}
      </View>
    </View>
```

`event(LayoutChangeEvent)` と `index` を引数に `wordPositions` に情報を格納します。

#### Drag 部分の処理

```ts
// 選択されている単語があればそれを、なければ近い単語を取得
const getClosestWordIndex = useCallback(
  (x: number, y: number) => {
    // TODO: 端末ごとに調整値を変える
    const adjustedY = y - (insets.top + 55);
    const adjustedX = x - 20;

    let closestIndex = null;
    let minDistance = Infinity;

    for (const word of wordPositions.current) {
      // タップが単語の範囲内にあるか
      if (
        adjustedX >= word.x &&
        adjustedX <= word.x + word.width &&
        adjustedY >= word.y &&
        adjustedY <= word.y + word.height
      ) {
        return word.id;
      }

      // 範囲内でなかった場
      const centerX = word.x + word.width / 2;
      const centerY = word.y + word.height / 2;
      const distance = Math.sqrt(
        (centerX - adjustedX) ** 2 + (centerY - adjustedY) ** 2
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = word.id;
      }
    }

    return closestIndex ?? 0;
  },
  [insets.top]
);

const updateSelectedRange = useCallback(() => {
  if (startIndexRef.current !== null && endIndexRef.current !== null) {
    const minIdx = Math.min(startIndexRef.current, endIndexRef.current);
    const maxIdx = Math.max(startIndexRef.current, endIndexRef.current);

    const oldMin = selectedIndices.at(0);
    const oldMax = selectedIndices.at(-1);
    const currentMin = minIdx;
    const currentMax = maxIdx;

    if (oldMin === currentMin && oldMax === currentMax) {
      return;
    }

    setSelectedIndices((prev) => {
      return Array.from({ length: maxIdx - minIdx + 1 }, (_, i) => minIdx + i);
    });
  }
}, [selectedIndices]);

const handlePanResponderGrant = useCallback(
  (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const startIdx = getClosestWordIndex(gestureState.x0, gestureState.y0);
    startIndexRef.current = startIdx;
    endIndexRef.current = startIdx;
    setSelectedIndices([startIdx]);
  },
  [getClosestWordIndex]
);

const handlePanResponderMove = useCallback(
  (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const endIdx = getClosestWordIndex(gestureState.moveX, gestureState.moveY);

    endIndexRef.current = endIdx;

    updateSelectedRange();
  },
  [getClosestWordIndex, updateSelectedRange]
);

const handlePanResponderRelease = useCallback(() => {
  startIndexRef.current = null;
  endIndexRef.current = null;

  const selectedWords = selectedIndices
    .map((index) => {
      const word = currentWords[index].text;
      const prevWord = words[index - 1] ? words[index - 1].text : "";

      if (prevWord === "\n") return word;
      if (/[.,!?;]/.test(word)) return word;

      return ` ${word}`;
    })
    .join("")
    .trim();

  openModal({ selectedWords });
}, [selectedIndices]);

const panResponder = useMemo(
  () =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
    }),
  [handlePanResponderGrant, handlePanResponderMove, handlePanResponderRelease]
);
```

`PanResponderGestureState` を使って、タップ位置を取得。
その位置と先ほど登録した `wordPositions` を見比べてどの単語の上に指があるかを特定しています。

## 懸念点

現状ユーザーがドラッグを開始すると `wordPositions` 全体でループ処理してしまいます。  
 そのため、極端に単語数が多い場合などはカクカクになってしまいます。  
 なので、表示する単語数に制限をかけたりページごとに分割するたどの対策が必要になります。
