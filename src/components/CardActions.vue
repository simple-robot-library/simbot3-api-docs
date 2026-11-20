<script setup lang="ts">
import {Button, type ButtonType} from 'animal-island-vue'

defineProps<{
  groups: {href: string; name: string; type: string}[][]
}>()

function openLink(href: string) {
  window.open(href, '_blank', 'noopener')
}
</script>

<template>
  <div class="card-actions">
    <div v-for="(group, index) in groups" :key="index" class="card-action-row">
      <Button
          v-for="link in group"
          :key="link.href"
          :type="link.type as ButtonType"
          size="small"
          @click="openLink(link.href)"
      >
        {{ link.name }}
      </Button>
    </div>
  </div>
</template>
