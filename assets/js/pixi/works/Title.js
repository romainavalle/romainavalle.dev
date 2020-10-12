

import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
class Title {
  constructor(stage, title, id, posId, isStroked = false, isBlack = false, w ,h) {
    this.h = h
    this.w = w
    this.stage = stage
    this.isStroked = isStroked
    this.isBlack = isBlack
    this.title = title
    this.isSelected = false
    this.id = id
    this.posId = posId
    this.init()
  }

  init() {

    this.container = new PIXI.Sprite()
    this.stage.addChild(this.container)
    let style
    if(this.isStroked) {
      style= new PIXI.TextStyle({fontFamily : 'avenir',lineHeight : 80, fontWeight: 900,fontSize: 95, fill: 'transparent', stroke: 0xFFFFFF, strokeThickness: 2})
    }else{
      style = new PIXI.TextStyle({fontFamily : 'avenir',lineHeight : 80, fontWeight: 900,fontSize: 95, fill: 0xFFFFFF, stroke: 0xFFFFFF, strokeThickness: 2})
    }
    const str = this.title.replace(new RegExp('<br>', 'g'),'\n').toUpperCase()
    this.text = new PIXI.Text(str, style)
    //this.text.anchor.set(1,0)
    if(this.isBlack){
      this.text.tint = 0x000000
      this.text.alpha = 0
    }
    this.textMetrics = PIXI.TextMetrics.measureText(str, style)
    this.container.addChild(this.text)

  }


  doClick() {
    //console.log('title doClick', this.id )
    this.isSelected = true
    if(this.isStroked) this.removeEvents()

    anime({
      targets: this.text,
      alpha: this.isBlack ? 1 : 0,
      duration: 400,
      easing: 'easeOutQuad'
    })
    this.text.position.y = 0

  }
  hide(y, isFast = false, isClosing = false) {
    //console.log('TITLE > hide', this.id, isFast, isClosing )
    if(this.isStroked) this.removeEvents()
    anime({
      targets: this.text.position,
      y,
      duration: isFast ? 1 : 500,
      easing: isClosing ? 'easeOutQuad' : 'easeInQuad'
    })
    anime({
      targets: this.text,
      alpha: 0,
      duration: isFast ? 1 : 500,
      easing: isClosing ? 'easeOutQuad' : 'easeInQuad'
    })
  }
  show(y) {
    //console.log('TITLE > show', this.id )
    if(this.isStroked) this.setEvents()
    this.text.position.y = y
    this.isSelected = false
    anime({
      targets: this.text.position,
      y: 0,
      duration: 1000,
      easing: 'easeInOutQuad'
    })

    anime({
      targets: this.text,
      alpha: this.isBlack ? 0 : 1,
      duration: 1000,
      easing: 'easeInOutQuad'
    })


  }
  mouseover() {
    Emitter.emit('WORK:OVER')
  }
  mouseout() {
    Emitter.emit('WORK:OUT')
  }
  mouseclick() {
    Emitter.emit('WORK:CLICK', this.id)
  }

  resize(w, h, yPos) {
    if(w && w){
      this.w = w
      this.h = h
    }
    this.stage.position.x = this.w  * .5
    this.yPos = yPos
    let scale = 1
    const ratio = 1600 / 800
    if(this.w/this.h > ratio) {
      scale = this.h / 800
    }else{
      scale = this.w / 1600
    }
    scale = Math.min(1.3, scale)

    this.container.scale.set(scale, scale)
  }
  tick(scrollTop) {
    const posY =  (this.yPos - scrollTop)
    const posX = (posY- this.h / 2) / 2
    this.container.position.y = posY
    this.container.position.x = posX


  }
  easeInOutCubic(t) {
    return t<.5 ? 2*t*t : -1+(4-2*t)*t
  }
  easeOutCubic(t) {
    return -1+(4-2*t)*t
  }
  setEvents() {
    this.stage.interactive = true
    this._mouseclick = this.mouseclick.bind(this)
    this._mouseover = this.mouseover.bind(this)
    this._mouseout = this.mouseout.bind(this)
    this.stage.on('mouseover',  this._mouseover)
    this.stage.on('mouseout',  this._mouseout)
    this.stage.on('click',  this._mouseclick)
    this.stage.on('tap',  this._mouseclick)
  }
  removeEvents() {
    this.stage.interactive = false
    this.stage.off('mouseover',  this._mouseover)
    this.stage.off('mouseout',  this._mouseout)
    this.stage.off('click',  this._mouseclick)
    this.stage.off('tap',  this._mouseclick)
  }
  destroy() {
    if(this.isStroked) this.removeEvents()
    this.stage.removeChildren()
  }


}

export default Title
