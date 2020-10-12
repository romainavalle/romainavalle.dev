

import Cover from '~/assets/js/pixi/work/Cover'
class Covers {
  constructor(stage, path, work, w ,h) {
    this.h = h
    this.w = w
    this.stage = stage
    this.work = work
    this.path = path
    this.pourc = 0
    this.init()
  }


  init() {
    this.container = new PIXI.Sprite()
    this.stage.addChild(this.container);
    const coverSprite = new PIXI.Sprite()
    this.container.addChild(coverSprite)

    this.dim = Math.min(Math.max(Math.min(this.w, this.h) * .68, 300), 600)
    this.cover = new Cover(coverSprite, 0, this.w, this.h, this.dim)
    this.cover.load(`${this.path}${this.work.slug}/${this.work.cover}`)
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0xCC000)
    this.mask.drawCircle(0,0, this.dim / 2)
    this.stage.addChild(this.mask)
    this.container.mask = this.mask
    this.mask.scale.set(1.1)


  }

  tick(easeX, easeY) {
    this.mask.position.x = this.w / 2 - easeX/this.w * 25
    this.mask.position.y = this.h / 2 - easeY/this.h * 25
    this.container.position.x =  easeX/this.w * 25
    this.container.position.y =  easeY/this.h * 25
  }

  resize(w, h) {
    if(w && h){
      if(this.w !== w || this.h !== h) {
        this.w = w
        this.h = h
        this.dim = Math.min(Math.max(Math.min(this.w, this.h) * .68, 300), 600)
        this.mask.clear()
        this.mask.beginFill(0xCC0000)
        this.mask.drawCircle(0,0, this.dim / 2)
      }
    }
      this.cover.resize(this.w, this.h, this.dim)
  }

  destroy() {
    this.stage.destroy(true,true,true)
  }

}

export default Covers
