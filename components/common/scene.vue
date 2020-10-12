<template>
  <canvas :class="[{'events': canvasEvents}, $route.name]"></canvas>
</template>
<script>
import anime from 'animejs';
import transform from 'dom-transform';
import ContactSprite from '~/assets/js/pixi/contact/ContactSprite'
import IndexSprite from '~/assets/js/pixi/index/IndexSprite'
import Works from '~/assets/js/pixi/works/Works'
import MouseSprite from '~/assets/js/pixi/mouse/MouseSprite'
import Emitter from '~/assets/js/events/EventsEmitter'
if(process.browser) {
  require('pixi.js')
}
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'scene',
  data(){
    return {
      w: 0
    }
  },
  computed: {
    ...mapState(['works', 'contact', 'path', 'currentWork', 'nextOffset']),
    ...mapGetters(['work', 'workId', 'nextWork', 'isFF','isDevice']),
    canvasEvents() {
      return ((this.$route.name === 'works' && !this.isDevice ) || (this.$route.name === 'contact' && (this.isFF || this.isDevice)) )
    }
  },
  methods:{
    ...mapActions(['setCurrentWork']),
    tick(scrollTop, mouseX, mouseY,mouseEaseX, mouseEaseY, mouseEaseSlowX, mouseEaseSlowY,realScrollTop) {
      if(this.worksSprite)this.worksSprite.tick(scrollTop, realScrollTop, mouseEaseX, mouseEaseY, mouseEaseSlowX, mouseEaseSlowY)
      if(this.mouseSprite) this.mouseSprite.tick( mouseX, mouseY, mouseEaseX, mouseEaseY)
      if(this.contactSprite)this.contactSprite.tick(scrollTop);
      this.indexSprite.tick(scrollTop, mouseX, mouseY, mouseEaseSlowX, mouseEaseSlowY);
      this.app.renderer.render(this.app.stage);

    },
    resize(w, h) {
      if(w && h) {
        this.h = h
        this.w = w
      }
      if(this.worksSprite)this.worksSprite.resize(this.w, this.h)
      if(this.mouseSprite) this.mouseSprite.resize(this.w, this.h);
      if(this.contactSprite)this.contactSprite.resize(this.w, this.h);
      this.indexSprite.resize(this.w, this.h);
      this.app.renderer.resize(this.w, this.h);

    },
    setPixi() {
      this.app = new PIXI.Application({
        transparent: true,
        autoStart: false,
        autoResize: true,
        antialias:true,
        powerPreference: "high-performance",
        view: this.$el,
        resolution: window.devicePixelRatio,
        legacy: true //flickering on old browser
      });

      //
      let path = this.path
      if(this.w < 600) {
        path = path.replace('f_auto','f_auto,w_600')
      }
      else if(this.w < 1000) {
        path = path.replace('f_auto','f_auto,w_1000')
      }

      this.indexSpriteContainer = new PIXI.Sprite();
      this.indexSprite = new IndexSprite(this.indexSpriteContainer, path, this.isDevice);
      this.app.stage.addChild(this.indexSpriteContainer);

      //
      if(!this.isDevice) {
        this.worksSpriteContainer = new PIXI.Sprite();
        this.worksSprite = new Works(this.worksSpriteContainer, this.works, path);
        this.app.stage.addChild(this.worksSpriteContainer);
        this.worksSprite.setPage(this.$route.name)
      }
      //
      if(this.isFF || this.isDevice) {
        this.contactSpriteContainer = new PIXI.Sprite();
        this.contactSprite = new ContactSprite(this.contactSpriteContainer,  path, this.contact);
        this.app.stage.addChild(this.contactSpriteContainer);
      }
      //
      if(!this.isDevice) {
        this.mouseSpriteContainer = new PIXI.Sprite();
        this.mouseSprite = new MouseSprite(this.mouseSpriteContainer, path);
        this.app.stage.addChild(this.mouseSpriteContainer);
      }else{
        this.app.renderer.plugins.interaction.autoPreventDefault = false
      }
    },
    animateIn() {
      this.resize()
    },
    setEvents() {
      this._workOver = this.workOver.bind(this)
      this._workOut = this.workOut.bind(this)
      this._workClick = this.workClick.bind(this)
      this._onMouseOver = this.onMouseOver.bind(this)
      this._onMouseOut = this.onMouseOut.bind(this)
      this._onCoverOver = this.onCoverOver.bind(this)
      this._onCoverOut = this.onCoverOut.bind(this)
      this._onLogoOver = this.onLogoOver.bind(this)
      this._onLogoOut = this.onLogoOut.bind(this)
      this._workIdChange = this.workIdChange.bind(this)
      Emitter.on('WORK:OVER', this._workOver)
      Emitter.on('WORK:OUT', this._workOut)
      Emitter.on('WORK:CLICK', this._workClick)
      Emitter.on('LINK:OVER',this._onMouseOver)
      Emitter.on('LINK:OUT',this._onMouseOut)
      Emitter.on('COVER:OVER',this._onCoverOver)
      Emitter.on('COVER:OUT',this._onCoverOut)
      Emitter.on('LOGO:OVER',this._onLogoOver)
      Emitter.on('LOGO:OUT',this._onLogoOut)
      Emitter.on('WORK:OVER',this._onMouseOver)
      Emitter.on('WORKID:CHANGE', this._workIdChange)
    },
    workIdChange(id) {
      //console.log('workIdChange', id);

      this.setCurrentWork(id)
    },
    workOver() {
      this.onMouseOver()
    },
    workOut() {
      this.onMouseOut()
    },

    workClick(id) {
      if(this.worksSprite)this.worksSprite.doClick(id)
      this.$router.push({name:'work-slug', params: { slug: this.works[id % this.works.length ].slug }})
    },
    onMouseOver(e) {
      if(this.mouseSprite) this.mouseSprite.onMouseOver()
    },
    onMouseOut() {
      if(this.mouseSprite) this.mouseSprite.onMouseOut()
    },
    onCoverOver(e) {
      if(this.mouseSprite) this.mouseSprite.onCoverOver()
    },
    onCoverOut() {
      if(this.mouseSprite) this.mouseSprite.onCoverOut()
    },
    onLogoOver(e) {
      if(this.mouseSprite) this.mouseSprite.onLogoOver()
    },
    onLogoOut() {
      if(this.mouseSprite) this.mouseSprite.onLogoOut()
    },
    reset(){
      this.links_array.forEach(element => {
        element.removeEventListener('mouseover', this._onMouseOver, )
        element.removeEventListener('mouseout', this._onMouseOut)
      });
    },
    beforeChangePage(fromPageName, toPageName) {
      this.reset()
      switch(fromPageName){
        case 'index':
          this.indexSprite.hide()
        break
        case 'contact':
          if(this.contactSprite)this.contactSprite.hide()
        break
        case 'works':
          if(toPageName === 'work-slug') {
            if(this.worksSprite)this.worksSprite.setWorkSelected(true)
            if(this.worksSprite)this.worksSprite.transitionBetweenWorksAndWork()
            }else{
            if(this.worksSprite)this.worksSprite.hide()
          }
        break
        case 'work-slug':
          if(toPageName === 'works') {
            if(this.worksSprite)this.worksSprite.transitionBetweenWorkAndWorks()
          }else{
            if(this.worksSprite)this.worksSprite.hide()
            if(this.worksSprite)this.worksSprite.hideWork(toPageName === 'work-slug')
            if(toPageName === 'work-slug' && this.worksSprite)this.worksSprite.doNextTrans()
          }
        break
      }
    },
    changePage(isFast = false) {
      //console.log('changePage');

      this.$nextTick(()=>{
        this.links_array = [].slice.call(document.querySelectorAll('a'))
        this.links_array.forEach(element => {
          element.addEventListener('mouseover', this._onMouseOver, {passive: true})
          element.addEventListener('mouseout', this._onMouseOut, {passive: true})
        });
      })
      //console.log('works change page',this.currentWork);

      if(this.worksSprite)this.worksSprite.setCurrentId(this.currentWork)
      if(this.mouseSprite) this.mouseSprite.changePage(this.$route.name)
      switch(this.$route.name){
        case 'index':
          this.indexSprite.show()
        break
        case 'contact':
          if(this.contactSprite)this.contactSprite.show()
        break
        case 'works':
          if(this.worksSprite)this.worksSprite.showWorks(isFast)
          this.resize()
        break
        case 'work-slug':
          //console.log('works chagne page',this.workId);

          if(this.worksSprite)this.worksSprite.showWork(this.workId, isFast, this.work, this.nextWork)
          this.setCurrentWork(this.workId)
        break
      }
      if(this.worksSprite)this.worksSprite.setPage(this.$route.name)
    }
  },
  watch: {
    currentWork(val) {
      //console.log('watch', val)
      if(this.worksSprite) this.worksSprite.setCurrentId(val)
    },
    nextOffset(val) {
      if(this.worksSprite) this.worksSprite.nextOffset = val

      this.resize()
    }
  },

  beforeDestroy() {
    if(this.mouseSprite) this.mouseSprite.destroy()
    Emitter.removeListener('LINK:OVER',this._onMouseOver)
    Emitter.removeListener('LINK:OUT',this._onMouseOut)
    Emitter.removeListener('WORK:OVER',this._onMouseOver)
    Emitter.removeListener('WORK:OUT',this._onMouseOut)
    Emitter.removeListener('WORK:OVER', this._workOver)
    Emitter.removeListener('WORK:OUT', this._workOut)
    Emitter.removeListener('WORK:CLICK', this._workClick)

    Emitter.removeListener('WORKID:CHANGE', this._workIdChange)
  },
  mounted() {
    this.w = window.innerWidth
    this.setPixi()
    this.setEvents()
    document.querySelector('.scroll').style.top = '1px'
    Emitter.emit('GLOBAL:RESIZE')
    this.$nextTick(()=>{
      this.changePage(true)
      document.querySelector('.scroll').style.top = 0
    })
    anime({
      targets: this.$el,
      opacity: [0,1],
      easing: 'easeInQuad',
      duration: 2000
    })
  }
}

</script>

<style lang="stylus" scoped>
canvas
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 2
  pointer-events none
  .device &.index
    position relative
  &.events
    pointer-events auto
</style>
