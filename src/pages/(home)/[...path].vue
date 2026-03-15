<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import doc404 from '@/docs/404.md';
</script>

<template>
  <main class="page">
    <div class="container">
      <MarkdownRenderer
        :content="doc404"
        theme="404"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 36px;
}
</style>
