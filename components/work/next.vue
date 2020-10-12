<template>
  <div class="next u-container">
    <div class="u-d-f">
      <div></div>
      <div>
        <p class="title">Next.</p>
        <nuxt-link :to="{name:'work-slug', params: { slug: work.slug }}" class="large" :aria-label="work.title">
          <img src="" :data-src="`${path}${work.slug}/${work.cover}`" :alt="work.title">
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import offsetMixins from './../offsetMixins.vue'
import anime from 'animejs'
export default {
  props: ['work'],
  mixins: [offsetMixins],
  computed:{
    ...mapState(['path']),
    ...mapGetters(['isDevice'])

  },
  methods: {
    show() {
      anime({
        targets: this.$el.querySelector('img'),
        scaleY:  1,
        scaleX: 1,
        opacity: 1,
        duration: 750,
        delay: 300,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.$el.querySelector('.title'),
        translateY:  0,
        opacity: 1,
        duration: 750,
        easing: 'easeOutQuad'
      })
    }
  },
  mounted() {
    setTimeout(()=>{
      const image = this.$el.querySelector('img')
      image.src = image.dataset.src
    }, 1000)
    if(this.isDevice){
      anime.set(this.$el.querySelector('img'),{
        scaleY: .5,
        scaleX: .5,
        opacity: 0
      })
      anime.set( this.$el.querySelector('.title'),{
        translateY: 150,
        opacity: 0
      })
    }else{
      this.$el.style.visibility = 'hidden'
    }
  }
}
</script>

<style lang="stylus" scoped>
.next
  position relative
  margin-top 600px
  height 3000px
  padding-bottom 50px
  .device &
    margin-top 50px
    height auto
    img
      clip-path circle(280px at center)

  @media screen and (max-width: 760px)
    img
      clip-path circle(180px at center)
  .device.mobile &
    margin-top 50px
    height auto
    img
      clip-path circle(130px at center)

</style>

