# @winwin/hexo-editor-client

A Hexo Editor Client by winwin2011

<img src="https://img.shields.io/github/package-json/v/YuJianghao/winwin-hexo-editor-client?style=flat-square">

## Schreenshots

![Main page](https://cdn.yujianghao.cn/uploads/2020/05/22/Id6dz5jj_winwin-hexo-editor-v0.1.7-safari.png)

## Feature

- [x] Post add/delete/update and preview
- [x] Post puiblish/unpublish/drafts
- [x] Markdown editor
- [x] categories
- [x] tags
- [x] git push/reset/pull
- [x] hexo generate/deploy/clean
- [x] Basic authentication
- [x] Post sort
- [x] front-matters
- [x] Search
- [ ] ~~Image CDN~~(use [picgo](https://picgo.github.io/PicGo-Doc/zh/guide/) instead)
- [ ] let me know what you need ...

## Build

Prebulid dist is recommended. See `@winwin/hexo-editor` on [Gitee](https://gitee.com/winwin_2011/winwin-hexo-editor) or [Github](https://github.com/YuJianghao/winwin-hexo-editor)

**Download code and dependences.**

```bash
git clone git@github.com:YuJianghao/winwin-hexo-editor-client.git
npm install -g @quasar/cli
npm install
```

**Build the app with quasar**

```bash
quasar build -m pwa
```

**Develop**

```bash
quasar dev -m pwa
```

## Notice

This project is on early devleopmemt stage, **API may changes everyday you wake up 😜!** I will do my best to keep it working at anytime. If not, please send an issue [here](https://github.com/YuJianghao/winwin-hexo-editor-client/issues).

## Contribute

All kinds of PR are welcomed, including crazy change!

## Acknowledgement

- [hexo-client](https://github.com/gaoyoubo/hexo-client) by [gaoyoubo](https://github.com/gaoyoubo) ([homepage](https://www.mspring.org/tags/HexoClient/)) and [hexo-admin](https://github.com/jaredly/hexo-admin) by [jaredly](https://github.com/jaredly) ([homepage](https://jaredforsyth.com/hexo-admin/)). I learnt a lot about hexo usage from them!

- [gridea - A static blog writing client](https://github.com/getgridea/gridea) ([honepage](https://gridea.dev/)). Gridea shows me how to use monaco editor!

- [Qusar Login Form Card Component](https://gist.github.com/justinatack/39ec7f37064b2e9fa61fbd450cba3826) by [justinatack](https://gist.github.com/justinatack/)

- [koel - A personal music streaming server that works](https://github.com/phanan/koel) ([homepage](https://koel.phanan.net/)). Koel shows me how to use stores to manage data!

## Release Note

### 0.3.0

- Frontmatters支持
- 文章搜索
- Refresh token

### 0.2.2

- 修复不能发布/取消发布的bug

### 0.2.1

- 启用git子模块

### 0.2.0

- 添加右键菜单
- 优化文章/分类/标签数量很大时候的显示效果
- 添加文章排序
- 修改侧栏内容
- 重构底层状态管理
- 优化网站加载速度
- 修复一些bug

### 0.1.8

- 修复不能访问API的严重bug

### 0.1.7

- remove hard code, use auto api address

### 0.1.6

- add pwa support
- update app icon
- show server address QRCode
- fix auth bugs