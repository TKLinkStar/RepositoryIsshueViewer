# NAME (リポジトリ/Issueビューア)
リポジトリ検索、Issue閲覧を行うことのできるページです。

 
# Features
 
1. リポジトリ閲覧機能
 * 公開リポジトリ検索
 * トピック名検索(公開リポジトリ検索の追加機能)
 * readme検索(公開リポジトリ検索の追加機能)
 * イシュー閲覧機能へ遷移
 * 検索結果の表示、ページ遷移機能（追加読み込みボタンを押すことで検索結果を追加読み込みする機能の,改善追加機能）
 
2. イシュー閲覧機能
 * 検索結果の表示、ページ遷移機能(特定のレポジトリに紐づくイシューのタイトルをリスト表示する（最新10件）の機能追加)
 * 該当イシューページへの遷移(追加機能)

# Requirement
 
* next.js v20.11.1
* apollo/client
* tailwind
 
# Installation
.env.localの中のNEXT_PUBLIC_GITHUB=
のあとに

https://github.com/settings/tokens/new

で発行したトークンを貼り付けてください。(公開リポジトリのみを検索する場合、特に権限の設定は必要ありません。)

Next.js、Appollo Clientをインストールし、クローンした階層でコンパイルを行ってください。
 
```bash
npm ci
npx next build
```

create-next-appを実行時にtailwindを導入してください。
 
# Usage
 
ソースコードをコンパイル、実行し該当ページへアクセスしてください(デフォルトではhttp://localhost:3000/)
```bash
npx next start
```
 
# Note
 実際のコードの動作は以下のURLで確認できます。
 
http://testdd.yyfc.space:5922/
 
# Author
 
 
* 渡邉俊樹
* E-mail : tklinkstar@gmail.com
 
# License
 
"リポジトリ/Issueビューア" is Confidential.