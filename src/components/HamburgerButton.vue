<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'toggle'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('toggle');
};
</script>

<template>
  <button
    class="hamburger-button"
    @click="handleClick"
  >
    <span
      class="hamburger-icon"
      :class="{ 'hamburger-is-open': isOpen }"
    >
      <span class="hamburger-line hamburger-line-1"></span>
      <span class="hamburger-line hamburger-line-2"></span>
      <span class="hamburger-line hamburger-line-3"></span>
    </span>
  </button>
</template>

<style scoped lang="scss">
.hamburger-button {
  --icon-size: var(--hamburger-icon-size, 24px);
  --icon-color: var(--hamburger-icon-color, var(--color-text));

  background: transparent;
  border: none;
  cursor: pointer;
  padding: calc(var(--icon-size) * 0.5);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: var(--icon-size);
  height: var(--icon-size);
  position: relative;
  padding: 10% 0;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.hamburger-is-open {
  .hamburger-line-1 {
    transform: translateX(15%) rotate(45deg);
  }

  .hamburger-line-2 {
    opacity: 0;
  }

  .hamburger-line-3 {
    transform: translateX(15%) rotate(-45deg);
  }
}
</style>
