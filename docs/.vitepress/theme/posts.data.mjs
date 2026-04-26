// .vitepress/theme/posts.data.mjs
import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter((page) => {
        // 排除首页、索引页和没有 date 的页面
        const isIndexPage = page.url.endsWith('/') || page.url === '/' || page.url.includes('index')
        const hasDate = page.frontmatter?.date
        return !isIndexPage && hasDate
      })
      .map((page) => {
        // 从 frontmatter 或文件内容中提取标题
        const title = page.frontmatter?.title ||
                     extractTitle(page.src) ||
                     page.url.split('/').pop()?.replace('.html', '') ||
                     'Untitled'

        return {
          title,
          url: page.url,
          date: page.frontmatter.date,
          tags: page.frontmatter.tags || [],
          excerpt: page.frontmatter.description || page.excerpt || ''
        }
      })
      .sort((a, b) => {
        // 按日期降序排序
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }
})

// 从 markdown 内容中提取第一个 h1 标题
function extractTitle(src) {
  if (!src) return null
  const match = src.match(/^#\s+(.+)$/m)
  return match ? match[1] : null
}
