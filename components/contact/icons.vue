<template>
<div class="icons">
  <div class="hand" ref="hand">
    <div class="hand-img" ref="handImg" :style="{'background-image': `url(${path}icons-new-1.png)`}"></div>
  </div>
  <div class="puke" ref="puke">
    <div class="puke-img" ref="pukeImg" :style="{'background-image': `url(${path}icons-new-1.png)`}"></div>
  </div>
</div>
</template>

<script>

import anime from 'animejs'
import { mapState } from 'vuex';
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['path'])
  },

  methods:{
    resize(w,h){
      if(w,h) {
        this.w = w
        this.h = h
      }
    },

    showPuke() {
      if(this.handAnime) {
        this.handAnime.pause()
        this.pukeAnime.pause()
      }
      this.handAnime = anime({
        targets: this.$refs.hand,
        opacity: 0,
        scale: 0,
        duration: 250,
        easing: 'easeInQuad'
      });
      this.pukeAnime = anime({
        targets: this.$refs.puke,
        opacity: 1,
        scale: 1,
        duration: 250,
        easing: 'easeOutQuad'
      });
    },
    hidePuke() {
      if(this.handAnime) {
        this.handAnime.pause()
        this.pukeAnime.pause()
      }
      this.pukeAnime = anime({
        targets: this.$refs.puke,
        opacity: 0,
        scale:1,
        duration: 250,
        easing: 'easeInQuad'
      });
      this.handAnime = anime({
        targets: this.$refs.hand,
        opacity: 1,
        scale:1,
        duration: 500,
        easing: 'easeOutQuad'
      });

    }


  },

  mounted() {
    this.$refs.puke.style.opacity = 0
    anime({
      targets: this.$refs.puke,
      scale: [.9, 1.1],
      duration: 100,
      easing: 'easeOutQuad',
      loop: true,
      direction: 'alternate',
    });
    anime({
      targets: this.$refs.pukeImg,
      rotate: [-10, 10],
      duration: 50,
      easing: 'easeOutQuad',
      loop: true,
      direction: 'alternate',
    });
    anime({
      targets: this.$refs.handImg,
      rotate: [0,-10, 10,0,-10, 10,0],
      duration: 500,
      easing: 'easeOutQuad',
      loop: true,
      endDelay: 3000,
      direction: 'reverse',
    });
  }

}
</script>

<style lang="stylus" >
.icons
  width 36px
  height 36px
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  >div
    position absolute
    overflow hidden
    div
      background-size cover
  .puke-img
    background-position 0px -72px
  .hand-img
    background-position 0px -36px
  div
    width 100%
    height 100%
    will-change opacity, transform
</style>
