<template>
  <n-card embedded
          :bordered="false">
    <n-page-header subtitle="探寻你的梦中情档">
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="正片" value="125 集"/>
        </n-gi>
        <n-gi>
          <n-statistic label="嘉宾" value="22 位"/>
        </n-gi>
        <n-gi>
          <n-statistic label="道歉" value="36 次"/>
        </n-gi>
        <n-gi>
          <n-statistic label="话题" value="83 个"/>
        </n-gi>
        <n-gi>
          <n-statistic label="参考链接" value="2,346 个"/>
        </n-gi>
      </n-grid>
      <template #title>
        <a
            href="https://anyway.fm/"
            style="text-decoration: none; color: inherit"
        >Simple Robot</a>
      </template>

      <template #header>
        HEADER
      </template>

      <template #avatar>
        <n-avatar
            :src="logoImg"
            :style="{
              backgroundColor: 'rgba(255,255,255,0)'
            }"
        />
      </template>
      <template #extra>
        <n-switch :value="themeActive" @change="onThemeActiveChange">
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
import {NAvatar, NCard, NGi, NGrid, NPageHeader, NStatistic, NSwitch} from "naive-ui";
import logoImg from '../assets/logo.png'
import {ref} from "vue";

const emit = defineEmits<{
  (e: 'themeActiveChange', value: boolean): void
}>()

const themeActive = ref(false)


function onThemeActiveChange() {
  const changeTo = !themeActive.value
  themeActive.value = changeTo
  emit('themeActiveChange', changeTo)
}

</script>

<style scoped>

</style>
