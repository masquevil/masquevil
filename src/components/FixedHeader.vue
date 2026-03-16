<script setup lang="ts">
import { ref } from 'vue';
import HamburgerButton from './HamburgerButton.vue';

const isMobileMenuOpen = ref(false);

// Tab 数据结构
const tabs = [
  {
    name: '你的朋友',
    children: ['大龄二次元', '居家调酒师'],
  },
  {
    name: '你的伙伴',
    children: ['前端工程师', '江浙沪地陪'],
  },
];

// 当前 hover 的 tab 索引（桌面端）
const hoveredTabIndex = ref<number | null>(null);

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="header-container header-container-wide">
      <div class="header-content">
        <router-link
          to="/"
          class="header-banner"
        >
          <span class="banner-text">侠小然是谁？</span>
        </router-link>

        <nav class="menu-desktop">
          <div
            v-for="(tab, index) in tabs"
            :key="tab.name"
            class="menu-item"
            @mouseenter="hoveredTabIndex = index"
            @mouseleave="hoveredTabIndex = null"
          >
            <span class="menu-title">{{ tab.name }}</span>
            <transition name="header-tab-dropdown">
              <div
                v-if="hoveredTabIndex === index"
                class="menu-desktop-dropdown"
              >
                <router-link
                  v-for="child in tab.children"
                  :key="child"
                  :to="`/role/${child}`"
                  class="menu-desktop-dropdown-item"
                  @click="hoveredTabIndex = null"
                >
                  {{ child }}
                </router-link>
              </div>
            </transition>
          </div>
        </nav>
      </div>
    </div>

    <div class="hamburger-button-wrapper">
      <HamburgerButton
        :is-open="isMobileMenuOpen"
        @toggle="toggleMobileMenu"
      />
    </div>

    <!-- Backdrop -->
    <div
      v-if="isMobileMenuOpen"
      class="menu-backdrop"
      @click="closeMobileMenu"
    ></div>

    <div
      class="header-container header-container-compact"
      :class="{ 'is-showing': isMobileMenuOpen }"
    >
      <div class="header-content">
        <a
          href="/"
          class="header-banner"
        >
          <span class="banner-text">侠小然是谁？</span>
        </a>
        <!-- 移动端 Tab List（纵向平铺） -->
        <nav class="menu-mobile">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="menu-mobile-section"
          >
            <div class="menu-mobile-section-title">{{ tab.name }}</div>
            <router-link
              v-for="child in tab.children"
              :key="child"
              :to="`/role/${child}`"
              class="menu-mobile-section-item"
              @click="closeMobileMenu"
            >
              {{ child }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  // CSS 变量定义
  --header-height: var(--root-header-height, 60px);
  --header-blur: blur(8px);
  --header-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --header-transition-speed: 0.3s;
  --color-bg: var(--root-header-color-bg, rgba(0, 0, 0, 0.9));
  --color-action-active: rgba(255, 255, 255, 0.05);
}

.hamburger-button-wrapper {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(12, 8, 12, 0.5);
  z-index: 999;
}

// frame layout
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--color-bg);
  backdrop-filter: var(--header-blur);
  display: flex;
  gap: 48px;
}
.header-container-wide {
  height: var(--header-height);
  width: 100%;
}
.header-container-compact {
  left: -100%;
  width: fit-content;
  max-width: 300px;
  height: 100vh;
  padding: 60px 0 24px;
  transition: left var(--header-transition-speed) ease;
  overflow-y: auto;
}
.header-content {
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: stretch;
  gap: 48px;

  .header-container-compact & {
    flex-direction: column;
    padding: 0 20px;
  }
}

// banner
.header-banner {
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;

  .header-container-wide & {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header-container-compact & {
    padding-right: 20px;
    font-size: 24px;
  }
}
.header-banner:hover {
  opacity: 0.8;
}
.banner-text {
  font-weight: 600;
  color: var(--color-heading);
}

// desktop menu
.menu-desktop {
  display: flex;
  gap: 16px;
}
.menu-item {
  position: relative;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.menu-title {
  font-size: 16px;
  color: var(--color-text);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.menu-desktop-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(12, 8, 12, 0.96);
  backdrop-filter: var(--header-blur);
  border-radius: 0 0 8px 8px;
  min-width: 120px;
  box-shadow: var(--header-shadow);
  overflow: hidden;
}
.menu-desktop-dropdown-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-action-active);
  }
}

// mobile tab list
.menu-mobile {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.menu-mobile-section-title {
  margin-bottom: 12px;
  padding: 0 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-secondary-text);
}
.menu-mobile-section-item {
  display: block;
  padding: 8px 16px;
  font-size: 16px;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.menu-mobile-section-item:hover {
  background-color: var(--color-action-active);
}

// 移动端响应式样式
@media (max-width: 768px) {
  .hamburger-button-wrapper {
    display: block;
  }

  .header-container-wide {
    display: none;
  }

  .header-container-compact.is-showing {
    left: 0;
  }
}

// 下拉菜单过渡动画
.header-tab-dropdown-enter-active,
.header-tab-dropdown-leave-active {
  transition: all 0.2s ease;
}

.header-tab-dropdown-enter-from,
.header-tab-dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
</style>
