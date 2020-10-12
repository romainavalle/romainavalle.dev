<template>
  <div class="desc u-container">
    <div class="u-d-f">
      <div>
        <p class="title" v-text="year"></p>
        <ul>
          <li v-for="(word, i) in keywords" :key="`word-${i}`" v-text="word"></li>
        </ul>
      </div>
      <div class="desc" v-html="desc"></div>
    </div>
  </div>
</template>

<script>
import offsetMixins from './../offsetMixins.vue'
import anime from 'animejs'
export default {
  props: ['year', 'keywords', 'desc'],
  mixins: [offsetMixins],
  methods: {
    show() {
      anime({
        targets: this.anime_array,
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
      })
    }
  },
  mounted() {
    this.anime_array = [this.$el.querySelector('.title'), ...[].slice.call(this.$el.querySelectorAll('li')), this.$el.querySelector('.desc')]
    anime.set(this.anime_array,{
      translateY: 200,
      opacity: 0
    })
  }
}
</script>

<style lang="stylus" scoped>
.desc
  position relative
  p.title
    margin-bottom .2em
  .desc
    margin-top 8px

  li
    font-size 14px
    text-transform uppercase
    margin-bottom 1em
    font-weight $demi
  .device &
    ul
      margin-bottom 40px
</style>

