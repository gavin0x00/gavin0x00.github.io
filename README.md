# VitePress 个人博客

[![VitePress](https://img.shields.io/badge/VitePress-1.5.0-646CFF?logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=github)](https://gavin0x00.github.io/)

这是一个基于 VitePress 构建的个人博客项目，包含了丰富的样式美化和自动化配置。

**在线访问**: [https://gavin0x00.github.io/](https://gavin0x00.github.io/)

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # VitePress 主配置文件
│   │   └── theme/               # 自定义主题
│   │       ├── index.ts         # 主题入口，包含彩虹动画逻辑
│   │       ├── posts.data.mjs   # 文章数据加载器
│   │       ├── components/      # 自定义组件
│   │       │   ├── RecentPosts.vue   # 最近更新组件
│   │       │   ├── TagsPage.vue      # 标签页面组件
│   │       │   └── CustomFooter.vue  # 自定义 Footer
│   │       └── style/           # 样式文件
│   │           ├── index.css    # 主样式入口
│   │           ├── var.css      # 主题色和变量
│   │           ├── rainbow.css  # 彩虹背景动画
│   │           ├── blockquote.css    # 引用样式
│   │           ├── custom-block.css  # 容器颜色
│   │           ├── blur.css     # 毛玻璃效果
│   │           ├── hidden.css   # 隐藏横条
│   │           ├── vp-code.css  # 代码块样式
│   │           └── vp-code-group.css # 代码组样式
│   ├── android/                 # Android 相关文章
│   │   ├── index.md
│   │   ├── AIDL.md
│   │   └── Light.md
│   ├── book/                    # 阅读笔记
│   │   ├── index.md
│   │   └── 三体全集.md
│   ├── examples/                # 示例文档
│   │   ├── index.md
│   │   ├── markdown-examples.md
│   │   └── api-examples.md
│   ├── tags.md                  # 标签页面
│   └── index.md                 # 首页
└── package.json
```

## 主要功能

### 1. 自动化文章管理

#### 自动生成 Sidebar
使用 `getSidebarItems()` 函数自动读取目录下的 Markdown 文件并生成侧边栏：

```typescript
function getSidebarItems(dir: string) {
  const files = readdirSync(join(__dirname, '..', dir))
  return files
    .filter((file: string) => file.endsWith('.md') && file !== 'index.md')
    .map((file: string) => ({
      text: file.replace('.md', ''),
      link: `${dir}${file.replace('.md', '')}`
    }))
}
```

**使用方式**：在对应目录（如 `/android/`、`/book/`）下添加新的 `.md` 文件，Sidebar 会自动更新。

#### 自动生成最近更新列表
通过 VitePress 的 Data Loader API 自动读取所有文章的 frontmatter，按日期排序显示最近 10 篇文章。

**实现文件**：
- `posts.data.mjs` - 数据加载器，自动扫描所有文章
- `RecentPosts.vue` - 显示组件

### 2. 标签系统

完整的标签分类系统，支持：
- 标签云展示（显示每个标签的文章数量）
- 点击标签筛选文章
- 标签页面：`/tags`

**使用方式**：在文章 frontmatter 中添加 `tags` 字段即可。

### 3. 写作流程

写新文章时，只需在 frontmatter 中添加以下信息：

```markdown
---
title: 文章标题
date: 2024-04-27
tags: [标签1, 标签2, 标签3]
description: 文章简介（可选）
---

# 文章内容...
```

系统会自动：
- ✅ 在首页"最近更新"中显示
- ✅ 在标签页面中按标签分类
- ✅ 按日期排序
- ✅ 在 Sidebar 中显示

**无需手动维护任何列表或索引！**

## 配置说明

### 导航栏

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: 'Android', link: '/android/' },
  { text: '阅读笔记', link: '/book/' },
  { text: '标签', link: '/tags' },
  { text: 'VitePress示例', link: '/examples/' }
]
```

每个导航项都需要对应目录下有 `index.md` 文件作为入口页。

### 最后更新时间

```typescript
lastUpdated: true,
themeConfig: {
  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  }
}
```

**注意**：文件必须被 Git 跟踪才能显示更新时间。

### 大纲配置

```typescript
outline: {
  level: 'deep',  // 显示 h2 和 h3 标题
  label: '目录'
}
```

### Footer

自定义 Footer 显示在所有页面：
- 文档页面：通过 `doc-after` 插槽
- 首页和标签页：通过 `layout-bottom` 插槽
- 内容：版权信息 + VitePress 链接

## 样式美化

### 主题色

- 浅色模式：绿色系 (#18794e, #299764, #30a46c)
- 深色模式：亮绿色系 (#3dd68c, #30a46c, #298459)

### 特色功能

#### 1. 彩虹背景动画
- 仅在首页显示
- 12 秒循环渐变动画
- Hero 标题和背景图都有彩虹效果

#### 2. H1 标题渐变色
```css
.VPDoc h1 {
  background: -webkit-linear-gradient(10deg, #bd34fe 5%, #e43498 15%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### 3. 特性卡片悬浮效果
鼠标悬停时卡片会向上移动 5px

#### 4. 毛玻璃效果
- 导航栏
- 搜索框
- 侧边栏顶部
- 移动端大纲栏

#### 5. macOS 风格代码块
- 三个彩色小圆点（红、黄、绿）
- 柔和阴影效果
- 适用于代码块和代码组

#### 6. 容器颜色美化
- `tip`：绿色
- `warning`：橙色
- `danger`：红色
- `info`：灰色

#### 7. 引用块样式
- 圆角边框
- 左侧绿色竖线
- 柔和背景色

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 添加新文章

### 步骤

1. 在对应目录下创建 `.md` 文件
   ```bash
   # 例如添加 Android 文章
   touch docs/android/新文章.md
   ```

2. 添加 frontmatter
   ```markdown
   ---
   title: 文章标题
   date: 2024-04-27
   tags: [Android, 技术]
   description: 文章简介
   ---
   
   # 文章标题
   
   文章内容...
   ```

3. 提交到 Git（用于显示更新时间）
   ```bash
   git add docs/android/新文章.md
   git commit -m "Add new article"
   ```

就这么简单！系统会自动处理其他所有事情。

## 文章 Frontmatter 字段

| 字段 | 必需 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期（YYYY-MM-DD） |
| `tags` | 是 | 标签数组 |
| `description` | 否 | 文章简介 |
| `layout` | 否 | 布局类型（默认 doc） |
| `outline` | 否 | 大纲配置（默认 deep） |

## 部署

### GitHub Pages

项目配置了 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署
3. 访问 [https://gavin0x00.github.io/](https://gavin0x00.github.io/)

### 手动部署

```bash
# 构建
npm run docs:build

# 部署到 GitHub Pages
# 构建产物在 docs/.vitepress/dist 目录
```

## 依赖

- VitePress: 1.5.0
- Node.js: 需要 18+ 版本
- @types/node: 用于 TypeScript 类型支持

## 自定义样式

如需添加更多自定义样式：

1. 在 `.vitepress/theme/style/` 下创建新的 CSS 文件
2. 在 `index.css` 中引入：
   ```css
   @import './your-custom.css';
   ```

## 注意事项

1. **中文文件名**：支持中文文件名，但 URL 会被编码
2. **图片路径**：建议使用相对路径或放在 `public` 目录
3. **回到顶部按钮**：
   - PC 端：集成在右侧 outline 中
   - 移动端：独立显示在 outline 菜单里
4. **彩虹动画性能**：仅在首页启用，避免影响其他页面性能
5. **Git 提交**：文章需要提交到 Git 才能显示"最后更新时间"

## 技术栈

- **框架**: VitePress 1.5.0
- **语言**: TypeScript, Vue 3
- **样式**: CSS Variables (支持深色模式)
- **构建**: Vite
- **部署**: GitHub Pages + GitHub Actions

## 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [样式美化参考](https://vitepress.yiov.top/style.html)
- [Markdown 扩展语法](https://vitepress.dev/guide/markdown)

## 徽章生成

项目使用了 [Shields.io](https://shields.io/) 生成徽章。

### 徽章格式

```
https://img.shields.io/badge/<label>-<message>-<color>
```

- `label`: 标签（左侧文字）
- `message`: 消息（右侧文字）
- `color`: 颜色（支持颜色名或十六进制）

### 常用徽章示例

**基础徽章**：
```markdown
![](https://img.shields.io/badge/VitePress-1.5.0-646CFF)
```

**带 Logo 的徽章**：
```markdown
![](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
```

**可点击的徽章**：
```markdown
[![](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `style` | 样式风格 | `flat`, `flat-square`, `for-the-badge` |
| `logo` | Logo 图标 | `vue.js`, `github`, `typescript` |
| `logoColor` | Logo 颜色 | `white`, `black`, `#FF0000` |
| `label` | 自定义标签 | `label=自定义` |
| `labelColor` | 标签背景色 | `labelColor=red` |

### Logo 图标资源

- [Simple Icons](https://simpleicons.org/) - 2000+ 品牌图标
- 在徽章中使用 `logo=图标名` 即可

### 更多徽章类型

**GitHub 相关**：
```markdown
![Stars](https://img.shields.io/github/stars/gavin0x00/vitepress?style=social)
![Forks](https://img.shields.io/github/forks/gavin0x00/vitepress?style=social)
![Issues](https://img.shields.io/github/issues/gavin0x00/vitepress)
```

**构建状态**（需要配置 CI/CD）：
```markdown
![Build](https://img.shields.io/github/actions/workflow/status/gavin0x00/vitepress/deploy.yml)
```

**其他工具**：
- [Badgen](https://badgen.net/) - 另一个徽章生成工具
- [For the Badge](https://forthebadge.com/) - 有趣的徽章样式

## 许可

MIT License - 详见 [LICENSE](LICENSE) 文件

Copyright (c) 2026 Gavin0x00

---

**在线访问**: [https://gavin0x00.github.io/](https://gavin0x00.github.io/)
