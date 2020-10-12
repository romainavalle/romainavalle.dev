<template>
  <article class="recognitions">
    <h3 v-text="recognitions.title" class="title"></h3>
    <ul>
      <li v-for="(award,i) in recognitions.awards" :key="`award-${i}`">
        <a :href="award.link" target="_blank" rel="noopener">
          <span>
            <span v-text="award.title" ></span>
            <strong v-text="award.from"></strong>
          </span>
          <span class="site" v-text="award.site"></span>
        </a>
      </li>
    </ul>
  </article>
</template>
<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import offsetMixins from './../offsetMixins.vue'
export default {
  computed:{
    ...mapState(['recognitions'])
  },
  mixins: [offsetMixins],
  methods: {
    show() {
      anime({
        targets: this.anime_array,
        translateY: 0,
        duration:500,
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(100)
      })
    }
  },
  mounted() {
    this.anime_array = [this.$el.querySelector('h3'),...[].slice.call(this.$el.querySelectorAll('li'))]
    anime.set(this.anime_array,{
      translateY: 100,
      opacity: 0
    })
  }
}
</script>

<style lang="stylus" scoped>
.recognitions
  position relative
  ul
    font-size 18px
  li
    border-top 1px solid rgba($white, .4)
    padding 1em 0
  li:first-child
    border-top none
  .site
    margin-left 10px
</style>
<style lang="stylus">
.recognitions
  a
    display flex
    align-items center
    justify-content space-between
    span
      display block
    .site
      text-align right
</style>

