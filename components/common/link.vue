<template>
  <nuxt-link :to="{'name': route}" :class="[className, {'work': $route.params.slug}]">
    <slot></slot>
  </nuxt-link>
</template>
<script>
import anime from 'animejs'
export default {
  props: ['route', 'className', 'delay'],
  mounted(){
    anime({
      targets: this.$el,
      opacity: [0,1],
      easing: 'easeOutQuad',
      duration: 700,
      delay: this.delay
    })
  }

}
</script>
<style lang="stylus" scoped>
a
  position fixed
  color $white
  font-size 14px
  z-index 10
  text-transform uppercase
  font-weight $demi
  line-height 1
  padding 30px
  transition color 300ms ease-out-quad
  &.work
    color $black
a.index
  top 16px
  left 20px
a.works
  top 35px
  right 5px
  transform-origin 50% 50%
  transform rotate(90deg)
a.contact
  bottom -55px
  left 20px
  transform-origin 0 0
  transform rotate(-90deg)
a.close
  top 16px
  left 50%
  transform translateX(-50%)
.device &
  a.index
    top 0px
    left -14px
  a.contact
    left -15px
    bottom -80px
  a.works
    top 13px
    right -30px
  a.close
    display none
</style>
<style lang="stylus">
a.close
  span.glyph
    display inline-block
    width 14px
    height 10px
    position relative
    margin-right 6px
    &:before,
    &:after
      content ''
      display block
      width 100%
      height 2px
      background $black
      position absolute
      top 4px
      transform rotate(45deg)
    &:after
      transform rotate(-45deg)

</style>
