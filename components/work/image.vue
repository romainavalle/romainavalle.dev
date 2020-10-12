<template>
  <div class="image u-container">
    <img src="" :data-src="`${path}${item.src}`"  :alt="alt">
  </div>
</template>

<script>

import workMixins from './workMixins.vue'
import anime from 'animejs'
export default {
  props: ['item', 'path',  'alt'],
  mixins: [workMixins],
  mounted() {
    setTimeout(()=>{
      const image = this.$el.querySelector('img')
      image.src = image.dataset.src
    }, 400)
  }
}
</script>

<style lang="stylus" scoped>
.image
  margin-top 100px
  .device &
    width 80%
</style>

