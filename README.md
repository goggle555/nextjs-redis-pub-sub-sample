# Next.js and Redis Pub/Sub Sample

## 🔧 必要な環境

- Node.js >= 22
- Docker 最新版

## 🚀 セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd nextjs-redis-pub-sub-sample

# 依存関係のインストール
npm install

# 環境変数を作成
cp .env.example .env

# Redisを起動
docker compose up -d

# Next.jsを起動
npm run dev
```

## Pub/Sub によるメッセージの通知

### メッセージを待ち受ける

`/subscribe` にアクセスして`Connect` ボタンをクリックする

### メッセージを送信する

`/publish` にアクセスして `Publish to Redis` ボタンをクリックする
