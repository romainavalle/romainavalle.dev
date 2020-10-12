<template>
  <div class="image">
    <img src="" :data-src="`${path}${item.src}`" :alt="alt">
  </div>
</template>

<script>
import workMixins from './workMixins.vue'
export default {
  props: ['item', 'path', 'imgPath', 'alt'],
  mixins: [workMixins],
  mounted(){
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
  position relative
  .device &
    width 100%
</style>

