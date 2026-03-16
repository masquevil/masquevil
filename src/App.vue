<script setup lang="ts">
import { RouterView } from 'vue-router';
import FixedHeader from '@/components/FixedHeader.vue';
</script>

<template>
  <FixedHeader />
  <div class="page-wrapper">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding-top: var(--root-header-height, 60px);
}

@media (max-width: 768px) {
  .page-wrapper {
    padding-top: 0;
  }
}
</style>
