<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { getDocByName } from '@/utils';

const route = useRoute<'/role/[[role]]'>();

const doc = ref<string | null>(null);
const doc404 = ref('');

onMounted(async () => {
  const [docContent, doc404Content] = await Promise.all([
    getDocByName(route.params.role ?? '404'),
    getDocByName('404'),
  ]);
  doc.value = docContent;
  doc404.value = doc404Content ?? '';
});
</script>

<template>
  <main class="page">
    <div class="container">
      <MarkdownRenderer
        v-if="doc"
        :content="doc"
      />
      <MarkdownRenderer
        v-else
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
