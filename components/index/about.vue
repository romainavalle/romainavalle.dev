<template>
  <article class="about">
    <h2 v-html="about.title" class="title"></h2>
    <p class="large" v-for="(text,i) in about.textLarge" :key="`textLarge-${i}`" v-html="text"></p>
    <p v-for="(text,i) in about.text" :key="`text-${i}`" v-html="text"></p>
  </article>
</template>
<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import offsetMixins from './../offsetMixins.vue'
export default {
  computed:{
    ...mapState(['about'])
  },
  mixins: [offsetMixins],
  methods: {
    show() {
      anime({
        targets: this.anime_array,
        translateY: 0,
        scaleY: 1,
        duration:500,
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(100)
      })
    }
  },
  mounted() {
    this.anime_array = [this.$el.querySelector('h2'),...[].slice.call(this.$el.querySelectorAll('p'))]
    anime.set(this.anime_array, {
      translateY: 100,
      opacity: 0
    })
  }
}
</script>

<style lang="stylus">
.about
  .strike
    text-decoration line-through
  .hand
    animation-name hand
    animation-duration 4s
    animation-iteration-count infinite
    display inline-block

@keyframes hand
  0%
    transform rotate(10deg)
  2%
    transform rotate(10deg)
  6%
    transform rotate(-10deg)
  10%
    transform rotate(10deg)
  14%
    transform rotate(-10deg)
  16%
    transform rotate(0deg)
</style>

