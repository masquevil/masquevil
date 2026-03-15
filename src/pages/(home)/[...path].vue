<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import doc404 from '@/docs/404.md';

const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <main class="page">
    <div class="container">
      <MarkdownRenderer
        :content="doc404"
        theme="404"
      />
      <div class="row-footer">
        <div>👀 要不要</div>
        <div><a :href="baseUrl">回到首页</a></div>
        <div>试试寻找已经存在的我？</div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 36px;
}
.row-footer {
  text-align: center;
}
</style>
