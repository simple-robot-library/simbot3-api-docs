<template>
  <n-config-provider :theme="theme">
    <div id="center-body">
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
                          <n-collapse-transition :show="!collapseActions.has('KDoc')">
                            <n-text italic depth="3" style="user-select: none; font-size: 18px">点击展开</n-text>
                          </n-collapse-transition>
                        </n-divider>
                        <n-divider title-placement="right">
                          <n-collapse-transition :show="collapseActions.has('KDoc')">
                            <n-text italic depth="3" style="user-select: none; font-size: 13px">Javadoc的好朋友</n-text>
                          </n-collapse-transition>
                        </n-divider>
                      </template>
                    </n-collapse-item>
                  </n-card>
                  <n-card embedded :bordered="false">
                    <n-collapse-item name="作品展示">
                      <ShowCards/>
                      <template #header>
                        <n-divider title-placement="left" style="user-select: none">
                          <n-text strong style="font-size: 19px">作品展示</n-text>
                          &nbsp;
                          <Icon>
                            <HeartOutline/>
                          </Icon>
                        </n-divider>
                        <n-divider title-placement="center">
                          <n-collapse-transition :show="!collapseActions.has('作品展示')">
                            <n-text italic depth="3" style="user-select: none; font-size: 18px">点击展开</n-text>
                          </n-collapse-transition>
                        </n-divider>
                        <n-divider title-placement="right">
                          <n-collapse-transition :show="collapseActions.has('作品展示')">
                            <n-text italic depth="3" style="user-select: none; font-size: 13px">看看大家的好宝贝</n-text>
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
  NFlex,
  NGrid,
  NGridItem,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NText
} from "naive-ui";
import {reactive, ref} from "vue";
import RepoDocCards from "./RepoDocCards.vue";
import {BuiltInGlobalTheme} from "naive-ui/lib/themes/interface";
import {BookOutline, HeartOutline} from '@vicons/ionicons5'
import {Icon} from "@vicons/utils";
import HomeFooter from "./HomeFooter.vue";
import ShowCards from "./show/ShowCards.vue";
import HorizontalAdUnit from "./ad/HorizontalAdUnit.vue";

const layoutCenterContentStyle = reactive({
    // 'padding-left': '50px',
    // 'padding-right': '50px',
    // 'padding-top': '50px',
    // 'padding-bottom': '50px',
})

const initThemeActiveValue = localStorage.getItem("theme_dark") != null

const theme = ref<BuiltInGlobalTheme | null>(initThemeActiveValue ? darkTheme : null)

function onThemeActiveChange(value: boolean) {
    if (value) {
        theme.value = darkTheme
        localStorage.setItem("theme_dark", "true")
    } else {
        // Light
        theme.value = null
        localStorage.removeItem("theme_dark")
    }
}

const initCollapseActionsStorage = localStorage.getItem("collapseActions_items")
let initCollapseActions: Array<string>
if (initCollapseActionsStorage == null) {
    initCollapseActions = ["KDoc"]
} else {
    try {
        const parsed = JSON.parse(initCollapseActionsStorage)
        if (!Array.isArray(parsed)) {
            localStorage.removeItem("collapseActions_items")
            initCollapseActions = ["KDoc"]
        } else {
            initCollapseActions = parsed
        }
    } catch (e) {
        localStorage.removeItem("collapseActions_items")
        initCollapseActions = ["KDoc"]
    }
}

const collapseActions = reactive<Set<string>>(new Set(initCollapseActions))

const handleItemHeaderClick: CollapseProps['onItemHeaderClick']
    = ({name, expanded}) => {
    if (expanded) {
        collapseActions.add(name)
    } else {
        collapseActions.delete(name)
    }

    localStorage.setItem("collapseActions_items", JSON.stringify([...collapseActions]))
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
