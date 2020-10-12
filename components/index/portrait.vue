<template>
  <div class="portrait" :class="{'opacity': legendOpacity}">
    <img src="" :data-src="`${path}${about.img}`" alt="romain avalle">
    <p v-html="about.legend" class="legend"></p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import offsetMixins from './../offsetMixins.vue'
export default {
  data() {
    return {
      legendOpacity: false,
      w: 0
    }
  },
  mixins: [offsetMixins],
  computed:{
    ...mapState(['about', 'path'])
  },
  methods: {
    show() {
      anime({
        targets: this.anime_array,
        duration: 500,
        opacity: 1,
        easing: 'easeOutQuad',
      })
    }
  },
  mounted() {
    this.legendOpacity = true
    this.anime_array = [this.$el]
    setTimeout(()=>{
      const image = this.$el.querySelector('img')
      image.src = image.dataset.src
    }, 400)
    anime.set(this.anime_array, {
      opacity: 0
    })
  }
}
</script>

<style lang="stylus" scoped>
.portrait
  .device &
    display none
    height 100vh
    align-items center
    flex-direction column
  .legend
    text-align center
    font-size 14px
    margin-top 35px
    line-height 2
    transition opacity .5s ease-in-out-quad
  &.opacity
    .legend
      opacity 0.5
  &.opacity:hover
    .legend
      opacity 1
</style>

