<template>
  <main :class="{ 'no-touch': !isTouch, 'device': isDevice, 'mobile': isPhone}">
    <div class="loader" ref="loader" :style="{'background-color': work ? work.color : '#000000'}"></div>
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <v-link route="index" className="index" delay="100"><span class="label">Romain Avalle</span></v-link>
    <v-link route="works" className="works" delay="600"><span class="label">Work</span></v-link>
    <v-link route="contact" className="contact" delay="1100"><span class="label">Contact</span></v-link>
    <v-link route="works" className="close" delay="0" v-if="$route.name === 'work-slug'"><span class="glyph"></span><span class="label">Close</span></v-link>
    <div class="white-layer" v-if="$route.name === 'work-slug'"></div>
    <no-ssr>
      <v-scene ref="scene" v-if="isReady"></v-scene>
    </no-ssr>
    <div class="scroll" ref="scroll">
      <nuxt ref="page" :key="route.params.slug || route.name"/>
    </div>
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
    ...mapState(['route']),
    ...mapGetters(['isDevice', 'isPhone', 'work'])
  },
  components: {
    vLink, vScene: () => import('~/components/common/scene.vue'), vTurn
  },
  methods:{
     resize(){

      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const pageHeight = this.$refs.scroll.clientHeight
      if(this.$refs.scene)this.$refs.scene.resize(w,h)
      if(this.$refs.page && this.$refs.page.$children[0])this.$refs.page.$children[0].resize && this.$refs.page.$children[0].resize(w, h, pageHeight)
      if(!this.isDevice)document.body.style.height = pageHeight + 'px'
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
      if(this.$refs.page.$children[0])this.$refs.page.$children[0].tick && this.$refs.page.$children[0].tick(scrollTop,realScrollTop)

      if(!this.isDevice)transform(this.$refs.scroll, {translate3d: [0, -scrollTop, 0]})
      if(this.$refs.scene)this.$refs.scene.tick(scrollTop, mouseX, mouseY, mouseEaseX, mouseEaseY, mouseEaseSlowX, mouseEaseSlowY, realScrollTop)
    },

    pageFadeOut(cb) {
      this.animation = anime({
        targets: this.$refs.scroll,
        opacity: 0,
        duration: 800,
        easing: 'easeInQuad',
        complete: cb
      });
    },
    pageFadeIn(delay) {
      this.animation = anime({
        targets: this.$refs.scroll,
        opacity: 1,
        duration: 750,
        delay,
        easing: 'easeOutQuad'
      });
    },
    setRouterHooks () {
      this.$router.beforeEach((to, from, next) => {

        if(this.$refs.scene) this.$refs.scene.beforeChangePage(from.name, to.name)
          this.pageFadeOut(next)
          if(from.name === 'work-slug' && to.name === 'works' && !this.isDevice)ScrollHelper.scrollTo(0)
          //if(from.name === 'contact') this.$refs.page.$children[0].hide()
      })
      this.$router.afterEach((to, from) => {

        ScrollHelper.goTo(to.name === 'contact' ? 10 : 1)
        this.$refs.scene.changePage()
        this.resize()
        if(to.name !== 'works')setTimeout(this.resize.bind(this), 200)
        if(this.isTouch) {
          this.animation = anime({
            targets: this.$refs.scroll,
            opacity: 1,
            duration: 750,
            easing: 'easeOutQuad'
          });
        }else{
          this.pageFadeIn(300)
        }
      })
    }
  },
  mounted() {
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
    new Konami(() =>{ Emitter.emit('KONAMI')});
    this.resize()
    setTimeout(()=>{
      this.isReady = true
      this.$nextTick(()=>{
        this.resize()
      })
    },500)
    const engine = loop(this.tick.bind(this)).start()
    this.setRouterHooks()
    this.isTouch = this.isDevice

      this.animation = anime({
        targets: this.$refs.loader,
        opacity: .5,
        duration: 500,
        easing: 'easeInQuad',
        delay: 300,
        complete: () => {
          this.$el.removeChild(this.$refs.loader)
        }
      });
  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  height 100%
  background #000000
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

