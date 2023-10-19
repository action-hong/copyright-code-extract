# @kkopite/cce 

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

软著源代码文件doc生成

## 安装

```bash
npm i -g @kkopite/cce
```

## 使用

```bash
cd path/to/project

cce
```
## 配置

在你的项目根目录下，创建文件`cce.config.js`:

```js
export default {
  // 每一个文档有几页
  page: 30,
  // 每一页有50行代码
  preLine: 50,
  // 输出的docx文件，软著都是要求前三十页和后三十页
  output: [
    './前30页代码.docx',
    './后30页代码.docx',
  ],
  // 可以添加的代码文件
  include: '**/*.{ts,tsx,js,jsx,vue}',
  // 要忽略的文件
  ignore: [
    '**/{node_modules,dist,build,test,.git,public,mock}/**',
    '**.config.*',
  ],
}
```

> 以上各个配置为默认值，可以自行修改，如只需要默认文件则可以不添加配置文件

## License

[MIT](./LICENSE) License © 2023-PRESENT [kkopite](https://github.com/action-hong)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kkopite/cce?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@kkopite/cce
[npm-downloads-src]: https://img.shields.io/npm/dm/@kkopite/cce?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@kkopite/cce
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@kkopite/cce?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@kkopite/cce
[license-src]: https://img.shields.io/github/license/action-hong/copyright-code-extract.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/action-hong/copyright-code-extract/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@kkopite/cce