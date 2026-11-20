<script setup lang="ts">
import {Card, Image, Tag, Title} from 'animal-island-vue'
import {tagColor} from '../../data/portal'
import showData from '../../data/show-cards.json'
import CardActions from '../CardActions.vue'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section id="showcase" class="portal-section" aria-labelledby="showcase-title">
    <h2 id="showcase-title">
      <Title color="app-yellow" variant="layer">作品展示</Title>
    </h2>

    <div class="showcase-grid">
      <article v-for="card in showData.cards" :key="card.id">
        <Card class="portal-card" type="dashed">
          <h3>{{ card.name }}</h3>
          <div class="card-tags">
            <Tag
                v-for="tag in card.tags"
                :key="tag.name"
                size="small"
                variant="soft"
                :color="tagColor(tag.type)"
                class="portal-tag"
            >
              {{ tag.name }}
            </Tag>
          </div>
          <div class="showcase-description" v-html="card.description"></div>

          <div v-if="card.images.length" class="showcase-images">
            <Image
                v-for="image in card.images"
                :key="image"
                :src="base + image"
                :alt="`${card.name}邀请二维码`"
                class="showcase-image"
                variant="stamp"
                lazy
            />
          </div>

          <CardActions :groups="card.links"/>
        </Card>
      </article>
    </div>
  </section>
</template>
