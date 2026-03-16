<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { getDocByName } from '@/utils';
import doc404 from '@/docs/404.md';

const route = useRoute<'/role/[[role]]'>();

const inited = ref(false);
const doc = ref<string | null>(null);

watch(
  () => route.params.role,
  async (newRole) => {
    if (!newRole) return;
    doc.value = await getDocByName(newRole);
    inited.value = true;
  },
  { immediate: true },
);
</script>

<template>
  <main class="page">
    <div class="container">
      <div
        v-if="!inited"
        class="loading"
      >
        <div class="loading-spinner">正在寻找侠小然...</div>
      </div>
      <MarkdownRenderer
        v-else-if="doc"
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  font-size: 20px;
  background: repeating-linear-gradient(
    135deg,
    hsl(240, 100%, 90%) 0%,
    hsl(240, 50%, 70%) 15%,
    hsl(240, 60%, 60%) 65%,
    hsl(240, 100%, 90%) 80%,
    hsl(240, 100%, 90%) 100%
  );
  color: transparent;
  background-clip: text;
  background-repeat: repeat;
  background-size: 200% 100%;
  animation: gradient-flow 1.5s linear infinite;
}

@keyframes gradient-flow {
  0% {
    background-position: 200% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
