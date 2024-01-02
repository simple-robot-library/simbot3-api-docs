<script setup>

import {NA, NButton, NCard, NGi, NGrid, NImage, NImageGroup, NP, NSpace, NTag} from "naive-ui";
// import qgfolqrcode from "@/assets/qq-guild-forliy-qrcode.jpg";

const componentCards = [
  {
    name: "QQ频道法欧莉",
    tags: [{name: "QQ频道", type: "info"}, {name: "BOT实例", type: "info"}, {name: "法欧莉", type: "success"}],
    description: "<p>法欧莉，占领QQ频道！</p><p>快使用QQ扫描下面的图片把法欧莉添加到你的频道中吧~</p>",
    images: [
      "img/qq-guild-forliy-qrcode.jpg"
    ],
    links: [
      [{name: "点击邀请法欧莉", href: "https://qun.qq.com/qunpro/robot/share?robot_appid=101986850", type: "info"}],
    ]
  },
  {
    name: "KOOK法欧莉",
    tags: [{name: "KOOK", type: "info"}, {name: "BOT实例", type: "info"}, {name: "法欧莉", type: "success"}],
    description: "<p>法欧莉，占领KOOK！</p><p>快点击下方的按钮把法欧莉添加到你的KOOK中吧~</p>",
    links: [
        [{name: "点击邀请法欧莉", href: "https://www.kookapp.cn/app/oauth2/authorize?id=10250&permissions=536870911&client_id=jqdlyHK85xe1i5Bo&redirect_uri=&scope=bot", type: "info"}]
    ]
  }
]
</script>

<template>
  <div>
    <n-grid x-gap="12" y-gap="14" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
      <n-gi v-for="componentCard in componentCards">
        <n-card :title="componentCard.name" hoverable :content-style="{'min-height': '160px'}">

          <n-image-group>
            <n-space size="small">
              <n-image v-for="shield in componentCard.shields" :alt="shield.alt" :src="shield.src" preview-disabled/>
            </n-space>
          </n-image-group>

          <n-space size="small">
            <n-tag v-for="componentTag in componentCard.tags" :type="componentTag.type" size="small" round>
              {{ componentTag.name }}
            </n-tag>
          </n-space>

          <n-p v-html="componentCard.description"></n-p>

          <n-image-group show-toolbar-tooltip show-toolbar>
            <n-space size="small" align="center">
              <n-image lazy :preview-src="img" width="200" v-for="img in componentCard.images" :src="img"/>
            </n-space>
          </n-image-group>

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
