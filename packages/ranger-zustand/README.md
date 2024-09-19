# @ranger-theme/mui-hook-form

<p>
  <a href='https://www.npmjs.com/package/@ranger-theme/mui-hook-form'><img src='https://img.shields.io/npm/v/@ranger-theme/mui-hook-form.svg' alt='Latest npm version'></a>
</p>

## 🎉 Introduce

> mui-hook-form工具

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/mui-hook-form)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/mui-hook-form
# or
$ yarn add --save-dev @ranger-theme/mui-hook-form
# or
$ pnpm add --save-dev @ranger-theme/mui-hook-form
```

## 🔨 Usage

```js
import { CopyBoard, CountDown, CsvLink, HeadRoom, InfiniteScroll, Player, Portal, PrintScreen } from '@ranger-theme/mui-hook-form'
```

### nextjs dynimac import
```tsx
import dynamic from 'next/dynamic'

const CsvLink = dynamic(
  import('@ranger-theme/mui-hook-form').then((module) => module.CsvLink),
  {
    ssr: false
  }
)

const MediaQuery = dynamic(
  import('@ranger-theme/mui-hook-form').then((module) => module.MediaQuery),
  {
    ssr: false
  }
)
```

