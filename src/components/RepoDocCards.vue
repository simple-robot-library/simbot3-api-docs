<script setup>
import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace, NTag} from "naive-ui";

const officialTag = {name: "Official", type: "info"}
const coreTag = {name: "核心", type: "info"}
const componentTag = {name: "组件", type: "success"}

const componentCards = [
    {
        name: "核心库",
        tags: [officialTag, coreTag],
        shields: [
          { src: "https://img.shields.io/github/v/release/simple-robot/simpler-robot?label=version", alt: "核心库" },
        ],
        description: "核心库是组件库的基础，也是绝大多数基本API存在的地方。",
        links: [
            [{name: "前往仓库", href: "https://github.com/simple-robot/simpler-robot", type: "info"}],
            [
                {name: "KDoc", href: "main", type: "primary"},
                {name: "KDoc(快照)", href: "snapshots/main", type: "primary"},
            ],
            [{name: "🍀官网", href: "https://simbot.forte.love", type: "default"}],
        ]
    },

    {
        name: "mirai组件",
        tags: [officialTag, componentTag],
        shields: [
          { src: "https://img.shields.io/maven-central/v/love.forte.simbot.component/simbot-component-mirai-core?&label=version", alt: "mirai组件" },
        ],
        description: "Mirai组件基于核心库对 <a href='https://github.com/mamoe/mirai'>mirai框架</a> 进行实现，提供强大的QQ机器人平台功能。",
        links: [
            [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-mirai", type: "info"}],
            [
                {name: "KDoc", href: "components/mirai", type: "primary"},
                {name: "KDoc(快照)", href: "snapshots/components/mirai", type: "primary"},
            ],
            [{name: "前往手册", href: "https://component-mirai.simbot.forte.love", type: "default"}],
        ]
    },

    {
        name: "KOOK组件",
        tags: [officialTag, componentTag],
        shields: [
          { src: "https://img.shields.io/maven-central/v/love.forte.simbot.component/simbot-component-kook-core?&label=version", alt: "KOOK组件" },
        ],
        description: "KOOK组件基于核心库对 <a href='https://developer.kookapp.cn/doc/reference'>KOOK机器人</a> 进行实现，提供强大的KOOK机器人平台功能。",
        links: [
            [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-kook", type: "info"}],
            [
                {name: "KDoc", href: "components/kook", type: "primary"},
                {name: "KDoc(快照)", href: "snapshots/components/kook", type: "primary"},
            ],
            [{name: "前往手册(暂无域名)", href: "https://simple-robot.github.io/simbot-component-kook/", type: "default"}],
        ]
    },

    {
        name: "QQ频道组件",
        tags: [officialTag, componentTag],
        shields: [
          { src: "https://img.shields.io/maven-central/v/love.forte.simbot.component/simbot-component-qq-guild-core?&label=version", alt: "QQ频道组件" },
        ],
        description: "QQ频道组件基于核心库对 <a href='https://bot.q.qq.com/wiki'>QQ频道机器人</a> 进行实现，提供强大的QQ频道机器人平台功能。",
        links: [
            [{name: "前往仓库", href: "https://github.com/simple-robot/simbot-component-qq-guild", type: "info"}],
            [
                {name: "KDoc", href: "components/qq-guild", type: "primary"},
                {name: "KDoc(快照)", href: "snapshots/components/qq-guild", type: "primary"}
            ],
            [{name: "前往手册(暂无域名)", href: "https://simple-robot.github.io/simbot-component-qq-guild/", type: "default"}],
        ]
    },
]

</script>

<template>
  <div>
    <n-grid x-gap="12" y-gap="14" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
      <n-gi v-for="componentCard in componentCards">
        <n-card :title="componentCard.name" hoverable :content-style="{'min-height': '160px'}">

          <n-image-group>
            <n-space size="small">
              <n-image v-for="shield in componentCard.shields" :alt="shield.alt" :src="shield.src" preview-disabled />
            </n-space>
          </n-image-group>

          <n-space size="small">
            <n-tag v-for="componentTag in componentCard.tags" :type="componentTag.type" size="small" round>
              {{ componentTag.name }}
            </n-tag>
          </n-space>



          <n-p v-html="componentCard.description"></n-p>

          <template #action>
            <n-grid cols="1" style="text-align: center; min-height: 120px">
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

</style>
