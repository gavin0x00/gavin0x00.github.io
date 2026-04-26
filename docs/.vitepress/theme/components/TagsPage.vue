<script setup lang="ts">
import { data } from '../posts.data.mjs'
import { computed } from 'vue'

interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
}

const posts = data as Post[]

// 统计所有标签及其文章数量
const tagStats = computed(() => {
  const stats = new Map<string, number>()
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      stats.set(tag, (stats.get(tag) || 0) + 1)
    })
  })
  return Array.from(stats.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 当前选中的标签
import { ref } from 'vue'
const selectedTag = ref<string | null>(null)

// 根据标签筛选文章
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(post => post.tags?.includes(selectedTag.value!))
})

// 选择标签
const selectTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
}
</script>

<template>
  <div class="tags-page">
    <!-- 标签云 -->
    <div class="tags-cloud">
      <h2>标签</h2>
      <div class="tags">
        <button
          v-for="{ tag, count } in tagStats"
          :key="tag"
          :class="['tag', { active: selectedTag === tag }]"
          @click="selectTag(tag)"
        >
          {{ tag }} <span class="count">{{ count }}</span>
        </button>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="posts-list">
      <h2 v-if="selectedTag">
        标签: {{ selectedTag }} <span class="total">({{ filteredPosts.length }} 篇)</span>
      </h2>
      <h2 v-else>
        所有文章 <span class="total">({{ posts.length }} 篇)</span>
      </h2>

      <div class="posts">
        <article v-for="post in filteredPosts" :key="post.url" class="post">
          <a :href="post.url" class="post-title">{{ post.title }}</a>
          <div class="post-meta">
            <div class="tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <span class="date">{{ formatDate(post.date) }}</span>
          </div>
          <p v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.tags-cloud {
  margin-bottom: 48px;
}

.tags-cloud h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tags button.tag {
  padding: 8px 16px;
  background-color: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.tags button.tag:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tags button.tag.active {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.tags button.tag .count {
  margin-left: 4px;
  opacity: 0.7;
}

.posts-list h2 {
  font-size: 24px;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
}

.posts-list h2 .total {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s;
}

.post:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  display: block;
  margin-bottom: 12px;
}

.post-title:hover {
  color: var(--vp-c-brand-2);
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.post-meta .tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.post-meta .tag {
  font-size: 12px;
  padding: 2px 8px;
  background-color: var(--vp-c-default-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.post-meta .date {
  font-size: 13px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.excerpt {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>
