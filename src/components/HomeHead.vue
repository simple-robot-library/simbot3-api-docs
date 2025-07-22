<template>
  <n-card embedded
          :bordered="false">
    <n-page-header subtitle="探寻你的梦中情档">
      <template #title>
        <n-text style="font-size: 24px;" class="title">Simple Robot</n-text>
      </template>

      <n-menu v-model:value="menuActiveKey"
              mode="horizontal"
              :options="menuOptions"
              bordered
      />

      <template #header>
      </template>

      <template #avatar>
        <n-avatar
            :src="logoSvg"
            color="FFFFFF00"
            :img-props="{draggable: false}"
        />
      </template>
      <template #extra>
        <n-switch :value="themeActive" @update:value="onThemeActiveChange">
          <template #unchecked-icon>
            🔆
          </template>
          <template #checked-icon>
            🌙
          </template>
        </n-switch>

      </template>
    </n-page-header>
  </n-card>
</template>

<script setup lang="ts">
/**
 * 页面头部组件 - Simple Robot 主页头部
 * 包含网站标题、导航菜单、Logo展示和主题切换功能
 */

// Vue 核心功能导入
import {computed, h, reactive, ref} from "vue";

// Naive UI 组件导入
import {MenuOption, NAvatar, NCard, NIcon, NMenu, NPageHeader, NSwitch, NText} from "naive-ui";

// 图标导入
import {HomeSharp, LogoGithub} from "@vicons/ionicons5";

// 资源导入
import logo from '../assets/logo.svg';
import darkLogo from '../assets/logo-dark.svg';

// ==================== 组件属性和事件定义 ====================

/**
 * 组件属性定义
 */
const props = defineProps({
  /** 初始主题激活状态 - true为暗色主题，false为浅色主题 */
  initThemeActiveValue: Boolean
});

/**
 * 组件事件定义
 */
const emit = defineEmits<{
  /** 主题切换事件 - 当用户切换主题时触发 */
  (e: 'themeActiveChange', value: boolean): void
}>();

// ==================== 主题管理 ====================

/**
 * 当前主题激活状态
 * 响应式引用，用于跟踪当前主题状态
 */
const themeActive = ref(props.initThemeActiveValue);

/**
 * 主题切换处理函数
 * 切换主题状态并通知父组件
 */
function onThemeActiveChange() {
  const changeTo = !themeActive.value;
  themeActive.value = changeTo;
  emit('themeActiveChange', changeTo);
}

/**
 * 根据主题状态计算Logo图片
 * 暗色主题使用暗色Logo，浅色主题使用普通Logo
 */
const logoSvg = computed(() => themeActive.value ? darkLogo : logo);

// ==================== 导航菜单配置 ====================

/**
 * 渲染菜单图标的辅助函数
 * @param icon - 图标组件
 * @returns 渲染函数
 */
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * 渲染链接元素的辅助函数
 * @param props - 链接属性
 * @param children - 子元素
 * @returns 链接元素
 */
function renderLink(props?: any, children?: any) {
  return h('a', props, children);
}

/**
 * 渲染链接函数的辅助函数
 * @param props - 链接属性
 * @param children - 子元素
 * @returns 渲染函数
 */
function renderLinkFunc(props?: any, children?: any) {
  return () => renderLink(props, children);
}

/**
 * 当前激活的菜单项
 * 用于菜单高亮显示
 */
const menuActiveKey = ref(null);

/**
 * 导航菜单选项配置
 * 包含官网和GitHub组织库的链接
 */
const menuOptions = reactive<MenuOption[]>([
  {
    label: renderLinkFunc(
      { href: 'https://simbot.forte.love', target: '_blank' }, 
      '官网'
    ),
    key: 'website-home',
    icon: renderIcon(HomeSharp),
  },
  {
    label: renderLinkFunc(
      { href: 'https://github.com/simple-robot', target: '_blank' }, 
      '组织库'
    ),
    key: 'github-home',
    icon: renderIcon(LogoGithub),
  },
]);

</script>

<style scoped>
/* ==================== 页面头部样式 ==================== */

/**
 * 头部卡片容器样式
 * 提供现代化的头部视觉效果
 */
:deep(.n-card) {
  background: linear-gradient(135deg, var(--color-surface) 0%, rgba(140, 144, 255, 0.03) 100%);
  border: 1px solid rgba(140, 144, 255, 0.1);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px);
  transition: all var(--transition-normal);
  overflow: hidden;
  position: relative;
}

/**
 * 头部卡片装饰效果
 * 添加微妙的视觉层次
 */
:deep(.n-card::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary) 0%, rgba(140, 144, 255, 0.5) 50%, var(--color-primary) 100%);
  opacity: 0.8;
}

/**
 * 页面头部容器样式
 * 优化头部布局和间距
 */
:deep(.n-page-header) {
  padding: var(--spacing-xl) var(--spacing-2xl);
  background: transparent;
}

/* ==================== 标题区域样式 ==================== */

:deep(.n-page-header .n-page-header__title .title) {
  background: linear-gradient(135deg, var(--color-primary) 0%, #6366f1 50%, var(--color-primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(140, 144, 255, 0.1);
  transition: all var(--transition-normal);
  position: relative;
}

/**
 * 副标题样式
 * 优化副标题的可读性
 */
:deep(.n-page-header .n-page-header__subtitle) {
  color: var(--color-text-secondary);
  font-size: 1.1em;
  font-weight: 500;
  margin-top: var(--spacing-sm);
  opacity: 0.8;
  transition: opacity var(--transition-fast);
}

:deep(.n-page-header:hover .n-page-header__subtitle) {
  opacity: 1;
}

/* ==================== Logo 样式 ==================== */

/**
 * Logo 头像样式增强
 * 现代化的 Logo 显示效果
 */
:deep(.n-avatar) {
  border: none;
  /*box-shadow: var(--shadow-md);*/
  transition: all var(--transition-normal);
  position: relative;
  overflow: visible;
}

/**
 * Logo 悬停效果
 * 增强交互体验
 */
:deep(.n-avatar:hover) {
  /*box-shadow: var(--shadow-lg);*/
  transform: scale(1.05) rotate(5deg);
}

/**
 * Logo 光晕效果
 * 添加动态光晕
 */
:deep(.n-avatar::after) {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-primary), transparent, var(--color-primary));
  opacity: 0;
  transition: opacity var(--transition-normal);
  z-index: -1;
  animation: rotate 3s linear infinite;
}

:deep(.n-avatar:hover::after) {
  opacity: 0.3;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ==================== 导航菜单样式 ==================== */

/**
 * 导航菜单容器样式
 * 现代化的菜单视觉效果
 */
:deep(.n-menu) {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(140, 144, 255, 0.15);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm);
  margin: var(--spacing-md) 0;
}

/**
 * 菜单项样式增强
 * 优化菜单项的交互效果
 */
:deep(.n-menu .n-menu-item) {
  border-radius: var(--border-radius-md);
  margin: 0 var(--spacing-xs);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

/**
 * 菜单项悬停效果
 * 增强交互反馈
 */
:deep(.n-menu .n-menu-item:hover) {
  background: linear-gradient(135deg, var(--color-primary) 0%, rgba(140, 144, 255, 0.8) 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/**
 * 菜单项图标样式
 * 统一图标的视觉效果
 */
:deep(.n-menu .n-menu-item .n-icon) {
  transition: transform var(--transition-fast);
}

:deep(.n-menu .n-menu-item:hover .n-icon) {
  transform: scale(1.1);
}

/**
 * 菜单项链接样式
 * 优化链接的显示效果
 */
:deep(.n-menu .n-menu-item a) {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

/* ==================== 主题切换开关样式 ==================== */

/**
 * 主题切换开关容器
 * 现代化的开关视觉效果
 */
:deep(.n-switch) {
  /*background: rgba(140, 144, 255, 0.1);*/
  border: none;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
}

/**
 * 开关悬停效果
 * 增强交互体验
 */
:deep(.n-switch:hover) {
  /*box-shadow: var(--shadow-md);*/
  transform: scale(1.05);
}

/**
 * 开关图标样式
 * 主题图标的显示效果
 */
:deep(.n-switch .n-switch__icon) {
  font-size: 1.2em;
  transition: all var(--transition-fast);
}

:deep(.n-switch:hover .n-switch__icon) {
  transform: scale(1.1);
}

/* ==================== 响应式适配 ==================== */

/**
 * 移动设备适配
 * 小屏幕设备的样式调整
 */
@media (max-width: 768px) {
  :deep(.n-page-header) {
    padding: var(--spacing-lg) var(--spacing-xl);
  }
  
  :deep(.n-page-header .n-page-header__title .title) {
    font-size: 1.5em;
  }
  
  :deep(.n-page-header .n-page-header__subtitle) {
    font-size: 1em;
  }
  
  :deep(.n-menu) {
    margin: var(--spacing-sm) 0;
    padding: var(--spacing-xs);
  }
  
  :deep(.n-menu .n-menu-item a) {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9em;
  }
  
  :deep(.n-avatar) {
    width: 48px;
    height: 48px;
  }
}

/**
 * 平板设备适配
 * 中等屏幕设备的样式调整
 */
@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.n-page-header) {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }
  
  :deep(.n-page-header .n-page-header__title .title) {
    font-size: 1.8em;
  }
}

/**
 * 大屏幕设备适配
 * 大屏幕设备的增强效果
 */
@media (min-width: 1025px) {
  :deep(.n-page-header .n-page-header__title .title) {
    font-size: 2em;
  }
  
  :deep(.n-page-header .n-page-header__subtitle) {
    font-size: 1.2em;
  }
  
  :deep(.n-avatar:hover) {
    transform: scale(1.1) rotate(10deg);
  }
}

/* ==================== 动画效果 ==================== */

/**
 * 头部进入动画
 * 页面加载时的动画效果
 */
:deep(.n-card) {
  animation: slideInDown 0.8s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/**
 * 菜单项进入动画
 * 菜单项的渐入动画
 */
:deep(.n-menu .n-menu-item) {
  animation: fadeInLeft 0.6s ease-out;
  animation-fill-mode: both;
}

:deep(.n-menu .n-menu-item:nth-child(1)) { animation-delay: 0.1s; }
:deep(.n-menu .n-menu-item:nth-child(2)) { animation-delay: 0.2s; }

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ==================== 可访问性增强 ==================== */

/**
 * 减少动画偏好适配
 * 为偏好减少动画的用户提供静态体验
 */
@media (prefers-reduced-motion: reduce) {
  :deep(.n-card),
  :deep(.n-avatar),
  :deep(.n-switch),
  :deep(.n-menu .n-menu-item),
  :deep(.n-page-header .n-page-header__title .title) {
    animation: none !important;
    transition: none !important;
  }
  
  :deep(.n-avatar:hover),
  :deep(.n-switch:hover),
  :deep(.n-menu .n-menu-item:hover) {
    transform: none !important;
  }
  
  :deep(.n-avatar::after) {
    animation: none !important;
  }
}

/**
 * 焦点可见性增强
 * 提升键盘导航的可访问性
 */
:deep(.n-switch:focus-visible) {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}

:deep(.n-menu .n-menu-item:focus-within) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/**
 * 高对比度文本增强
 * 确保文本在各种背景下的可读性
 */
:deep(.n-page-header .n-page-header__title .title) {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

:deep(.n-menu .n-menu-item:hover) {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>


