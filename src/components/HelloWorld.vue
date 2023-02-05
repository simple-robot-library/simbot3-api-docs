<script setup lang="ts">
import {reactive, ref} from 'vue'

defineProps<{ msg: string }>()


// const count = ref(0)

const obj = reactive({count: ref(0)})



</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="obj.count++">count is {{ obj.count }}</button>
  </div>

</template>

