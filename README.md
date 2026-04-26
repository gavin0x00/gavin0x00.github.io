# VitePress 项目配置说明

这是一个基于 VitePress 构建的个人博客项目，包含了丰富的样式美化和自动化配置。

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # VitePress 主配置文件
│   │   └── theme/               # 自定义主题
│   │       ├── index.ts         # 主题入口，包含彩虹动画逻辑
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
│   └── index.md                 # 首页
└── package.json
```

## 主要配置

### 1. 自动生成 Sidebar

项目使用 `getSidebarItems()` 函数自动读取目录下的 Markdown 文件并生成侧边栏：

```typescript
// .vitepress/config.mts
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

**使用方式**：
- 在对应目录（如 `/android/`、`/book/`）下添加新的 `.md` 文件
- Sidebar 会自动更新，无需手动配置

### 2. 导航栏配置

```typescript
nav: [
  { text: 'Home', link: '/' },
  { text: 'Android', link: '/android/' },
  { text: 'ReadingList', link: '/book/' },
  { text: 'Examples', link: '/examples/' }
]
```

每个导航项都需要对应目录下有 `index.md` 文件作为入口页。

### 3. 最后更新时间

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

### 4. 大纲配置

```typescript
outline: {
  level: 'deep',  // 显示 h2 和 h3 标题
  label: '目录'
}
```

### 5. 站点地图

```typescript
sitemap: {
  hostname: 'https://gavin0x00.github.io/',
}
```

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
- 阴影效果
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

### 方式一：自动生成（推荐）

1. 在对应目录下创建 `.md` 文件
   ```bash
   # 例如添加 Android 文章
   touch docs/android/新文章.md
   ```

2. Sidebar 会自动更新，无需修改配置

### 方式二：手动配置

如果需要自定义标题或顺序，可以在 `config.mts` 中手动配置：

```typescript
sidebar: {
  '/android/': [
    {
      text: 'Android',
      items: [
        { text: '自定义标题', link: '/android/文件名' }
      ]
    }
  ]
}
```

## 文章 Frontmatter

推荐在文章开头添加 frontmatter：

```markdown
---
layout: doc
outline: deep
---

# 文章标题
```

- `layout: doc`：使用文档布局
- `outline: deep`：显示 h2 和 h3 级别的目录

## Git 提交

文件需要提交到 Git 才能显示"最后更新时间"：

```bash
git add docs/your-file.md
git commit -m "Add new article"
```

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署
3. 访问 `https://gavin0x00.github.io/`

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

## 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [样式美化参考](https://vitepress.yiov.top/style.html)
- [Markdown 扩展语法](https://vitepress.dev/guide/markdown)

## 许可

MIT License
