<template>
  <main :class="{ 'no-touch': !isTouch}" class="error">
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <v-link route="index" className="index" delay="100"><span class="label">Romain Avalle</span></v-link>
    <v-link route="works" className="works" delay="600"><span class="label">Work</span></v-link>
    <v-link route="contact" className="contact" delay="1100"><span class="label">Contact</span></v-link>
    <nuxt/>

    <no-ssr>
      <v-scene-error ref="scene" v-if="isReady"></v-scene-error>
    </no-ssr>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import MouseHelper from '~/assets/js/utils/MouseHelper'
import vTurn from '~/components/common/Turn.vue'
import vLink from '~/components/common/link.vue'
import loop from 'raf-loop'
import Konami from 'konami'
import transform from 'dom-transform'
import { mapState, mapGetters } from 'vuex';
import anime from 'animejs';
export default {

  data() {
    return {
      isTouch: false,
      showMouse: false,
      loaded: false,
      isReady: false
    }
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  components: {
    vLink, vSceneError: () => import('~/components/common/scene-error.vue'), vTurn
  },
  methods:{
     resize(){

      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      if(this.$refs.scene)this.$refs.scene.resize(w,h)
    },
    tick(){
      ScrollHelper.tick()
      MouseHelper.tick()
      const mouseX = MouseHelper.x
      const mouseY = MouseHelper.y
      const mouseEaseX = MouseHelper.easeX
      const mouseEaseY = MouseHelper.easeY
      const mouseEaseSlowX = MouseHelper.easeSlowX
      const mouseEaseSlowY = MouseHelper.easeSlowY
      const realScrollTop = ScrollHelper.scrollTop
      const scrollTop = this.isDevice ? realScrollTop : ScrollHelper.ease
      const easeY = this.isDevice ? ScrollHelper.ease : ScrollHelper.easeSlow
      if(this.$refs.scene)this.$refs.scene.tick(scrollTop, mouseX, mouseY, mouseEaseX, mouseEaseY, mouseEaseSlowX, mouseEaseSlowY, realScrollTop)
    },



  },
  mounted() {
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
    this.resize()
    setTimeout(()=>{
      this.isReady = true
      this.$nextTick(()=>{
        this.resize()
      })
    },500)
    const engine = loop(this.tick.bind(this)).start()
    this.isTouch = this.isDevice

  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  height 100%
  background #000000
  &.error a.work
    color white
  &.no-touch .scroll
    position fixed
    top 0
    left 0
    right 0
    will-change transform
  .scroll
    background #000000
.white-layer
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background white
  pointer-events none
.loader
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #000000
  will-change opacity
  z-index 100
</style>

