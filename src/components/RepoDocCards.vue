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

// Naive UI 组件导入
import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace} from "naive-ui";

// 统一标签组件导入
import UnifiedTag from "./common/UnifiedTag.vue";

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
  name: string;
  tags: TagConfig[];
  shields: ReturnType<typeof Shield>[];
  description: string;
  links: LinkConfig[][];
  deprecated?: boolean;
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
      ...props,
    }
  };
}

// ==================== 预定义标签 ====================

/** 官方标签 - 标识官方维护的组件 */
const officialTag: TagConfig = { name: 'Official', type: 'info' };

/** 核心标签 - 标识核心库组件 */
const coreTag: TagConfig = { name: '核心', type: 'info' };

/** 组件标签 - 标识组件库类型 */
const componentTag: TagConfig = { name: "组件", type: "success" };

/** 开发中标签 - 标识正在开发的组件 */
const WIPTag: TagConfig = { name: '<b>🚧WIP</b>', type: 'warning' };

/** 期待协助标签 - 标识需要社区帮助的组件 */
const helpWanted: TagConfig = { name: '<b>🤝期待协助</b>', type: 'success' };

/** 已废弃标签 - 标识不再维护的组件 */
const deadTag: TagConfig = { name: '<b>💀阵亡</b>', type: 'error' };

const componentCards: ComponentCard[] = [
  {
    name: "核心库",
    tags: [officialTag, coreTag],
    shields: [
      Shield({ src: "https://img.shields.io/github/v/release/simple-robot/simpler-robot?label=version", alt: "核心库" }),
    ],
    description: "核心库是组件库的基础，也是绝大多数基本API存在的地方。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simpler-robot", type: "info"}],
      [
        {name: "API文档", href: "main-v4/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/main-v4/", type: "primary"},
      ],
      [{name: "🍀官网", href: "https://simbot.forte.love/", type: "default"}],
    ]
  },

  {
    name: "QQ机器人组件",
    tags: [officialTag, componentTag],
    shields: [
      Shield({
        src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-qq-guild?label=version",
        alt: "QQ机器人组件"
      }),
    ],
    description: "QQ机器人组件基于核心库对 <a href='https://bot.q.qq.com/wiki'>QQ机器人官方API</a> 进行实现，提供强大的QQ机器人平台功能。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-qq-guild", type: "info"}],
      [
        {name: "API文档", href: "components/qq-guild/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/components/qq-guild/", type: "primary"}
      ],
      [{name: "前往手册", href: "https://simbot.forte.love/component-qq-guild.html", type: "default"}],
    ]
  },
  {
    name: "OneBot组件",
    tags: [officialTag, componentTag],
    shields: [
      Shield({
        src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-onebot?label=version",
        alt: "OneBot组件"
      }),
    ],
    description: "OneBot组件基于核心库对 <a href='https://github.com/botuniverse/onebot-11'>OneBot11协议</a> 进行实现，提供强大的OneBot客户端功能。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-onebot", type: "info"}],
      [
        {name: "API文档", href: "components/onebot/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/components/onebot/", type: "primary"}
      ],
      // [{name: "前往手册", href: "https://simple-robot.github.io/simbot-component-onebot", type: "default"}],
      [{name: "前往手册", href: "https://simbot.forte.love/component-onebot.html", type: "default"}],
    ]
  },
  {
    name: "KOOK组件",
    tags: [officialTag, componentTag],
    shields: [
      Shield({
        src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-kook?label=version",
        alt: "KOOK组件"
      }),
    ],

    description: "KOOK组件基于核心库对 <a href='https://developer.kookapp.cn/doc/reference'>KOOK机器人</a> 进行实现，提供强大的KOOK机器人平台功能。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-kook", type: "info"}],
      [
        {name: "API文档", href: "components/kook/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/components/kook/", type: "primary"},
      ],
      [{name: "前往手册", href: "https://simbot.forte.love/component-kook.html", type: "default"}],
    ]
  },
  {
    name: "Telegram组件",
    tags: [WIPTag, helpWanted, officialTag, componentTag],
    shields: [
      Shield({
        src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-telegram?label=version",
        alt: "Telegram组件"
      }),
    ],
    description: "Telegram组件基于核心库对 <a href='https://core.telegram.org/bots/api'>Telegram Bot</a> 进行实现，提供强大的Telegram机器人平台功能。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-telegram", type: "info"}],
      [
        {name: "API文档", href: "components/telegram/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/components/telegram/", type: "primary"}
      ],
      [{name: "前往手册", href: "https://simbot.forte.love/component-telegram.html", type: "default"}],
    ]
  },
  {
    name: "Discord组件",
    tags: [WIPTag, helpWanted, officialTag, componentTag],
    shields: [
      Shield({
        src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-discord?label=version",
        alt: "Discord组件"
      }),
    ],
    description: "Discord组件基于核心库对 <a href='https://discord.com/developers/docs/intro'>Discord Bot</a> 进行实现，提供强大的Discord机器人平台功能。",
    links: [
      [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-discord", type: "info"}],
      [
        {name: "API文档", href: "components/discord/", type: "primary"},
        {name: "API文档(快照)", href: "snapshots/components/discord/", type: "primary"}
      ],
      [{name: "前往手册", href: "https://simbot.forte.love/component-discord.html", type: "default"}],
    ]
  },
  // {
  //   name: "mirai组件",
  //   deprecated: true,
  //   tags: [Tag({ name: '⚠濒死', type: 'warning', round: false }), officialTag, componentTag],
  //   shields: [
  //     Shield({
  //       // src: "https://img.shields.io/maven-central/v/love.forte.simbot.component/simbot-component-mirai-core?&label=version",
  //       src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-mirai?label=version",
  //       alt: "mirai组件"
  //     }),
  //   ],
  //   description: "Mirai组件基于核心库对 <a href='https://github.com/mamoe/mirai'>mirai框架</a> 进行实现，提供强大的QQ机器人平台功能。",
  //   links: [
  //     [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-mirai", type: "info"}],
  //     [
  //       {name: "API文档", href: "components/mirai/", type: "primary"},
  //       {name: "API文档(快照)", href: "snapshots/components/mirai/", type: "primary"},
  //     ],
  //     [{name: "前往手册", href: "https://simple-robot.github.io/simbot-component-mirai", type: "default"}],
  //   ]
  // },
  // {
  //   name: "米游社大别野组件",
  //   tags: [deadTag, officialTag, componentTag],
  //   deprecated: true,
  //   shields: [
  //     Shield({
  //       src: "https://img.shields.io/github/v/release/simple-robot/simbot-component-miyoushe-villa?label=version",
  //       alt: "米游社大别野组件"
  //     }),
  //   ],
  //   description: "米游社大别野组件基于核心库对 <a href='https://open.miyoushe.com/'>米游社大别野机器人</a> 进行实现，提供强大的米游社大别野机器人平台功能。",
  //   links: [
  //     [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-miyoushe-villa", type: "info"}],
  //     [
  //       {name: "API文档", href: "components/miyoushe-villa/", type: "primary"},
  //       {name: "API文档(快照)", href: "snapshots/components/miyoushe-villa/", type: "primary"}
  //     ],
  //     [{name: "前往手册", href: "https://simple-robot.github.io/simbot-component-miyoushe-villa/", type: "default"}],
  //   ]
  // },

]

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
