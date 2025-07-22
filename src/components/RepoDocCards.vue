<template>
  <div>
    <n-grid x-gap="12" y-gap="14" cols="1 s:2 m:2 l:3 xl:4 2xl:5" responsive="screen">
      <n-gi v-for="card in componentCards">
        <n-card hoverable :content-style="{'min-height': '160px'}">
          <template #header>
            <div v-if="card.deprecated">
              <s><n-text class="title">{{ card.name }}</n-text></s>
            </div>
            <div v-else>
              <n-text class="title">{{ card.name }}</n-text>
            </div>
          </template>

          <n-image-group>
            <n-space size="small">
              <component v-for="{component, props} in card.shields" :is="component" v-bind="props" />
            </n-space>
          </n-image-group>

          <n-space size="small">
            <UnifiedTag 
              v-for="tag in card.tags" 
              :key="tag.name"
              :name="tag.name"
              :type="tag.type"
              :allow-html="true"
            />
          </n-space>


          <n-p v-html="card.description"></n-p>

          <template #action>
            <n-grid cols="1" style="text-align: center; min-height: 120px">
              <n-gi v-for="componentLinks in card.links">
                <n-a v-for="componentLink in componentLinks" :href="componentLink.href" target="_blank">
                  <n-button quaternary :type="componentLink.type">
                    {{ componentLink.name }}
                  </n-button>
                </n-a>
              </n-gi>
            </n-grid>
          </template>

        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>


<script setup lang="ts">
/**
 * 仓库文档卡片组件 - Simple Robot 组件库展示
 * 展示各种机器人组件的信息，包括核心库和各平台组件
 */

// Vue 核心功能导入
import {computed} from "vue";

// Naive UI 组件导入
import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace} from "naive-ui";

// 统一标签组件导入
import UnifiedTag from "./common/UnifiedTag.vue";

// 数据导入
import repoDocCardsData from "../data/repo-doc-cards.json";

// ==================== 类型定义 ====================

/**
 * 组件标签配置接口
 */
interface TagConfig {
  name: string;
  type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  round?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * 徽章配置接口
 */
interface ShieldConfig {
  src: string;
  alt: string;
  previewDisabled?: boolean;
}

/**
 * 链接配置接口
 */
interface LinkConfig {
  name: string;
  href: string;
  type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
}

/**
 * 组件卡片数据接口
 */
interface ComponentCard {
  id: string;
  name: string;
  tags: TagConfig[];
  shields: ReturnType<typeof Shield>[];
  description: string;
  links: LinkConfig[][];
  deprecated?: boolean;
  deprecatedReason?: string;
}

// ==================== 辅助函数 ====================


/**
 * 创建徽章组件配置
 * @param props - 徽章属性配置
 * @returns 徽章组件配置对象
 */
function Shield(props: ShieldConfig) {
  return {
    component: NImage,
    props: {
      previewDisabled: props.previewDisabled ?? true,
      lazy: true,
      ...props,
    }
  };
}

// ==================== 预定义标签 ====================

/**
 * 预定义标签映射
 * 从外部JSON文件加载，提供统一的标签管理
 */
const predefinedTags = computed<Record<string, TagConfig>>(() => {
  return repoDocCardsData.predefinedTags as Record<string, TagConfig>;
});

/**
 * 组件卡片数据
 * 从外部JSON文件加载，支持灵活配置和标签引用
 */
const componentCards = computed<ComponentCard[]>(() => {
  const tags = predefinedTags.value;
  
  // 处理活跃卡片
  const processCard = (card: any): ComponentCard => ({
    id: card.id,
    name: card.name,
    tags: card.tags.map((tagKey: string) => tags[tagKey]).filter(Boolean),
    shields: card.shields.map((shield: any) => Shield(shield)),
    description: card.description,
    links: card.links,
    deprecated: card.deprecated,
    deprecatedReason: card.deprecatedReason
  });
  
  const allCards = [...repoDocCardsData.cards.map(processCard)];
  
  // 可以根据需要决定是否显示已废弃的卡片
  // 目前只显示活跃的卡片，如需显示废弃卡片可以取消下面的注释
  // allCards.push(...repoDocCardsData.deprecatedCards.map(processCard));
  
  return allCards;
});


</script>


<style scoped>
/* ==================== 组件库卡片样式 ==================== */

/**
 * 主容器样式
 * 提供基础的容器布局
 */
.repo-cards-container {
  padding: var(--spacing-md);
}

/**
 * 网格容器样式
 * 响应式网格布局，适配不同屏幕尺寸
 */
:deep(.n-grid) {
  gap: var(--spacing-md);
}

/**
 * 卡片样式增强
 * 提供现代化的卡片视觉效果
 */
:deep(.n-card) {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

/**
 * 卡片悬停效果
 * 增强交互体验
 */
:deep(.n-card:hover) {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

/**
 * 卡片头部样式
 * 统一的头部视觉效果
 */
:deep(.n-card .n-card-header) {
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-surface) 0%, rgba(140, 144, 255, 0.05) 100%);
  border-bottom: 1px solid var(--color-border);
}

/**
 * 卡片内容区域样式
 * 优化内容布局和间距
 */
:deep(.n-card .n-card__content) {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/**
 * 卡片操作区域样式
 * 底部操作按钮区域
 */
:deep(.n-card .n-card__action) {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-border-light);
  border-top: 1px solid var(--color-border);
}

/* ==================== 标题样式 ==================== */

/**
 * 卡片标题样式
 * 增强标题的视觉层次
 */
:deep(.n-card .n-card-header .title) {
  font-size: 1.25em;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
}

/**
 * 废弃组件标题样式
 * 为废弃的组件提供特殊样式
 */
:deep(.n-card .n-card-header .title s) {
  color: var(--color-text-secondary);
  opacity: 0.7;
}

/* ==================== 标签和徽章样式 ==================== */

/**
 * 标签容器样式
 * 标签组的布局和间距
 */
:deep(.n-space) {
  margin: var(--spacing-sm) 0;
}

/**
 * 标签样式增强
 * 现代化的标签视觉效果
 */
:deep(.n-tag) {
  font-weight: 500;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85em;
  border: none;
  box-shadow: var(--shadow-sm);
}

/**
 * 徽章图片样式
 * GitHub徽章的显示优化
 */
:deep(.n-image img) {
  border-radius: var(--border-radius-sm);
  transition: transform var(--transition-fast);
}

:deep(.n-image:hover img) {
  transform: scale(1.05);
}

/* ==================== 描述文本样式 ==================== */

/**
 * 描述段落样式
 * 优化文本可读性
 */
:deep(.n-p) {
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: var(--spacing-sm) 0;
}

/**
 * 描述中的链接样式
 * 内联链接的视觉效果
 */
:deep(.n-p a) {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast);
}

:deep(.n-p a:hover) {
  border-bottom-color: var(--color-primary);
}

/* ==================== 按钮样式 ==================== */

/**
 * 操作按钮样式增强
 * 现代化的按钮视觉效果
 */
:deep(.n-button) {
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: all var(--transition-fast);
  margin: var(--spacing-xs);
  box-shadow: var(--shadow-sm);
}

:deep(.n-button:hover) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/**
 * 按钮容器网格样式
 * 操作按钮的布局优化
 */
:deep(.n-grid[cols="1"]) {
  gap: var(--spacing-sm);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* ==================== 响应式适配 ==================== */

/**
 * 移动设备适配
 * 小屏幕设备的样式调整
 */
@media (max-width: 768px) {
  .repo-cards-container {
    padding: var(--spacing-sm);
  }
  
  :deep(.n-card .n-card-header) {
    padding: var(--spacing-md);
  }
  
  :deep(.n-card .n-card__content) {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
  }
  
  :deep(.n-card .n-card__action) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  :deep(.n-card .n-card-header .title) {
    font-size: 1.1em;
  }
  
  :deep(.n-grid[cols="1"]) {
    min-height: 100px;
  }
}

/**
 * 平板设备适配
 * 中等屏幕设备的样式调整
 */
@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.n-card:hover) {
    transform: translateY(-2px);
  }
}

/**
 * 大屏幕设备适配
 * 大屏幕设备的增强效果
 */
@media (min-width: 1025px) {
  :deep(.n-card:hover) {
    transform: translateY(-6px);
  }
  
  :deep(.n-card .n-card-header .title) {
    font-size: 1.3em;
  }
}

/* ==================== 动画和过渡效果 ==================== */

/**
 * 卡片进入动画
 * 页面加载时的动画效果
 */
:deep(.n-grid-item) {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

:deep(.n-grid-item:nth-child(1)) { animation-delay: 0.1s; }
:deep(.n-grid-item:nth-child(2)) { animation-delay: 0.2s; }
:deep(.n-grid-item:nth-child(3)) { animation-delay: 0.3s; }
:deep(.n-grid-item:nth-child(4)) { animation-delay: 0.4s; }
:deep(.n-grid-item:nth-child(5)) { animation-delay: 0.5s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== 可访问性增强 ==================== */

/**
 * 减少动画偏好适配
 * 为偏好减少动画的用户提供静态体验
 */
@media (prefers-reduced-motion: reduce) {
  :deep(.n-card),
  :deep(.n-button),
  :deep(.n-image img),
  :deep(.n-grid-item) {
    transition: none !important;
    animation: none !important;
  }
  
  :deep(.n-card:hover),
  :deep(.n-button:hover) {
    transform: none !important;
  }
}

/**
 * 焦点可见性增强
 * 提升键盘导航的可访问性
 */
:deep(.n-button:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

:deep(.n-card:focus-within) {
  box-shadow: 0 0 0 2px var(--color-primary);
}
</style>
