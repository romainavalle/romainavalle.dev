<template>
  <div class="cover" @mouseover="onMouseEnter" @mouseout="onMouseLeave" @click="onMouseClick">
    <img :src="`${path}${img}`" :alt="title">
    <h1 v-html="title" class="vLarge"></h1>
  </div>
</template>

<script>
import {  mapGetters } from 'vuex';
import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
export default {
  data() {
    return {
      w:0
    }
  },
  props: ['img', 'title', 'path', 'imgPath'],
  computed: {
    ...mapGetters(['isDevice'])
  },
  methods: {
    onMouseEnter() {
      Emitter.emit('COVER:OVER')
    },
    onMouseLeave() {
      Emitter.emit('COVER:OUT')
    },
    onMouseClick() {
      ScrollHelper.scrollTo(window.innerHeight - 120)
    }
  },
  mounted(){

    if(this.isDevice) {
      anime({
       targets: this.$el.querySelector('img'),
       scaleY: [.5, 1],
       scaleX: [.5, 1],
       opacity: [0,1],
       duration: 750,
       easing: 'easeOutQuad'
     })
      anime({
       targets: this.$el.querySelector('h1'),
       translateY: [50, 0],
       opacity: [0,1],
       duration: 750,
       delay: 300,
       easing: 'easeOutQuad'
     })
    }else{
      this.$el.style.opacity = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.cover
  height 100vh
  width 100%
  position relative
  h1
    position absolute
    font-size 110px
    font-weight $bold
    padding-left 50px
  img
    width 600px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  .device &
    width 75%
    margin 0 auto
    padding-top 150px
    img
      width 100%
      position relative
      top auto
      transform none
      left auto
      margin 0px auto 30px
    h1
      font-size 45px
      padding-left 0
      position relative

  .device &
    img
      clip-path circle(280px at center)
  @media screen and (max-width: 760px)
    img
      clip-path circle(180px at center)
  .device.mobile &
    img
      clip-path circle(130px at center)
</style>

