
import anime from 'animejs'
class ErrorSprite {
  constructor(stage, path, isDevice) {
    this.stage = stage
    this.isDevice = isDevice
    this.ratio = 1
    this.stage.name = 'index'
    this.path = path
    this.coef = 0
    this.coefScroll = 1
    this.init()

  }


  init() {

    this._handleOrientation = this.handleOrientation.bind(this)
    this.baseTexture = new PIXI.BaseTexture.from(`${this.path}404-full.png`)
    this.baseTextureOut = new PIXI.BaseTexture.from(`${this.path}404-stroke-full.png`)
    this.baseTextureOuters = new PIXI.BaseTexture.from(`${this.path}404-stroke-full-1.png`)
    const textures = [
      new PIXI.BaseTexture.from(`${this.path}404-stroke-0.png`)
    ]
    const masks = [
      new PIXI.BaseTexture.from(`${this.path}404-full-0.png`)
    ]
    this.container   = new PIXI.Sprite();
    this.container.width = 920
    this.container.height = 325
    this.stage.addChild(this.container);


    this.out_array = []
    for (let index = 0; index < 20; index++) {
      const spr = new PIXI.Sprite(new PIXI.Texture(this.baseTextureOuters))

      spr.width = 920
      spr.height = 325
      this.container.addChild(spr)
      spr.anchor.set(.5)
      this.out_array.push(spr)

    }
    this.layer = new PIXI.Sprite(new PIXI.Texture(this.baseTextureOut))
    this.container.addChild(this.layer)
    this.layer.anchor.set(.5)
    this.layer.width = 920
    this.layer.height = 325
    this.layer.anchor.set(.5)
    this.inners_array = []
      const container = new PIXI.Sprite();
      for (let index = 0; index < 20; index++) {

        const spr = new PIXI.Sprite(new PIXI.Texture(textures[0]))
        spr.id = index
        container.addChild(spr)
        spr.anchor.set(.5)

        spr.width = 920
        spr.height = 325
        this.inners_array.push(spr)
      }
      const maskSprite = new PIXI.Sprite(new PIXI.Texture(masks[0]))
      maskSprite.width = 920
      maskSprite.height = 325

      container.addChild(maskSprite)
      maskSprite.anchor.set(.5)
      container.mask = maskSprite
      this.container.addChild(container)
    this.overLay = new PIXI.Sprite(new PIXI.Texture(this.baseTexture))
    this.container.addChild(this.overLay)
    this.overLay.anchor.set(.5)
    this.overLay.width = 920
    this.overLay.height = 325
    this.overLay.anchor.set(.5)

    this.container.anchor.set(.5)
    this.stage.visible = false

    this.container.mask = this.maskSprite



  }

  handleOrientation(event) {
    var x = event.beta,
        y = event.gamma;
    this.orientationX  =  y/180;
    this.orientationY = x/180;
  }

  tick(scrollTop, mouseX, mouseY, easeSlowX, easeSlowY) {
    if(! this.stage.visible) return
    const posX = this.isDevice ? this.orientationX ||  .1 : easeSlowX/this.w-.5
    const posY = this.isDevice ? this.orientationY ||  .1 : easeSlowY/this.h-.5
    this.coefScroll = 1 - (scrollTop / (this.h/2 + 325 /2))
    this.stage.position.y = -scrollTop
    let count = 0
    this.inners_array.forEach((el,i)=>{
      if(el.id === 0) count = 0

      el.position.x = (posX) * (el.id * count) / 5 * this.coef * this.coefScroll
      el.position.y = (posY) * (el.id * count) / 5 * this.coef * this.coefScroll
      count += el.id
    })

    count = 0
    for (let index = 0; index < this.out_array.length; index++) {
      const el = this.out_array[this.out_array.length-1-index];
      el.position.x = (posX) * ((index) * count) / 5 * this.coef * this.coefScroll
      el.position.y = (posY) * ((index) * count) / 5 * this.coef * this.coefScroll
      count += index

    }
    this.container.position.x = this.w / 2 + (- posX) * 30 * this.coef
    this.container.position.y = this.h / 2 + (- posY) * 30 * this.coef
  }

  show() {
    if(this.isDevice) window.addEventListener("deviceorientation", this._handleOrientation, {passive: true});
    anime({
      targets: this.container,
      alpha: 1,
      easing: 'easeOutQuad',
      duration: 500,
      begin: ()=>{
        this.stage.visible = true
      },
      update: ()=>{
      }
    })
    if(this.coefAnim)this.coefAnim.pause()
    this.coefAnim = anime({
      targets: this,
      coef: 1,
      easing: 'easeOutQuad',
      duration: 2000,
      delay: 500
    })
    if(this.overLayAnim)this.coefAnim.pause()
    this.coefAnim = anime({
      targets: this.overLay,
      alpha: 0,
      easing: 'easeOutQuad',
      duration: 500,
      delay: 500
    })
  }

  hide() {

    if(this.isDevice) window.removeEventListener('deviceorientation', this._handleOrientation);
    if(this.coefAnim)this.coefAnim.pause()
    this.coefAnim = anime({
      targets: this,
      coef: 0,
      easing: 'easeOutQuad',
      duration: 800
    })
    if(this.overLayAnim)this.coefAnim.pause()
    this.coefAnim = anime({
      targets: this.overLay,
      alpha: 1,
      easing: 'easeOutQuad',
      duration: 800
    })
    anime({
      targets: this.container,
      alpha: 0,
      easing: 'easeOutQuad',
      duration: 800,
      complete: ()=>{
        this.stage.visible = false
      }
    })

  }

  resize(w, h) {
    if(w && w){
      this.w = w
      this.h = h
    }
    this.ratio = Math.min(this.w/1360, 1)
    this.container.scale.set(this.ratio)
  }
  destroy() {
    this.stage.removeChildren()
  }

}

export default ErrorSprite
