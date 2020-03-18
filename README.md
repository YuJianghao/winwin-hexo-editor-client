# @winwin/hexo-editor-client

A Hexo Editor Client by winwin2011

<img src="https://img.shields.io/npm/v/@winwin/hexo-editor-client?style=flat-square">

## Schreenshots

[Please visit @winwin/hexo-editor homePage](https://yujianghao.github.io/winwin-hexo-editor/)

![Main page](https://cdn.yujianghao.cn/Zc8QgOwVQQrsmCVp.png)

## Feature

- [x] Post add/delete/update and preview
- [x] Post puiblish/unpublish/drafts
- [x] Markdown editor
- [x] categories
- [x] tags
- [x] git push/reset/pull
- [x] hexo generate/deploy/clean
- [x] Basic authentication
- [ ] front-matters
- [ ] Post sort
- [ ] Search
- [ ] ~~Image CDN~~(use [picgo](https://picgo.github.io/PicGo-Doc/zh/guide/) instead)
- [ ] let me know what you need ...

## Installation

1. Prebulid version is recommended. See [@winwin/hexo-editor HomePage](https://yujianghao.github.io/winwin-hexo-editor/)
2. If you want to modify it, you need to implement koa server with middleware from [@winwin/hexo-editor-server](https://github.com/YuJianghao/winwin-hexo-editor-server).
3. Or build your own client with [@winwin/hexo-editor-sdk](https://github.com/YuJianghao/winwin-hexo-editor-sdk)

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

Download throuth npm.

```bash
npm i @winwin/hexo-editor-client
mv ./node_modules/@winwin/hexo-editor-client ./src
npm install
```

Add hexo-editor-client to your `.gitignore`.

```.gitignore
# ...
hexo-editor-client
```

Use `./hexo-editor-client/src/pages/Hexo.vue` as common Vue page component.

Mount `./hexo-editor-client/src/store/hexo` as vuex module with name `hexo`, **NAME IS IMPORTANT**. If you want to use another module name you may have to change source files.

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

This project use `./.env` as env file for dev and prod. You need to setup as follow

```.env
# you can change these values base on your server address and routes
HEXO_SERVER_ROOT='http://localhost:5777'
HEXO_SERVER_BASE='/hexoeditorserver'
```

## Notice

This project is on early devleopmemt stage, **API may changes everyday you wake up 😜!** I will do my best to keep it working at anytime. If not, please send an issue [here](https://github.com/YuJianghao/winwin-hexo-editor-client/issues).

## Contribute

All kinds of PR are welcomed, including crazy change!

## Acknowledgement

[hexo-client](https://github.com/gaoyoubo/hexo-client) by [gaoyoubo](https://github.com/gaoyoubo), [homepage](https://www.mspring.org/tags/HexoClient/)

[hexo-admin](https://github.com/jaredly/hexo-admin) by [jaredly](https://github.com/jaredly), [homepage](https://jaredforsyth.com/hexo-admin/)

I learnt a lot about hexo usage from them!

[Qusar Login Form Card Component](https://gist.github.com/justinatack/39ec7f37064b2e9fa61fbd450cba3826) by [justinatack](https://gist.github.com/justinatack/)
