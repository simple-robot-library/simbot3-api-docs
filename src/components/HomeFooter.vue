<template>
  <n-space vertical>
    <n-text depth="3">© {{ copyRightYear }} <a class="copyright-link" href="https://github.com/ForteScarlet"
                                               target="_blank">ForteScarlet</a>.
      All rights reserved.
    </n-text>

    <n-text depth="3">
      Feedback or assistance: <a href="https://github.com/simple-robot-library/simbot3-api-docs">source</a>
    </n-text>
  </n-space>

</template>

<script setup lang="ts">
import {NSpace, NText} from "naive-ui";

const startYear = 2023
const currentYear = new Date().getFullYear()

const copyRightYear = startYear == currentYear ? currentYear : startYear + '-' + currentYear

</script>

