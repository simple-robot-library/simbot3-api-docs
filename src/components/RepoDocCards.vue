<script setup lang="ts">
import {NA, NButton, NCard, NGi, NGrid, NP, NTag} from "naive-ui";</script>

<template>
  <div>
    <n-grid x-gap="12" y-gap="14" cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
      <n-gi v-for="i in 30">
        <n-card :title="'组件库v-' + i" hoverable>

          <n-tag type="success" size="small" round>
            组件
          </n-tag>

          <n-p v-for="n in i % 10">xxx组件库</n-p>

          <template #action>
            <n-grid cols="2" style="text-align: center">
              <n-gi>
                <n-button quaternary type="info">
                  KDoc
                </n-button>
              </n-gi>
              <n-gi>
                <n-a href="/compnents/kook">
                  <n-button quaternary type="primary">
                    仓库
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
