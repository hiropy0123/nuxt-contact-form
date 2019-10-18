# nuxt-contact-form

## 環境変数の設定  
`app` ディレクトリの中に `.env` ファイルを作成して、以下の項目を環境変数に入れます。  

- WP_REST_API_BASE_URL （WordPressのベースURL）
- WPUSER （アプリケーションパスワードのユーザ名）
- APPLICATION_PASSWORD （アプリケーションパスワード）

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
