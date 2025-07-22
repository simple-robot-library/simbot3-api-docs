<template>
  <n-config-provider :theme="theme">
    <div id="center-body" :data-theme="theme ? 'dark' : 'light'">
      <n-layout position="absolute">
        <n-layout-header bordered>
          <HomeHead @theme-active-change="onThemeActiveChange" :init-theme-active-value="initThemeActiveValue"/>
        </n-layout-header>

        <n-layout position="absolute" style="top: 150px; bottom: 64px" :native-scrollbar="false"
                  :content-style="layoutCenterContentStyle">

          <n-grid cols="8" item-responsive responsive="screen">
            <n-grid-item span="0 m:1 l:1 xl:2"></n-grid-item>
            <n-grid-item span="8 m:6 l:6 xl:4">
              <n-flex vertical>
                <n-collapse :default-expanded-names="[...collapseActions]" @item-header-click="handleItemHeaderClick">
                  <n-card embedded :bordered="false">
                    <n-collapse-item name="组件库">
                      <RepoDocCards/>
                      <template #header>
                        <n-divider title-placement="left" style="user-select: none">
                          <Icon>
                            <BookOutline/>
                          </Icon> &nbsp;
                          <n-text strong style="font-size: 19px" class="sub-text">组件库</n-text>
                        </n-divider>
                        <n-divider title-placement="center">
                          <n-collapse-transition :show="!collapseActions.has('组件库')">
                            <n-text italic depth="3" style="user-select: none; font-size: 18px" class="sub-text">点击展开</n-text>
                          </n-collapse-transition>
                        </n-divider>
                        <n-divider title-placement="right">
                          <n-collapse-transition :show="collapseActions.has('组件库')">
                            <n-text italic depth="3" style="user-select: none; font-size: 13px"  class="sub-text">Javadoc的好朋友</n-text>
                          </n-collapse-transition>
                        </n-divider>
                      </template>
                    </n-collapse-item>
                  </n-card>
                  <n-card embedded :bordered="false">
                    <n-collapse-item name="作品展示">
                      <ShowCards :theme="theme" />
                      <template #header>
                        <n-divider title-placement="left" style="user-select: none">
                          <n-text strong style="font-size: 19px" class="sub-text">作品展示</n-text>
                          <Icon>
                            <HeartOutline/>
                          </Icon>
                        </n-divider>
                        <n-divider title-placement="center">
                          <n-collapse-transition :show="!collapseActions.has('作品展示')">
                            <n-text italic depth="3" style="user-select: none; font-size: 18px" class="sub-text">点击展开</n-text>
                          </n-collapse-transition>
                        </n-divider>
                        <n-divider title-placement="right">
                          <n-collapse-transition :show="collapseActions.has('作品展示')">
                            <n-text italic depth="3" style="user-select: none; font-size: 13px"  class="sub-text">看看大家的好宝贝</n-text>
                          </n-collapse-transition>
                        </n-divider>
                      </template>
                    </n-collapse-item>
                  </n-card>
                </n-collapse>
                <HorizontalAdUnit />
              </n-flex>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:1 xl:2"></n-grid-item>
          </n-grid>

        </n-layout>

        <n-layout-footer
              bordered
              position="absolute"
              style="height: 88px; padding: 24px; text-align: center"
        >
          <HomeFooter/>
        </n-layout-footer>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
/**
 * 主页面组件 - Simple Robot 文档索引页面
 * 提供组件库和作品展示的折叠面板界面，支持主题切换和状态持久化
 */

// 组件导入
import HomeHead from "./HomeHead.vue";
import HomeFooter from "./HomeFooter.vue";
import RepoDocCards from "./RepoDocCards.vue";
import ShowCards from "./show/ShowCards.vue";
import HorizontalAdUnit from "./ad/HorizontalAdUnit.vue";

// Naive UI 组件导入
import {
  CollapseProps,
  darkTheme,
  NCard,
  NCollapse,
  NCollapseItem,
  NCollapseTransition,
  NConfigProvider,
  NDivider,
  NFlex,
  NGrid,
  NGridItem,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NText
} from "naive-ui";

// Vue 核心功能导入
import {reactive, ref} from "vue";

// 类型和图标导入
import {BuiltInGlobalTheme} from "naive-ui/lib/themes/interface";
import {BookOutline, HeartOutline} from '@vicons/ionicons5';
import {Icon} from "@vicons/utils";

// ==================== 布局样式配置 ====================

/**
 * 主内容区域的样式配置
 * 使用响应式设计，支持不同屏幕尺寸的适配
 */
const layoutCenterContentStyle = reactive({
  // 预留的内边距配置，可根据需要启用
  // 'padding-left': '50px',
  // 'padding-right': '50px', 
  // 'padding-top': '50px',
  // 'padding-bottom': '50px',
});

// ==================== 主题管理 ====================

/**
 * 从本地存储获取主题设置
 * 如果存在 'theme_dark' 键，则默认使用暗色主题
 */
const initThemeActiveValue = localStorage.getItem("theme_dark") != null;

/**
 * 当前主题状态
 * null 表示浅色主题，darkTheme 表示暗色主题
 */
const theme = ref<BuiltInGlobalTheme | null>(
  initThemeActiveValue ? darkTheme : null
);

/**
 * 主题切换处理函数
 * @param value - true 表示切换到暗色主题，false 表示切换到浅色主题
 */
function onThemeActiveChange(value: boolean) {
  if (value) {
    // 切换到暗色主题
    theme.value = darkTheme;
    localStorage.setItem("theme_dark", "true");
  } else {
    // 切换到浅色主题
    theme.value = null;
    localStorage.removeItem("theme_dark");
  }
}

// ==================== 折叠面板状态管理 ====================

/**
 * 从本地存储获取折叠面板的展开状态
 */
const initCollapseActionsStorage = localStorage.getItem("collapseActions_items");

/**
 * 初始化折叠面板展开项目列表
 * 默认展开"组件库"面板
 */
let initCollapseActions: Array<string>;

if (initCollapseActionsStorage == null) {
  // 如果本地存储中没有数据，默认展开组件库
  initCollapseActions = ["组件库"];
} else {
  try {
    // 尝试解析本地存储的数据
    const parsed = JSON.parse(initCollapseActionsStorage);
    if (!Array.isArray(parsed)) {
      // 如果数据格式不正确，重置为默认值
      localStorage.removeItem("collapseActions_items");
      initCollapseActions = ["组件库"];
    } else {
      initCollapseActions = parsed;
    }
  } catch (e) {
    // 如果解析失败，重置为默认值
    localStorage.removeItem("collapseActions_items");
    initCollapseActions = ["组件库"];
  }
}

/**
 * 当前展开的折叠面板集合
 * 使用 Set 数据结构便于快速查找和操作
 */
const collapseActions = reactive<Set<string>>(new Set(initCollapseActions));

/**
 * 折叠面板头部点击处理函数
 * 管理面板的展开/收起状态，并将状态持久化到本地存储
 */
const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({ name, expanded }) => {
  if (expanded) {
    // 面板展开时，添加到展开集合中
    collapseActions.add(name);
  } else {
    // 面板收起时，从展开集合中移除
    collapseActions.delete(name);
  }

  // 将当前状态保存到本地存储
  localStorage.setItem("collapseActions_items", JSON.stringify([...collapseActions]));
};

</script>

<style scoped>
/* ==================== 主容器样式 ==================== */

/**
 * 主应用容器
 * 提供居中布局和响应式适配
 */
#center-body {
  margin: 0;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  min-height: 100vh;
}

/* ==================== 布局组件样式 ==================== */

/**
 * 主布局容器
 * 确保全屏布局的正确显示
 */
.main-layout {
  width: 100%;
  height: 100vh;
}

/**
 * 头部区域样式
 * 固定高度，提供清晰的视觉分层
 */
.header-section {
  height: 150px;
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
}

/**
 * 主内容区域样式
 * 动态高度，适应不同内容长度
 */
.content-section {
  top: 150px;
  bottom: 88px;
}

/**
 * 底部区域样式
 * 固定高度和居中对齐
 */
.footer-section {
  height: 88px;
  padding: var(--spacing-lg);
  text-align: center;
  backdrop-filter: blur(10px);
}

/* ==================== 网格和内容样式 ==================== */

/**
 * 主网格容器
 * 提供响应式布局基础
 */
.main-grid {
  height: 100%;
  padding: var(--spacing-md);
}

/**
 * 网格间隔区域
 * 在大屏幕上提供左右边距
 */
.grid-spacer {
  /* 预留空间，无需额外样式 */
}

/**
 * 主要内容区域
 * 包含所有主要内容的容器
 */
.main-content {
  position: relative;
}

/**
 * 内容包装器
 * 提供内容间的合适间距
 */
.content-wrapper {
  padding: var(--spacing-md) 0;
}

/* ==================== 折叠面板样式 ==================== */

/**
 * 主折叠面板容器
 * 提供统一的面板样式
 */
.main-collapse {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

/**
 * 区域卡片样式
 * 每个折叠区域的卡片容器
 */
.section-card {
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.section-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/**
 * 折叠项样式
 * 单个折叠面板的样式
 */
.collapse-item {
  border-radius: var(--border-radius-md);
}

/* ==================== 区域头部样式 ==================== */

/**
 * 区域头部容器
 * 包含标题、图标和描述的容器
 */
.section-header {
  user-select: none;
  padding: var(--spacing-sm) 0;
}

/**
 * 头部内容容器
 * 图标和标题的水平布局
 */
.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/**
 * 区域图标样式
 * 统一的图标大小和颜色
 */
.section-icon {
  font-size: 1.2em;
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

/**
 * 区域标题样式
 * 主要标题的字体和大小
 */
.section-title {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--color-text-primary);
}

/**
 * 展开提示文字样式
 * 折叠状态下的提示文字
 */
.expand-hint {
  font-size: 1.1em;
  color: var(--color-text-secondary);
  user-select: none;
}

/**
 * 区域描述文字样式
 * 展开状态下的描述文字
 */
.section-description {
  font-size: 0.85em;
  color: var(--color-text-secondary);
  user-select: none;
}

/* ==================== 分割线样式 ==================== */

/**
 * 头部分割线样式
 * 左侧标题区域的分割线
 */
.header-divider {
  margin: var(--spacing-xs) 0;
}

/**
 * 中间分割线样式
 * 中间提示区域的分割线
 */
.center-divider {
  margin: var(--spacing-xs) 0;
}

/**
 * 右侧分割线样式
 * 右侧描述区域的分割线
 */
.right-divider {
  margin: var(--spacing-xs) 0;
}

/* ==================== 广告区域样式 ==================== */

/**
 * 广告单元样式
 * 广告内容的容器样式
 */
.ad-section {
  margin-top: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

/* ==================== 响应式适配 ==================== */

/**
 * 移动设备适配
 * 小屏幕设备的样式调整
 */
@media (max-width: 768px) {
  #center-body {
    padding: var(--spacing-md);
  }
  
  .main-grid {
    padding: var(--spacing-sm);
  }
  
  .content-wrapper {
    padding: var(--spacing-sm) 0;
  }
  
  .section-title {
    font-size: 1.1em;
  }
  
  .expand-hint {
    font-size: 1em;
  }
  
  .section-description {
    font-size: 0.8em;
  }
}

/**
 * 平板设备适配
 * 中等屏幕设备的样式调整
 */
@media (min-width: 769px) and (max-width: 1024px) {
  .section-card:hover {
    transform: translateY(-1px);
  }
}

/**
 * 大屏幕设备适配
 * 大屏幕设备的增强效果
 */
@media (min-width: 1025px) {
  .main-collapse {
    box-shadow: var(--shadow-lg);
  }
  
  .section-card:hover {
    transform: translateY(-3px);
  }
}

/* ==================== 动画增强 ==================== */

/**
 * 减少动画偏好适配
 * 为偏好减少动画的用户提供静态体验
 */
@media (prefers-reduced-motion: reduce) {
  .section-card,
  .section-icon,
  .header-section,
  .footer-section {
    transition: none !important;
  }
  
  .section-card:hover {
    transform: none !important;
  }
}
</style>
