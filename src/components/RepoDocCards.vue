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
            <component v-for="{ component, props } in card.tags"
                       v-bind="props"
                       :is="component"
                       v-html="props.name" />
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


<script setup>
import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace, NTag} from "naive-ui";

function Tag(props) {
  return {
    component: NTag,
    props: {
      round: props.round || true,
      size: props.size || 'small',
      ...props
    }
  }
}

function Shield(props) {
  return {
    component: NImage,
    props: {
      previewDisabled: props.previewDisabled || true,
      ...props,
    }
  }
}

const officialTag = Tag({ name: 'Official', type: 'info' })
const coreTag = Tag({ name: '核心', type: 'info' })
const componentTag = Tag({name: "组件", type: "success"})
const WIPTag = Tag({ name: '<b>🚧WIP</b>', type: 'warning' })
const helpWanted = Tag({ name: '<b>🤝期待协助</b>', type: 'success' })
const deadTag = Tag({ name: '<b>💀阵亡</b>', type: 'error' })

const componentCards = [
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

</style>
