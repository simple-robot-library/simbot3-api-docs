<template>
  <n-config-provider :theme="theme">
    <div id="center-body">
      <n-layout position="absolute">
        <n-layout-header bordered>
          <HomeHead @theme-active-change="onThemeActiveChange"/>
        </n-layout-header>
        <n-layout position="absolute" style="top: 150px; bottom: 64px" :native-scrollbar="false"
                  :content-style="layoutCenterContentStyle">

          <n-collapse :default-expanded-names="['KDoc']" @item-header-click="handleItemHeaderClick">
            <n-card embedded :bordered="false">
              <n-collapse-item name="KDoc">
                <RepoDocCards/>
                <template #header>
                  <n-divider title-placement="left" style="user-select: none">
                    <Icon>
                      <BookOutline/>
                    </Icon> &nbsp;
                    <n-text strong style="font-size: 19px">KDoc</n-text>
                  </n-divider>
                  <n-divider title-placement="center">
                    <n-collapse-transition :show="!collapseActions.kdoc">
                      <n-text italic depth="3" style="user-select: none; font-size: 6px">点击展开</n-text>
                    </n-collapse-transition>
                  </n-divider>
                  <n-divider title-placement="right">
                    <n-collapse-transition :show="collapseActions.kdoc">
                      <n-text italic depth="3" style="user-select: none; font-size: 13px">Javadoc的好朋友</n-text>
                    </n-collapse-transition>
                  </n-divider>
                </template>
              </n-collapse-item>
            </n-card>
          </n-collapse>


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
import HomeHead from "./HomeHead.vue";
import {
  CollapseProps,
  darkTheme,
  NCard,
  NCollapse,
  NCollapseItem,
  NCollapseTransition,
  NConfigProvider,
  NDivider,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NText
} from "naive-ui";
import {reactive, ref} from "vue";
import RepoDocCards from "./RepoDocCards.vue";
import {BuiltInGlobalTheme} from "naive-ui/lib/themes/interface";
import {BookOutline} from '@vicons/ionicons5'
import {Icon} from "@vicons/utils";
import HomeFooter from "./HomeFooter.vue";

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

const collapseActions = reactive({
  kdoc: true
})

const handleItemHeaderClick: CollapseProps['onItemHeaderClick']
    = ({
         name,
         expanded
       }) => {
  if (name == 'KDoc') {
    collapseActions.kdoc = expanded
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
