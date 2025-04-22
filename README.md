# youtubeチャンネル検索リポジトリ

youtubeチャンネルを検索できるwebサイト

# 開発環境整備

## 前提条件

vscode/docker/gitがインストール済みであること  
vscodeは拡張機能dev containerをインストール済みであること

## ソースコードの取得

```
gh repo clone sugar2456/youtube-channel-visualization
```

## コンテナの立ち上げ

プロジェクトのルートでvscodeを立ち上げる

```
cd youtube-channel-visualization
code .
```

vscodeの拡張機能dev containerの機能で「コンテナを再度開く」を選択して、開発コンテナを開く

## サーバの立ち上げ

開発サーバを立ち上げる

```
npm run dev
```

本番ビルドでサーバを立ち上げる

```
npm run build
npm run start
```

## テストコード

単体テストコードとコンポーネントテストが実施される

```
npm run test
```

end-to-endのテストが実施される

```
# あらかじめ開発サーバを起動
npm run dev
# 新しくコンソールを立ち上げて、テストを実施
npx playwright test
```

# バージョン情報

- Next 15.2.4
- React 19.0.0
- Node 23
- typescript 5.8.3
