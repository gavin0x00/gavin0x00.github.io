/* .vitepress/theme/index.ts */
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import { watch, h } from 'vue'
import { useRoute } from 'vitepress'
import RecentPosts from './components/RecentPosts.vue'
import TagsPage from './components/TagsPage.vue'
import CustomFooter from './components/CustomFooter.vue'

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在文档页面内容后显示 footer
      'doc-after': () => h(CustomFooter),
      // 在首页和其他非文档页面底部显示 footer
      'layout-bottom': () => {
        const route = useRoute()
        // 如果不是文档布局，显示 footer
        if (route.data.frontmatter?.layout !== 'doc') {
          return h(CustomFooter)
        }
        return null
      }
    })
  },

  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('RecentPosts', RecentPosts)
    app.component('TagsPage', TagsPage)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
} satisfies Theme

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
