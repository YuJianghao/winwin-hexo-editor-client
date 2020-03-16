# Hexo Editor (hexo-editor-client)

A Hexo Editor App

<img src="https://img.shields.io/npm/v/@winwin/hexo-editor-client?style=flat-square">

## Schreenshots

![Main page](https://cdn.yujianghao.cn/Zc8QgOwVQQrsmCVp.png)

![Veiwer page](https://cdn.yujianghao.cn/oFx7MikzVUog2lwo.png)

![Editor page](https://cdn.yujianghao.cn/g3sZvj9aH5Pp7GXj.png)

![Select categories and tags](https://cdn.yujianghao.cn/8jvJJevkdzXe4J6g.png)

## Feature

- [x] Post editing and preview
- [x] Drafts support
- [x] Categories and tags support
- [x] Publish/Unpublish post
- [x] Deploy blog
- [x] Git push and pull
- [x] Markdown editor
- [ ] Front-matter support
- [ ] Post sort
- ~~[ ] Image CDN support~~
- [ ] let me know what you need ...

## Installation

### Use as a stand alone web app

```bash
git clone git@github.com:YuJianghao/winwin-hexo-editor-client.git

npm install
```

Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

Lint the files

```bash
npm run lint
```

Build the app for production

```bash
quasar build
```

Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Use as a Quasar & Vue Page Component

```bash
npm i @winwin/hexo-editor-client
mv ./node_modules/@winwin/hexo-editor-client ./src
npm install
```

```.gitignore
# add to .gitignore
hexo-editor-client
```

Use `./hexo-editor-client/src/pages/Hexo.vue` as common Vue page component.

Mount `./hexo-editor-client/src/store/hexo` at vuex module with name `hexo`, **NAME IS IMPORTANT**. If you want to use another module name you may have to change source files.

I know it's some kind of hack to quasar. But other than me, nobody will use this as a Vue Page Component :p.

```js
// ./src/store/index.js
import hexo from '../hexo-editor-client/src/store/hexo'
// ...
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // ...
    modules: {
      // ...
      hexo // must mount as submoudle named `hexo`
    },
    // ...
  })
  return Store
}

```

### Configure .env file

This project use `./.env.development` and `./.env.producation`. You need to setup as follow

```.env
# you can change these values base on your server address and routes
HEXO_SERVER_ROOT='http://localhost:3000'
HEXO_SERVER_BASE='/hexo'
```

## Notice

This project is on early devleopmemt stage and has a priority on personal use, so **API may changes everyday you wake up 😜!**

## Contribute

All kinds of PR are welcomed, including crazy change!
