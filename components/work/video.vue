<template>
    <div class="video u-container">
  <no-ssr>
      <video src="" :data-src="`${videoPath}${item.src}`" muted playsinline autoplay loop preload="" v-if="!isSafari"  crossOrigin="anonymous" type="video/mp4"/>
  </no-ssr>
    </div>
</template>

<script>

import workMixins from './workMixins.vue'
import { mapGetters } from 'vuex'
export default {
  props: ['item', 'path', 'videoPath'],
  mixins: [workMixins],
  computed:{
    ...mapGetters(['isSafari'])
  },
  mounted() {
    setTimeout(()=>{
        const image = this.$el.querySelector('video')
        if(image)image.src = image.dataset.src
      }, 400)
  }
}
</script>

<style lang="stylus" scoped>
.video
  video
    margin-top 100px
  .device &
    width 80%
</style>

