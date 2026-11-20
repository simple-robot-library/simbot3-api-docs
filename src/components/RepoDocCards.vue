<script setup lang="ts">
import {Card, Tag, Title} from 'animal-island-vue'
import repoData from '../data/repo-doc-cards.json'
import {tagColor} from '../data/portal'
import CardActions from './CardActions.vue'

const tagsByName = repoData.predefinedTags as Record<string, { name: string; type: string }>
const repositories = repoData.cards.map(card => ({
  ...card,
  tags: card.tags.map(name => tagsByName[name]).filter(Boolean),
}))

const coreLinks = [
  [
    {name: '官网', href: 'https://simbot.forte.love/', type: 'primary'},
    {name: 'API文档', href: 'main/', type: 'default'},
    {name: 'GitHub', href: 'https://github.com/simple-robot/simpler-robot', type: 'text'},
  ]
]
</script>

<template>
  <section id="core" class="portal-section" aria-labelledby="core-title">
    <h2 id="components-title">
      <Title color="app-yellow" variant="tab">核心库</Title>
    </h2>
    <div>

    </div>
    <article class="repo-feature">
      <Card class="portal-card" pattern="app-teal">
        <div class="card-content">
          <div>
            <img
                src="https://img.shields.io/github/v/release/simple-robot/simpler-robot?label=version"
                alt="核心库版本"
                class="release-badge"
                height="20"
                loading="lazy"
                decoding="async"
            >
          </div>
          <p class="card-description">核心库是组件库的基础，也是绝大多数基本API存在的地方。</p>
        </div>
        <CardActions :groups="coreLinks"/>
      </Card>
    </article>
  </section>

  <section id="components" class="portal-section" aria-labelledby="components-title">
    <h2 id="components-title">
      <Title color="app-yellow" variant="layer">组件库</Title>
    </h2>

    <div class="repo-grid">
      <article
          v-for="card in repositories"
          :key="card.id"
      >
        <Card class="portal-card" pattern="none">
          <div class="card-content">
            <div class="card-heading">
              <h3>{{ card.name }}</h3>
            </div>
            <div>
              <img
                  v-for="shield in card.shields"
                  :key="shield.src"
                  :src="shield.src"
                  :alt="`${shield.alt}版本`"
                  class="release-badge"
                  height="20"
                  loading="lazy"
                  decoding="async"
              >
            </div>
            <div class="card-tags">
              <Tag
                  v-for="tag in card.tags"
                  :key="tag.name"
                  size="small"
                  variant="soft"
                  :color="tagColor(tag.type)"
              >
                <span v-html="tag.name"></span>
              </Tag>
            </div>
            <p class="card-description" v-html="card.description"/>
          </div>

          <CardActions :groups="card.links"/>
        </Card>
      </article>
    </div>
  </section>
</template>
