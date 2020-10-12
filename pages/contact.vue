<template>
  <section class="contact">
    <div class="hidden">
      <a v-for="(network, i) in contact.networks" :key="`network-${i}`"  :href="network.link" target="_blank"  rel="noopener" v-text="network.title"></a>
    </div>
    <no-ssr>
      <div class="container" ref="container" v-if="!isFF && !isDevice">
        <v-circle v-for="i in max" :key="`circle-${i}`" :id="i" :max="max" :networks="contact.networks" ref="circle"></v-circle>
        <v-icons ref="icons"></v-icons>
      </div>
    </no-ssr>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Emitter from '~/assets/js/events/EventsEmitter'
import vCircle from '~/components/contact/circle.vue'
import vIcons from '~/components/contact/icons.vue'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import anime from 'animejs'
import transform from 'dom-transform'
export default {
  data() {
    return {
      char:0,
      deltaY: 0,
      deltaEaseY: 0,
      tempEase: 0,
      speedScale: 1,
      minVal: .001,
      time: 0,
      isScrolling: false,
      sign: 1,
      max: 6,
      isReady: false
    }
  },
  components: {
    vCircle, vIcons
  },
  computed: {
    ...mapState(['contact', 'path']),
    ...mapGetters(['isFF', 'isDevice'])
  },
  methods: {
    resize(w,h) {

      if(w,h) {
        this.w = w
        this.h = h
      }
      if(!this.$refs.circle) return
      this.$refs.circle.forEach(el => {
        el.resize(this.w, this.h)
      })
    },
    linkOver() {
      if(this.isScrolling) return
      this.animation = anime({
        targets: this,
        speedScale: 0.1,
        duration: 500,
        easing: 'easeInQuad'
      });
    },

    linkOut() {
      if(this.isScrolling) return
      this.animation = anime({
        targets: this,
        speedScale: 1,
        duration: 500,
        easing: 'easeInQuad'
      });
    },

    tick(scrollTop,realScrollTop) {
      if(!this.h)return
      if(!this.isReady)return
      if(realScrollTop > this.h *9 - 1)ScrollHelper.resetScroll(1)
      if(realScrollTop < 1)ScrollHelper.resetScroll(this.h * 9 -1 )
      if(this.isFF || this.isDevice) return
      transform(this.$refs.container, {translateY: scrollTop})
      const dY = this.deltaY - this.deltaEaseY
      this.deltaEaseY += dY / 10
      //
      const diff = (this.tempEase - scrollTop) * this.speedScale
      const absDiff = Math.abs(diff / 1000)
      let val = Math.max(this.minVal * this.speedScale , absDiff)
      if(val !== this.minVal) {
        if(diff < 0) {
          this.sign = 1
        }
        if(diff > 0) {
          this.sign = -1
        }
      }
      if(absDiff > .002) {
        if(!this.isScrolling) {
          this.isScrolling = true
          this.$refs.icons.showPuke()
        }
      }else{
        if(this.isScrolling) {
          this.isScrolling = false
          this.$refs.icons.hidePuke()
        }
      }
      this.time += val * this.sign
      this.time %= 1
      this.tempEase = scrollTop
      this.$refs.circle.forEach(el => {
        el.tick(this.time,this.sign )
      })
    }
  },
  beforeDestroy() {
    Emitter.removeListener('LINK:OVER', this._linkOver)
    Emitter.removeListener('LINK:OUT', this._linkOut)
  },
  mounted() {
    this._linkOver = this.linkOver.bind(this)
    this._linkOut = this.linkOut.bind(this)
    this.$el.querySelector('.hidden').style.visibility = "hidden"
    ScrollHelper.goTo(1)
      this.$nextTick(()=>{
        this.isReady = true
      })
    if(this.isFF || this.isDevice) {
      this.$el.style.visibility = 'hidden'
      return
    }
    Emitter.on('LINK:OVER', this._linkOver)
    Emitter.on('LINK:OUT', this._linkOut)


  }
}
</script>

<style lang="stylus" scoped>
.contact
  background $black
  color $white
  position relative
  height 1000vh
  width 100%
  .container
    position relative
    height 100vh
  .hidden
    display none
  svg
    width 1020px
    height 1020px
    polygon
      opacity 0
    path
      fill white
</style>


