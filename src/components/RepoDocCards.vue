<script setup lang="ts">
import {NA, NButton, NCard, NGi, NGrid, NP, NSpace, NTag} from "naive-ui";


const componentCards = [
  {
    name: "核心库",
    tags: [{name: "核心", type: "info" as const}],
    description: "核心库是组件库的基础，也是绝大多数基本API存在的地方。",
    links: [
      {name: "前往KDoc", href: "main", type: "primary" as const},
      {name: "前往仓库", href: "https://github.com/simple-robot/simpler-robot", type: "info" as const},
    ]
  },

  {
    name: "mirai组件",
    tags: [{name: "组件", type: "success" as const}],
    description: "Mirai组件基于核心库对 <a href='https://github.com/mamoe/mirai'>mirai框架</a> 进行实现，提供强大的QQ机器人平台功能。",
    links: [
      {name: "前往KDoc", href: "components/mirai", type: "primary" as const},
      {name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-mirai", type: "info" as const},
    ]
  },

  {
    name: "KOOK组件",
    tags: [{name: "组件", type: "success" as const}],
    description: "KOOK组件基于核心库对 <a href='https://developer.kookapp.cn/doc/reference'>KOOK机器人</a> 进行实现，提供强大的KOOK机器人平台功能。",
    links: [
      {name: "前往KDoc", href: "components/kook", type: "primary" as const},
      {name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-kook", type: "info" as const},
    ]
  },

  {
    name: "QQ频道组件",
    tags: [{name: "组件", type: "success" as const}],
    description: "QQ频道组件基于核心库对 <a href='https://bot.q.qq.com/wiki'>QQ频道机器人</a> 进行实现，提供强大的QQ频道机器人平台功能。",
    links: [
      {name: "前往KDoc", href: "components/tencent-guild", type: "primary" as const},
      {name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-tencent-guild", type: "info" as const},
    ]
  },
]

</script>

<template>
  <div>
    <n-grid x-gap="12" y-gap="14" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
        <n-gi v-for="componentCard in componentCards">
          <n-card :title="componentCard.name" hoverable>

            <n-space size="small">
              <n-tag v-for="componentTag in componentCard.tags" :type="componentTag.type" size="small" round>
                {{ componentTag.name }}
              </n-tag>
            </n-space>


            <n-p v-html="componentCard.description"></n-p>

            <template #action>
              <n-grid :cols="componentCard.links.length" style="text-align: center">
                <n-gi v-for="componentLink in componentCard.links">
                  <n-a :href="componentLink.href">
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

</style>
