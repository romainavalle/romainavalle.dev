<template>
  <div class="column u-container">
    <no-ssr>
      <template v-for="(media, i) in item.media">
        <div :key="`media-${i}`"  class="media"  v-if="media.type === 'image' || (media.type === 'imageSafari' && isSafari) || (media.type === 'video' && !isSafari)">
          <img src="" :data-src="`${path}${media.src}`" :alt="alt" v-if="media.type === 'image'" class="img1">
          <img src="" :data-src="`${path}${media.src}`" :alt="alt" v-if="media.type === 'imageSafari' && isSafari" class="img2">
          <video src="" :data-src="`${videoPath}${media.src}`" v-if="media.type === 'video' && !isSafari"  muted playsinline autoplay loop  class="video" preload="" crossOrigin="anonymous" type="video/mp4"></video>
        </div>
      </template>
    </no-ssr>
  </div>
</template>

<script>

import workMixins from './workMixins.vue'
import { mapGetters } from 'vuex';
export default {
  props: ['item', 'path', 'imgPath', 'videoPath', 'isDevice', 'alt'],
  mixins: [workMixins],
  computed:{
    ...mapGetters(['isSafari'])
  },
  mounted() {
    setTimeout(()=>{
      const image1 = this.$el.querySelector('.img1')
      const image2 = this.$el.querySelector('.img2')
      const video = this.$el.querySelector('video')
      if(image1)image1.src = image1.dataset.src
      if(image2)image2.src = image2.dataset.src
      if(video)video.src = video.dataset.src
    }, 400)
  }
}
</script>

<style lang="stylus" scoped>
.u-container
  display flex
  justify-content space-between
  .media
    margin-top 100px
    flex 1
  .media:first-child
    margin-right 60px
</style>

