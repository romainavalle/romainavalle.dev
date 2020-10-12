<template>
  <article class="awards u-container">
    <div class="u-d-f">
      <div></div>
      <div>
        <p class="title">Awards.</p>
        <ul>
          <li v-for="(award,i) in awards" :key="`award-${i}`">
            <a :href="award.link" target="_blank" rel="noopener">
              <span>
                <span v-text="award.title" ></span>
                <strong v-text="award.from"></strong>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import offsetMixins from './../offsetMixins.vue'
export default {
  props: ['awards'],
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
    this.anime_array = [this.$el.querySelector('.title'),...[].slice.call(this.$el.querySelectorAll('li'))]
    anime.set(this.anime_array, {
      translateY: 100,
      opacity: 0
    })
  }
}
</script>

<style lang="stylus" scoped>
.awards
  position relative
  margin-top 170px
  color black

  .device &
    margin-top 70px
  p.title
    margin-bottom .5em
  ul
    font-size 18px
    margin-top -1em
  li
    border-top 1px solid rgba(#000, .4)
    padding 1em 0
  li:first-child
    border-top none
</style>
<style lang="stylus">
.awards
  a
    display flex
    align-items center
    justify-content space-between
    span
      display block
    .site
      text-align right
</style>

