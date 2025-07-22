<script setup lang="ts">
/**
 * 作品展示卡片组件 - Simple Robot 实例展示
 * 展示基于Simple Robot框架开发的实际机器人应用案例
 */

// Naive UI 组件导入
import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace, NTag} from "naive-ui";

// ==================== 类型定义 ====================

/**
 * 标签配置接口
 */
interface TagConfig {
  name: string;
  type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
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
 * 展示卡片数据接口
 */
interface ShowCard {
  name: string;
  tags: TagConfig[];
  description: string;
  images?: string[];
  links: LinkConfig[][];
}

// ==================== 展示案例数据 ====================

/**
 * 机器人实例展示数据
 * 包含各平台上运行的法欧莉机器人实例
 */
const componentCards: ShowCard[] = [
  {
    name: "QQ频道法欧莉",
    tags: [
      { name: "QQ频道", type: "info" }, 
      { name: "BOT实例", type: "info" }, 
      { name: "法欧莉", type: "success" }
    ],
    description: "<p>法欧莉，占领QQ频道！</p><p>快使用QQ扫描下面的图片把法欧莉添加到你的频道中吧~</p>",
    images: [
      "img/qq-guild-forliy-qrcode.jpg"
    ],
    links: [
      [{ 
        name: "点击邀请法欧莉", 
        href: "https://qun.qq.com/qunpro/robot/share?robot_appid=101986850", 
        type: "info" 
      }],
    ]
  },
  {
    name: "KOOK法欧莉",
    tags: [
      { name: "KOOK", type: "info" }, 
      { name: "BOT实例", type: "info" }, 
      { name: "法欧莉", type: "success" }
    ],
    description: `
      <p>法欧莉，占领KOOK！</p>
      <p>快点击下方的按钮把法欧莉添加到你的KOOK中吧~</p>
    `,
    links: [
      [{ 
        name: "点击邀请法欧莉", 
        href: "https://www.kookapp.cn/app/oauth2/authorize?id=10250&permissions=536870911&client_id=jqdlyHK85xe1i5Bo&redirect_uri=&scope=bot", 
        type: "info" 
      }]
    ]
  },
  
  // 注释掉的大别野法欧莉实例（已停用）
  // {
  //   name: "大别野法欧莉",
  //   tags: [
  //     { name: "大别野", type: "info" }, 
  //     { name: "BOT实例", type: "info" }, 
  //     { name: "法欧莉", type: "success" }
  //   ],
  //   description: `
  //     <p>法欧莉，占领大别野！</p>
  //     <p>快扫描下方的二维码添加大别野、寻找法欧莉并将她添加到你的大别野中吧~</p>
  //     <p>当然，直接去机器人市场也可以遇到她喔！</p>
  //   `,
  //   images: [
  //     "img/villa-forliy-qrcode.png"
  //   ],
  //   links: [
  //     [{ 
  //       name: "点击进入大别野", 
  //       href: "https://dby.miyoushe.com/chat/6272/113235", 
  //       type: "info" 
  //     }]
  //   ]
  // }
];

</script>

<template>
  <div>
    <n-grid x-gap="24" y-gap="18" cols="1 s:2 m:2 l:2 xl:3 2xl:4" responsive="screen">
      <n-gi v-for="componentCard in componentCards">
        <n-card hoverable :content-style="{'min-height': '160px'}">
          <template #header>
            <n-text class="title">{{ componentCard.name }}</n-text>
          </template>


          <n-space size="small">
            <n-tag v-for="componentTag in componentCard.tags" :type="componentTag.type" size="small" round>
              {{ componentTag.name }}
            </n-tag>
          </n-space>

          <n-p v-html="componentCard.description"></n-p>

          <n-image-group show-toolbar-tooltip show-toolbar>
            <n-space size="small" align="center">
              <n-image lazy :preview-src="img" width="200" v-for="img in componentCard.images" :src="img"/>
            </n-space>
          </n-image-group>

          <template #action>
            <n-grid cols="1" style="text-align: center; min-height: 60px">
              <n-gi v-for="componentLinks in componentCard.links">
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

<style scoped>
/* ==================== 作品展示卡片样式 ==================== */

/**
 * 主容器样式
 * 提供基础的容器布局
 */
.show-cards-container {
  padding: var(--spacing-md);
}

/**
 * 网格容器样式
 * 响应式网格布局，适配不同屏幕尺寸
 */
:deep(.n-grid) {
  gap: var(--spacing-lg);
}

/**
 * 卡片样式增强
 * 提供现代化的卡片视觉效果
 */
:deep(.n-card) {
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  position: relative;
}

/**
 * 卡片悬停效果
 * 增强交互体验
 */
:deep(.n-card:hover) {
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px) scale(1.02);
  border-color: var(--color-primary);
}

/**
 * 卡片头部样式
 * 统一的头部视觉效果
 */
:deep(.n-card .n-card-header) {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, rgba(140, 144, 255, 0.8) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

/**
 * 卡片头部装饰效果
 * 添加视觉层次感
 */
:deep(.n-card .n-card-header::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="90" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/**
 * 卡片内容区域样式
 * 优化内容布局和间距
 */
:deep(.n-card .n-card__content) {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  min-height: 200px;
}

/**
 * 卡片操作区域样式
 * 底部操作按钮区域
 */
:deep(.n-card .n-card__action) {
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--color-border-light);
  border-top: 1px solid var(--color-border);
}

/* ==================== 标题样式 ==================== */

/**
 * 卡片标题样式
 * 增强标题的视觉层次
 */
:deep(.n-card .n-card-header .title) {
  font-size: 1.4em;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

/* ==================== 标签样式 ==================== */

/**
 * 标签容器样式
 * 标签组的布局和间距
 */
:deep(.n-space) {
  margin: var(--spacing-md) 0;
  flex-wrap: wrap;
}

/**
 * 标签样式增强
 * 现代化的标签视觉效果
 */
:deep(.n-tag) {
  font-weight: 600;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.9em;
  border: none;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
}

:deep(.n-tag:hover) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* ==================== 描述文本样式 ==================== */

/**
 * 描述段落样式
 * 优化文本可读性
 */
:deep(.n-p) {
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: var(--spacing-md) 0;
  font-size: 1.05em;
}

/**
 * 描述中的段落样式
 * 内容段落的视觉效果
 */
:deep(.n-p p) {
  margin: var(--spacing-sm) 0;
  padding: 0;
}

/* ==================== 图片样式 ==================== */

/**
 * 图片容器样式
 * 图片展示区域的布局
 */
:deep(.n-image-group) {
  margin: var(--spacing-lg) 0;
}

/**
 * 图片样式增强
 * 现代化的图片显示效果
 */
:deep(.n-image) {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

:deep(.n-image:hover) {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

:deep(.n-image img) {
  border-radius: var(--border-radius-lg);
  transition: transform var(--transition-normal);
}

/* ==================== 按钮样式 ==================== */

/**
 * 操作按钮样式增强
 * 现代化的按钮视觉效果
 */
:deep(.n-button) {
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  font-size: 1.05em;
  padding: var(--spacing-md) var(--spacing-xl);
  transition: all var(--transition-normal);
  margin: var(--spacing-sm);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

/**
 * 按钮悬停效果
 * 增强交互反馈
 */
:deep(.n-button:hover) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/**
 * 按钮点击效果
 * 提供触觉反馈
 */
:deep(.n-button:active) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/**
 * 按钮容器网格样式
 * 操作按钮的布局优化
 */
:deep(.n-grid[cols="1"]) {
  gap: var(--spacing-md);
  min-height: 80px;
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
  .show-cards-container {
    padding: var(--spacing-sm);
  }
  
  :deep(.n-grid) {
    gap: var(--spacing-md);
  }
  
  :deep(.n-card .n-card-header) {
    padding: var(--spacing-lg);
  }
  
  :deep(.n-card .n-card__content) {
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
    min-height: 160px;
  }
  
  :deep(.n-card .n-card__action) {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  :deep(.n-card .n-card-header .title) {
    font-size: 1.2em;
  }
  
  :deep(.n-button) {
    font-size: 1em;
    padding: var(--spacing-sm) var(--spacing-lg);
  }
  
  :deep(.n-image) {
    max-width: 100%;
  }
}

/**
 * 平板设备适配
 * 中等屏幕设备的样式调整
 */
@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.n-card:hover) {
    transform: translateY(-4px) scale(1.01);
  }
  
  :deep(.n-card .n-card-header .title) {
    font-size: 1.3em;
  }
}

/**
 * 大屏幕设备适配
 * 大屏幕设备的增强效果
 */
@media (min-width: 1025px) {
  :deep(.n-card:hover) {
    transform: translateY(-8px) scale(1.03);
  }
  
  :deep(.n-card .n-card-header .title) {
    font-size: 1.5em;
  }
  
  :deep(.n-button) {
    font-size: 1.1em;
  }
}

/* ==================== 动画和过渡效果 ==================== */

/**
 * 卡片进入动画
 * 页面加载时的动画效果
 */
:deep(.n-grid-item) {
  animation: fadeInScale 0.8s ease-out;
  animation-fill-mode: both;
}

:deep(.n-grid-item:nth-child(1)) { animation-delay: 0.2s; }
:deep(.n-grid-item:nth-child(2)) { animation-delay: 0.4s; }
:deep(.n-grid-item:nth-child(3)) { animation-delay: 0.6s; }

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/**
 * 标签动画效果
 * 标签的渐入动画
 */
:deep(.n-tag) {
  animation: slideInRight 0.6s ease-out;
  animation-fill-mode: both;
}

:deep(.n-tag:nth-child(1)) { animation-delay: 0.1s; }
:deep(.n-tag:nth-child(2)) { animation-delay: 0.2s; }
:deep(.n-tag:nth-child(3)) { animation-delay: 0.3s; }

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
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
  :deep(.n-button),
  :deep(.n-image),
  :deep(.n-tag),
  :deep(.n-grid-item) {
    transition: none !important;
    animation: none !important;
  }
  
  :deep(.n-card:hover),
  :deep(.n-button:hover),
  :deep(.n-image:hover),
  :deep(.n-tag:hover) {
    transform: none !important;
  }
}

/**
 * 焦点可见性增强
 * 提升键盘导航的可访问性
 */
:deep(.n-button:focus-visible) {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}

:deep(.n-card:focus-within) {
  box-shadow: 0 0 0 3px var(--color-primary);
}

/**
 * 图片加载状态
 * 优化图片加载体验
 */
:deep(.n-image[data-loading="true"]) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
