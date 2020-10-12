

import CoverNext from '~/assets/js/pixi/work/CoverNext'
import anime from 'animejs'

class CoversNext {
  constructor(stage, path, w ,h) {
    this.h = h
    this.w = w
    this.stage = stage
    this.path = path
    this.pourc = 0
    this.isShown = false
    this.init()
  }
  init() {
    this.container = new PIXI.Sprite()
    this.stage.addChild(this.container);

    this.dim = Math.min(Math.max(Math.min(this.w, this.h) * .68, 300), 600)
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0xCC000)
    this.mask.drawCircle(0,0,this.dim/2)
    this.stage.addChild(this.mask)
    this.container.mask = this.mask
    this.nextTexture = new PIXI.BaseTexture.from(`${this.path}next-0.png`)
    this.nextSprite = new PIXI.Sprite(new PIXI.Texture(this.nextTexture))
    this.nextSprite.anchor.set(0.5);
    this.stage.addChild(this.nextSprite)
    this.isReady = true
    this.isTransitionning = false
    this.nextOffset = this.h * 4
    this.stage.position.y = this.nextOffset
  }
  reset() {
    this.isReady = false
      this.resize()
    setTimeout(()=>{
      this.isTransitionning = false
    }, 300)
  }
  load(work) {
    this.resize()
    this.isReady = true

    this.isCoverLoaded = false
    this.isShown = false
    if(this.coverNext){
      this.coverNext.destroy()
      this.container.removeChildren()
    }
    const coverSprite = new PIXI.Sprite()
    this.container.addChild(coverSprite)
    this.coverNext = new CoverNext(coverSprite, 0, this.w, this.h, this.dim)
    this.isCoverLoaded = true
    this.coverNext.load(`${this.path}${work.slug}/${work.cover}`)
    this.resize()
  }

  tick(easeX, easeY, scrollTop) {
    this.mask.position.x = this.w / 2 - easeX/this.w * 25
    this.mask.position.y = this.h / 2 - easeY/this.h * 25
    this.nextSprite.position.x = this.w / 2 - easeX/this.w * 25
    this.nextSprite.position.y = this.h / 2 - easeY/this.h * 25
    this.container.position.x =  easeX/this.w * 25
    this.container.position.y =  easeY/this.h * 25
    if(!this.isTransitionning) {
      this.pourc = 0
      if(scrollTop + (this.h) > this.nextOffset - this.dim/2 && this.isCoverLoaded) {
        /*if(!this.isShown) {
          this.show()
        }*/
        this.pourc = Math.min(3000, Math.max(0,(scrollTop + (this.h)) - (this.nextOffset))) /  3000
      } /*else{
        if(this.isShown && this.isReady) {
          //this.hide()
        }
      }*/
    }
    this.nextSprite.alpha = 1- this.pourc
    const nextScale = (1.08 * this.dim / 600 + (.1 * this.pourc))
    this.nextSprite.rotation = this.pourc * Math.PI * 2
    this.nextSprite.scale.set(nextScale / 2)
    this.mask.scale.set(1 + (.1 * this.pourc))
    if(this.coverNext)this.coverNext.tick(this.pourc)

    if(! this.isTransitionning) this.stage.position.y = Math.max(this.h / 2,this.nextOffset - scrollTop - this.h / 2) - (this.pourc) * this.dim / 4
  }

  doNextTrans(){
    this.isTransitionning =true
    anime({
      targets: this.stage.position,
      y: 0,
      duration: 800,
      easing: "easeOutBack"
    })
    anime({
      targets: this,
      pourc: 1,
      duration: 100,
      easing: "easeOutQuad"
    })
  }
  transitionAlpha(alpha) {
    anime({
      targets: this.stage,
      alpha,
      duration: 500,
      easing: 'easeOutQuad',
      delay: alpha === 1 ? 0 : 500
    })
  }
  resize(w, h, nextOffset) {
    if(w && h){
      this.nextOffset = Math.max(nextOffset, this.h*2)
      if(this.w !== w || this.h !== h) {
        this.w = w
        this.h = h

        this.dim = Math.min(Math.max(Math.min(this.w, this.h) * .68, 300), 600)
        this.mask.clear()
        this.mask.beginFill(0xCC0000)
        this.mask.drawCircle(0,0, this.dim / 2)
      }
    }

    if(this.coverNext && this.isReady)this.coverNext.resize(this.w, this.h, this.dim)

  }

  destroy() {
    this.coverNext.destroy()
    this.stage.destroy(true,true,true)
    //this.stage.removeChildren()
  }

}

export default CoversNext
