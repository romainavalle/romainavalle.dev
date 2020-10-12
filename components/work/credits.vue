<template>
  <div class="credits u-container">
    <div class="u-d-f">
      <div></div>
      <div>
        <p class="title">Credits.</p>
        <ul>
          <li v-for="(credit, i) in credits" :key="`credit-${i}`" v-html="credit"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import offsetMixins from './../offsetMixins.vue'
import anime from 'animejs'
export default {
  props: ['credits'],
  mixins: [offsetMixins],
  methods: {
    onMouseEnter(type) {
      Emitter.emit('LINK:OVER', true)
    },
    onMouseLeave(type) {
      Emitter.emit('LINK:OUT')
    },
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
  beforeDestroy() {
    this.links.forEach(element => {
      element.removeEventListener('mouseenter', this._mouseEnter)
      element.removeEventListener('mouseleave', this._mouseLeave)
    });
  },
  mounted() {
    this._mouseEnter = this.onMouseEnter.bind(this)
    this._mouseLeave = this.onMouseLeave.bind(this)
    this.links = [].slice.call(this.$el.querySelectorAll('a'))
    this.links.forEach(element => {
      element.addEventListener('mouseenter', this._mouseEnter)
      element.addEventListener('mouseleave', this._mouseLeave)
    });
    this.anime_array = [this.$el.querySelector('.title'), ...[].slice.call(this.$el.querySelectorAll('li'))]
    anime.set(this.anime_array, {
      translateY: 200,
      opacity: 0
    })
  }
}
</script>

<style lang="stylus" scoped>
.credits
  position relative
  margin-top 150px

  .device &
    margin-top 50px
    margin-bottom 70px
  p.title
    margin-bottom .5em
  li
    margin-bottom .5em
</style>
<style lang="stylus" scoped>
.u-container.credits
  li a
    display block
</style>

