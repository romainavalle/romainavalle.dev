
import anime from 'animejs'
class IndexSprite {
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
   /* this.element = document.createElement('p');
    document.body.appendChild(this.element)
    this.element.style.position ='fixed'
    this.element.style.zIndex = 999
    this.element.style.fontSize = 20
    this.element.style.top = '20px'
    this.element.style.left = '20px'
    this.element.style.color = '#ffffff'*/
    this.logoW = this.isDevice ? 440 : 920
    this.logoH = this.isDevice ? 765 : 340
    const mobilePrefix = this.isDevice ? '-mobile' : '-1'
    this._handleOrientation = this.handleOrientation.bind(this)
    this.baseTexture = new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-full.png`)
    //this.baseTextureOut = new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-stroke-full.png`)
    const textures = [
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-stroke-0.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-stroke-1.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-stroke-2.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-stroke-3.png`)
    ]
    const masks = [
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-full-0.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-full-1.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-full-2.png`),
      new PIXI.BaseTexture.from(`${this.path}logo${mobilePrefix}-full-3.png`)
    ]
    this.container   = new PIXI.Sprite();
    this.container.width = this.logoW
    this.container.height = this.logoH
    this.stage.addChild(this.container);
    /*this.out_array = []
    for (let index = 0; index < 20; index++) {
      const spr = new PIXI.Sprite(new PIXI.Texture(this.baseTextureOut))

      spr.width = this.logoW
      spr.height = this.logoH
      this.container.addChild(spr)
      spr.anchor.set(.5)
      this.out_array.push(spr)

    }*/
    this.inners_array = []
    for (let i = 0; i < 4; i++) {
      const container = new PIXI.Sprite();
      for (let index = 0; index < 20; index++) {

        const spr = new PIXI.Sprite(new PIXI.Texture(textures[i]))
        spr.id = index
        container.addChild(spr)
        spr.anchor.set(.5)

        spr.width = this.logoW
        spr.height = this.logoH
        this.inners_array.push(spr)
      }
      const maskSprite = new PIXI.Sprite(new PIXI.Texture(masks[i]))
      maskSprite.width = this.logoW
      maskSprite.height = this.logoH

      container.addChild(maskSprite)
      maskSprite.anchor.set(.5)
      container.mask = maskSprite
      this.container.addChild(container)
    }
    this.overLay = new PIXI.Sprite(new PIXI.Texture(this.baseTexture))
    this.container.addChild(this.overLay)
    this.overLay.anchor.set(.5)
    this.overLay.width = this.logoW
    this.overLay.height = this.logoH

    this.container.anchor.set(.5)
    this.stage.visible = false

    this.container.mask = this.maskSprite
    if(this.isDevice)this.stage.position.y = 10


  }

  handleOrientation(event) {
    var x = event.beta - 35,
        y = event.gamma;
        //this.element.innerHTML = x
    this.orientationX  =  y/180;
    this.orientationY = x/180;
  }

  tick(scrollTop, mouseX, mouseY, easeSlowX, easeSlowY) {
    if(! this.stage.visible) return
    const posX = this.isDevice ? this.orientationX ||  .1 : easeSlowX/this.w-.5
    const posY = this.isDevice ? this.orientationY ||  .1 : easeSlowY/this.h-.5
    this.coefScroll = 1 - (scrollTop / (this.h/2 + this.logoH /2))
    if(!this.isDevice)this.stage.position.y = -scrollTop
    let count = 0
    this.inners_array.forEach((el,i)=>{
      if(el.id === 0) count = 0

      el.position.x = (posX) * (el.id * count) / 5 * this.coef * this.coefScroll
      el.position.y = (posY) * (el.id * count) / 5 * this.coef * this.coefScroll
      count += el.id
    })

    count = 0
   /* for (let index = 0; index < this.out_array.length; index++) {
      const el = this.out_array[this.out_array.length-1-index];
      el.position.x = (posX) * ((index) * count) / 5 * this.coef * this.coefScroll
      el.position.y = (posY) * ((index) * count) / 5 * this.coef * this.coefScroll
      count += index

    }*/
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
    this.ratio = Math.min(this.isDevice ? this.h/1100 : this.w/1360, 1)
    //this.container.position.x = this.w / 2
    //this.container.position.y = this.h / 2
    this.container.scale.set(this.ratio)
  }
  destroy() {
    this.stage.removeChildren()
  }

}

export default IndexSprite
