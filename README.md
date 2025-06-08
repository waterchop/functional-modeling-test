# Functional Modeling Test

このリポジトリは TypeScript を使ったドメイン駆動設計 (DDD) と関数型モデリングを試すための最小構成です。

## 技術スタック

- **言語:** TypeScript
- **ライブラリ:** [Effect](https://www.effect.website/)、[Prisma](https://www.prisma.io/)
- **データベース:** PostgreSQL (Docker Compose で起動)
- **開発環境:** VS Code Dev Container

## 開発方法

VS Code で devcontainer を開くと Node.js と PostgreSQL を備えた環境が立ち上がります。

```bash
# VS Code から devcontainer を起動
```

PostgreSQL サービスは `5432` 番ポートを公開しており、認証情報は以下の通りです。

- ユーザー: `postgres`
- パスワード: `postgres`
- データベース: `app`

## スクリプト

```bash
# TypeScript をビルド
npm run build

# サンプルプログラムを実行
npm start
```
