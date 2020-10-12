<template>

</template>

<script>

import offsetMixins from './../offsetMixins.vue'
import anime from 'animejs'
export default {
  mixins:[offsetMixins],
  methods: {
    show() {
      if(!this.$el) return
      anime({
        targets: this.$el,
        translateY: 0,
        scaleY: 1,
        duration: 1000,
        easing: 'easeOutQuad'
      })
    }
  },
  mounted() {
    if(!this.$el) return
    anime.set(this.$el,{
      translateY: 200,
      scaleY: 1.5,
      transformOrigin: '0 0'
    })

  }
}
</script>

<style>

</style>
