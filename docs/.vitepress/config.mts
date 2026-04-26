import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getSidebarItems(dir: string) {
  const files = readdirSync(join(__dirname, '..', dir))
  return files
    .filter((file: string) => file.endsWith('.md') && file !== 'index.md')
    .map((file: string) => ({
      text: file.replace('.md', ''),
      link: `${dir}${file.replace('.md', '')}`
    }))
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gavin0x00's Blog",
  description: "Follow your heart",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    outline: {
      level: 'deep', // 或者 [2, 3]
      label: '目录' // 自定义标题
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Android', link: '/android/' },
      { text: 'ReadingList', link: '/book/' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: {
      '/android/': [
        {
          text: 'Android',
          items: getSidebarItems('/android/')
        }
      ],
      '/book/': [
        {
          text: 'ReadingList',
          items: getSidebarItems('/book/')
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: getSidebarItems('/examples/')
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gavin0x00' }
    ],

    // 站点地图
    sitemap: {
      hostname: 'https://gavin0x00.github.io/',
    },
    returnToTopLabel:'返回顶部'
  }
})
