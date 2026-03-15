<script setup lang="ts">
import { computed } from 'vue';
import useMdParser from '../hooks/useMdParser';

interface Props {
  content: string;
  theme?: '404';
}

interface Emits {}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();

const { parse } = useMdParser();

const html = computed(() => parse(props.content));
</script>

<template>
  <div
    class="markdown-renderer"
    :class="{ 'theme-404': props.theme === '404' }"
    v-html="html"
  ></div>
</template>

<style scoped lang="scss">
.markdown-renderer {
  --color-title: var(--color-heading);
  --color-title-small: var(--color-text);
  --color-p: var(--color-text);

  color: var(--color-p);

  :deep(.md-h1) {
    color: var(--color-title);
    margin: 20px 0;
    font-size: 40px;
    font-weight: 600;
    text-align: center;
  }

  :deep(.md-h2) {
    color: var(--color-title);
    margin: 20px 0;
    font-size: 28px;
    font-weight: 600;
  }

  :deep(.md-h3) {
    color: var(--color-title);
    margin: 12px 0;
    font-size: 20px;
    font-weight: 600;
  }

  :deep(.md-h4) {
    color: var(--color-title-small);
    margin: 12px 0 6px;
    font-size: 16px;
    font-weight: 500;
  }

  :deep(.md-p) {
    font-size: 16px;
    margin-bottom: 12px;
    // text-indent: 1.4em;
    line-height: 1.6;
  }

  :deep(.md-hr) {
    margin: 24px 0;
    border: none;
    border-top: 1px solid var(--color-border);
  }

  :deep(.md-strong) {
    font-weight: 600;
    color: var(--color-title);
  }

  :deep(.md-ul),
  :deep(.md-ol) {
    margin: 12px 0;
    padding-inline-start: 24px;
  }
}

.theme-404 {
  text-align: center;

  :deep(.md-h1) {
    font-size: 120px;
    line-height: 1;
    margin-bottom: 40px;
  }

  :deep(.md-p) {
    line-height: 2;
    margin-bottom: 24px;
  }
}
</style>

<style lang="scss">
.md-validity-tag {
  display: block;
  margin: -8px auto;
  padding: 4px 12px;
  width: fit-content;
  color: #9286ab;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
}
</style>
