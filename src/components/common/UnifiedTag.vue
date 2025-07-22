<template>
  <n-tag
      :type="type"
      size="small"
      round
      v-bind="$attrs"
  >
    <span v-if="allowHtml" v-html="name"></span>
    <span v-else>{{ name }}</span>
  </n-tag>
</template>

<script setup lang="ts">
/**
 * 统一标签组件 - UnifiedTag
 * 基于"作品展示"中的Tag样式，提供统一的标签显示效果
 * 特点：小尺寸(small)、圆角(round)、支持多种类型和HTML内容
 */

import {NTag} from "naive-ui";

// ==================== 类型定义 ====================

/**
 * 标签类型枚举
 */
type TagType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';

/**
 * 组件属性接口
 */
interface Props {
  /** 标签显示的名称/内容 */
  name: string;
  /** 标签类型，决定颜色主题 */
  type?: TagType;
  /** 是否允许HTML内容（用于支持富文本标签） */
  allowHtml?: boolean;
}

// ==================== 属性定义 ====================

/**
 * 组件属性，设置默认值
 */
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  allowHtml: false
});

// 继承所有未声明的属性，允许传递给底层的 n-tag 组件
defineOptions({
  inheritAttrs: false
});
</script>

<style scoped>
/**
 * 统一标签样式
 * 基于"作品展示"的设计规范，确保视觉一致性
 */

/* 标签基础样式已由 naive-ui 的 n-tag 组件提供 */
/* size="small" 和 round 属性确保了与"作品展示"一致的外观 */

/**
 * 如果需要额外的自定义样式，可以在这里添加
 * 例如：特殊的间距、动画效果等
 */
</style>
