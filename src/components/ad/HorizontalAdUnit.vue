<script setup>
import {onMounted} from "vue";

onMounted(() => {
  try {
    window.addAds()
    console.log('Ads HorizontalAdUnit loaded')
  } catch (e) {
    console.log(e)
  }
})

</script>

<!-- 横向展示广告单元 -->
<template>
  <!-- 横向展示广告 -->
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-4062299174917944"
       data-ad-slot="5610367324"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
</template>
