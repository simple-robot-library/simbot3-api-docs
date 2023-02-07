<template>
  <n-config-provider :theme="theme">
    <div id="center-body">
      <n-layout position="absolute">
        <n-layout-header bordered>
          <HomeHead @theme-active-change="onThemeActiveChange"/>
        </n-layout-header>
        <n-layout position="absolute" style="top: 200px; bottom: 64px" :native-scrollbar="false"
                  :content-style="layoutCenterContentStyle">
          <RepoDocCards/>
        </n-layout>
        <n-layout-footer
            bordered
            position="absolute"
            style="height: 64px; padding: 24px"
        >
          © Copyright ForteScarlet
        </n-layout-footer>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import HomeHead from "./HomeHead.vue";
import {darkTheme, NConfigProvider, NLayout, NLayoutFooter, NLayoutHeader} from "naive-ui";
import {reactive, ref} from "vue";
import RepoDocCards from "./RepoDocCards.vue";
import {BuiltInGlobalTheme} from "naive-ui/lib/themes/interface";


const layoutCenterContentStyle = reactive({
  'padding-left': '50px',
  'padding-right': '50px',
  'padding-top': '50px',
  'padding-bottom': '50px',
})

const theme = ref<BuiltInGlobalTheme | null>(null)

function onThemeActiveChange(value: boolean) {
  if (value) {
    theme.value = darkTheme
  } else {
    // Light
    theme.value = null
  }
}

</script>

<style scoped>
#center-body {
  margin: 0;
  display: flex;
  /*place-items: center;*/
  /*min-width: 320px;*/
  /*min-height: 100%;*/
}

#center-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  /*text-align: center;*/
}

/*.n-card {*/
/*  max-width: 300px;*/
/*  max-height: 300px;*/
/*}*/
/*.card {*/
/*  padding: 2em;*/
/*}*/
</style>
