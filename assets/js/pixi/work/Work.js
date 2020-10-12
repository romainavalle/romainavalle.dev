

import Media from '~/assets/js/pixi/work/Media'
import Covers from '~/assets/js/pixi/work/Covers'
import mediaShader from '~/assets/js/shaders/mediaShader.js'
class Work {
  constructor(stage, path, work, w ,h) {
    this.h = h
    this.w = w
    this.path = path
    this.stage = stage
    this.stage.name = 'work'
    this.work = work
    this.shadersValues = {
      time: 0,
      scale: 0,
      direction: 1
    }
    this.pageScroll = 0
    this.easePageScroll = 0
    this.init()
  }

  init() {
    this.mediaSprite = new PIXI.Sprite()
    this.stage.addChild(this.mediaSprite)
    this.mediasArray = []

    setTimeout(()=>{
      this.medias = [].slice.call(document.querySelectorAll('.image img, .video video, .column img, .column video'))

      this.medias.forEach((el,i)=>{
        const mediaSprite = new PIXI.Sprite()
        this.mediaSprite.addChild(mediaSprite)
        const media = new Media(mediaSprite, el, i, this.w, this.h)
        this.mediasArray.push(media)
      })

    },100)
    let uniforms = {
      uTime: { type: 'f', value: this.shadersValues.time },
      uScale: { type: 'f', value: this.shadersValues.scale },
      uDirection: { type: 'f', value: this.shadersValues.direction },
      uDimensions: { type: 'v2', value: [0, 0] }
    };
    this.deformationFilter = new PIXI.Filter(null, mediaShader, uniforms);
    this.mediaSprite.filters = [ this.deformationFilter]


    this.coversSprite = new PIXI.Sprite()
    this.covers = new Covers(this.coversSprite, this.path, this.work, this.w, this.h)
    this.stage.addChild(this.coversSprite)


  }
  updateUniforms() {
    this.deformationFilter.uniforms.uTime = this.shadersValues.time++
    this.deformationFilter.uniforms.uScale = this.shadersValues.scale
  }
  tick(scrollTop, pageScroll, mouseX, mouseY) {
    this.easePageScroll =  Math.round(this.lerp(this.easePageScroll, pageScroll, 0.07)*100)/100
    const scale = (this.easePageScroll - pageScroll)/2000//3000

    this.covers.tick(mouseX, mouseY)
    this.shadersValues.scale = Math.min(.2, Math.abs(scale))
    this.deformationFilter.uniforms.uTime = this.shadersValues.time++
    this.deformationFilter.uniforms.uScale = this.shadersValues.scale

    this.deformationFilter.uniforms.uDirection = scale < 0 ? -1 : 1
    if(this.shadersValues.scale < 0.1 )this.deformationFilter.uniforms.uTime = 0

    this.mediasArray.forEach(el => {
      el.tick(scrollTop)
    });
  }
  lerp(x, y, r) {
    return x + ((y - x) * r);
  }

  resize(w, h) {
    if(w && w){
      this.w = w
      this.h = h
    }
    this.covers.resize(w,h)
    this.mediasArray.forEach(el => {
      el.resize(this.w, this.h)
    });

    this.deformationFilter.uniforms.uDimensions = [this.w, this.h]
    this.mediaSprite.filterArea = new PIXI.Rectangle(0,0,this.w,this.h);
  }

  destroy() {

    this.mediaSprite.filters = null
    this.mediasArray.forEach(el => {
      el.destroy()
    });
    //this.covers.destroy()
  }

}

export default Work
