<script setup lang="ts">
import {Avatar, Background, BackTop, Button, Card, Cursor, Divider, Footer, Title} from 'animal-island-vue'
import logo from './assets/logo.svg'
import HorizontalAdUnit from './components/ad/HorizontalAdUnit.vue'
import RepoDocCards from './components/RepoDocCards.vue'
import ShowCards from './components/show/ShowCards.vue'

const year = new Date().getFullYear()

function toHref(href: string) {
  location.href = href
}
</script>

<template>
  <BackTop :visibilityHeight="100"/>
  <Background type="dots-dark-green">
    <Cursor type="raindrop">
      <header id="top">
        <div class="container header-layout">
          <div class="site-brand">
            <Avatar :src="logo" alt="LOGO" :size="48"/>
            <h1>Simple Robot</h1>
          </div>
        </div>
        <Divider type="hairline" aria-hidden="true"/>
      </header>

      <main id="main-content" class="container site-main" tabindex="-1">
        <section aria-labelledby="hero-title">
          <Background type="coffee-break" class="hero">
            <Card class="hero-note">
              <h1 id="hero-title">
                <Title size="large" color="app-yellow">文档引导站</Title>
              </h1>
              <p>查阅 Simple Robot 核心库 API 和各平台组件手册。</p>
              <div class="hero-actions">
                <Button type="primary" @click="() => toHref('https://simbot.forte.love')">官网</Button>
                <Button type="default" @click="() => toHref('/main/')">API 文档</Button>
                <Button type="text" @click="() => toHref('https://github.com/simple-robot')">GitHub</Button>
              </div>
            </Card>
          </Background>
        </section>

        <RepoDocCards/>
        <ShowCards/>
        <HorizontalAdUnit/>
      </main>

      <footer>
        <Divider type="dashed-brown" aria-hidden="true"/>
        <div class="container footer-layout animal-footer">
          <a class="site-brand" href="#top">
            <img :src="logo" alt="" width="30" height="30">
            <span>Simple Robot</span>
          </a>
          <p>© 2023–{{ year }}
            <a href="https://github.com/ForteScarlet" target="_blank">Forte Scarlet</a>
          </p>
          <div class="footer-links">
            <a href="https://github.com/simple-robot-library/simbot3-api-docs" target="_blank">
              反馈与协助
            </a>
          </div>
        </div>
      </footer>
    </Cursor>
  </Background>

</template>
