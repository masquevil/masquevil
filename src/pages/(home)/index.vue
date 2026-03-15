<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import docBasic from '@/docs/basic.md';
</script>

<template>
  <main class="page">
    <div class="container">
      <MarkdownRenderer :content="docBasic" />
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
