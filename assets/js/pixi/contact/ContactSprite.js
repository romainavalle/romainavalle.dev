import Circle from '~/assets/js/pixi/contact/Circle'
import Icon from '~/assets/js/pixi/contact/Icon'
import Emitter from '~/assets/js/events/EventsEmitter'
import anime from 'animejs'
class ContactSprite {
  constructor(stage, path, contacts) {

    this.stage = stage
    this.stage.name = "contact"
    this.path = path
    this.time = 0
    this.tempEase = 0
    this.minVal = .001
    this.isScrolling = false
    this.sign = 1
    this.contacts = contacts
    this.speedScale = 1
    this.isShown = true
    this.init()

  }


  init() {

    this.baseTexture = new PIXI.BaseTexture.fromImage(`${this.path.replace(',w_600', '')}icons-new-1.png`, undefined, undefined, 1.0)
    this.iconContainer = new PIXI.Sprite();
    this.stage.addChild(this.iconContainer);
    this.icon = new Icon(this.iconContainer, this.baseTexture);
    this.circlesContainer = new PIXI.Sprite();
    this.circles_array = []
    this.stage.addChild(this.circlesContainer);


    for (let index = 0; index < 4; index++) {
      const circleContainer = new PIXI.Sprite();
      this.circlesContainer.addChild(circleContainer);
      this.circle = new Circle(circleContainer, index, this.path, this.contacts);
      this.circles_array.push(this.circle)
    }
    this._linkOver = this.linkOver.bind(this)
    this._linkOut = this.linkOut.bind(this)
    Emitter.on('LINK:OVER', this._linkOver)
    Emitter.on('LINK:OUT', this._linkOut)
    this.stage.alpha = 0
    this.stage.scale.set(0)
    this.stage.anchor.set(0.5)
  }

  show() {
    this.isShown = true
    anime({
      targets: this.stage,
      alpha: 1,
      duration: 800,
      easing: 'easeOutQuad'
    })
    anime({
      targets: this.stage.scale,
      x: [.2, 1],
      y: [.2, 1],
      duration: 800,
      easing: 'easeOutQuad'
    })
  }

  hide() {
    this.isShown = false
    anime({
      targets: this.stage,
      alpha: 0,
      duration: 700,
      easing: 'easeOutQuad'
    })
    anime({
      targets: this.stage.scale,
      x: 2,
      y: 2,
      duration: 700,
      easing: 'easeOutQuad'
    })
  }


  linkOver() {
    this.animation = anime({
      targets: this,
      speedScale: 0,
      duration: 700,
      easing: 'easeInCubic'
    });
  }

  linkOut() {
    this.animation = anime({
      targets: this,
      speedScale: 1,
      duration: 700,
      easing: 'easeOutCubic'
    });
  }

  onLoaded() {
  }

  tick(easeY) {
    if(!this.isShown ) return
    const diff = (this.tempEase - easeY) * this.speedScale
    const absDiff = Math.abs(diff / 1000)
    let val = Math.max(this.minVal * this.speedScale , absDiff)
    if(val !== this.minVal) {
      if(diff < 0) {
        this.sign = -1
      }
      if(diff > 0) {
        this.sign = 1
      }
    }
    if(absDiff > .002) {
      if(!this.isScrolling) {
        this.isScrolling = true
        this.icon.showPuke()
      }
    }else{
      if(this.isScrolling) {
        this.isScrolling = false
        this.icon.hidePuke()
      }
    }
    this.time += val * this.sign
    this.time %= 1
    this.tempEase = easeY
    this.circles_array.forEach((el)=>{
      el.tick(this.time,this.sign)
    })
  }

  resize(w, h) {
    if(w && h){
      this.w = w
      this.h = h
    }
    this.circles_array.forEach((el)=>{
      el.resize(this.w, this.h)
    })
    this.icon.resize(this.w, this.h)
    this.stage.position.x = this.w * .5
    this.stage.position.y = this.h * .5

    if(this.w < 600) {
      this.iconContainer.scale.set(.75)
    }

  }
  destroy() {
    this.circles_array.forEach((el)=>{
      el.destroy()
    })
    this.particules.destroy()
    Emitter.removeListener('LINK:OVER', this._linkOver)
    Emitter.removeListener('LINK:OUT', this._linkOut)
    this.baseTexture.destroy(true)
  }

}

export default ContactSprite
