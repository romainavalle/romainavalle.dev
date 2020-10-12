<template>
  <div class="svg" ref="svg">
    <v-svg />
  </div>
</template>

<script>
import transform from 'dom-transform'
import Emitter from '~/assets/js/events/EventsEmitter'
import vSvg from "~/assets/svgs/contact-1.svg?inline";

export default {
  data() {
    return {
      scale:0,
      rotation: 0
    }
  },
  components: {
    vSvg
  },
  props: ['id','networks', 'max'],
  methods:{
    resize(w,h){
      if(w,h) {
        this.w = w
        this.h = h
      }
      const maxDim = Math.max(this.w,this.h)
      this.$el.style.width = 1020 * maxDim / 1400 + 'px'
      this.$el.style.height = 1020 * maxDim / 1400 + 'px'
    },
    tick(time, sign) {
      let mod = (this.scale + time) % 1
      if(mod < 0)mod = 1 + mod
      const modRotation = (this.rotation + time)
      const scale = mod * 2.1
      transform(this.$el, {translate3d:['-50%', '-50%', 0], rotateZ: (this.id % 2 ? 1 : -1) * modRotation * 360, scale})
      this.$el.style.opacity = scale > .2 ? 1 : this.lerp(0,1, (scale/.2 -.5) * 2)
      this.$el.style.zIndex = this.max - Math.floor(mod * this.max)
    },
    lerp(x, y, r) {
      return x + ((y - x) * r);
    },
    mouseover(e){
      Emitter.emit('LINK:OVER')
    },
    mouseleave(e){
      Emitter.emit('LINK:OUT')
    },
    click(e){
      const type = e.currentTarget.className.baseVal.replace('hitarea ','')
      const network = this.networks.find(el => {return el.type === type})
      window.open(network.link, '_blank')
    }
  },
  beforeDestroyed() {
    this.polys.forEach(element => {
      element.removeEventListener('mouseover',this._mouseover)
      element.removeEventListener('mouseleave',this._mouseleave)
      element.removeEventListener('click',this._click)
    })
  },
  mounted() {
    this._mouseover = this.mouseover.bind(this)
    this._mouseleave = this.mouseleave.bind(this)
    this._click = this.click.bind(this)
    this.polys = [].slice.call(this.$el.querySelectorAll('.hitarea'))
    this.polys.forEach(element => {
      element.addEventListener('mouseover',this._mouseover)
      element.addEventListener('mouseleave',this._mouseleave)
      element.addEventListener('click',this._click)
    })

    this.scale = (this.max-this.id) / this.max
    const sign = this.id % 2 === 1 ? 1 : -1
    this.rotation = sign * Math.floor((this.id / (this.max/2)))  / (this.max/2)
  }

}
</script>

<style lang="stylus" >
.svg
  width 1020px
  height 1020px
  position absolute
  will-change transform
  transform-origin 50% 50%
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
  will-change transform, opacity
  path
    fill $white
    stroke none
  polygon
    opacity 0
    fill red
</style>
