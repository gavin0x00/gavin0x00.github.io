<script setup lang="ts">
import { data } from '../posts.data.mjs'

interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
}

// 获取最近更新的 10 篇文章
const recentPosts = (data as Post[]).slice(0, 10)

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<template>
  <div class="recent-posts">
    <ul>
      <li v-for="post in recentPosts" :key="post.url">
        <div class="post-info">
          <a :href="post.url" class="post-title">{{ post.title }}</a>
          <div class="tags" v-if="post.tags && post.tags.length > 0">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <span class="date">{{ formatDate(post.date) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.recent-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-posts li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.recent-posts li:last-child {
  border-bottom: none;
}

.post-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.post-title {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.post-title:hover {
  color: var(--vp-c-brand-2);
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  color: var(--vp-c-text-2);
  font-size: 12px;
  padding: 2px 8px;
  background-color: var(--vp-c-default-soft);
  border-radius: 4px;
}

.date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin-left: 16px;
  white-space: nowrap;
}
</style>
