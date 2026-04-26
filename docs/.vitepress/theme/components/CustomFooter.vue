<template>
  <div class="custom-footer">
    <p class="message">
      Powered by <a href="https://vitepress.dev/" target="_blank" rel="noopener noreferrer">VitePress</a>
    </p>
    <p class="copyright">© 2026 Gavin0x00. All rights reserved.</p>
  </div>
</template>

<style scoped>
.custom-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px;
  text-align: center;
  background-color: var(--vp-c-bg);
}

.message {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 8px 0;
}

.message a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.message a:hover {
  color: var(--vp-c-brand-2);
}

.copyright {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
