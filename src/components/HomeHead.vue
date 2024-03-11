<template>
  <n-card embedded
          :bordered="false">
    <n-page-header subtitle="探寻你的梦中情档">
      <template #title>
        <n-text>Simple Robot</n-text>
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
import {computed, h, reactive, ref} from "vue";
import {MenuOption, NAvatar, NCard, NIcon, NMenu, NPageHeader, NSwitch, NText} from "naive-ui";
import {HomeSharp, LogoGithub} from "@vicons/ionicons5";
import logo from '../assets/logo.svg';
import darkLogo from '../assets/logo-dark.svg';

const props = defineProps({
    initThemeActiveValue: Boolean
})

const emit = defineEmits<{
  (e: 'themeActiveChange', value: boolean): void
}>()

const themeActive = ref(props.initThemeActiveValue)

function onThemeActiveChange() {
  const changeTo = !themeActive.value
  themeActive.value = changeTo
  emit('themeActiveChange', changeTo)
}
const logoSvg = computed(() => themeActive.value ? darkLogo : logo)

// menu

function renderIcon(icon: any) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

function renderLink(props?: any, children?: any) {
  return h('a', props, children)
}

function renderLinkFunc(props?: any, children?: any) {
  return () => renderLink(props, children)
}

const menuActiveKey = ref(null)
const menuOptions = reactive<MenuOption[]>([
  {
    label: renderLinkFunc({href: 'https://simbot.forte.love', target: '_blank'}, '官网'),
    key: 'website-home',
    icon: renderIcon(HomeSharp),
  },
  {
    label: renderLinkFunc({href: 'https://github.com/simple-robot', target: '_blank'}, '组织库'),
    key: 'github-home',
    icon: renderIcon(LogoGithub),
  },
])

</script>


