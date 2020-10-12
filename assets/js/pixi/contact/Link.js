
import Emitter from '~/assets/js/events/EventsEmitter'
class Link {
  constructor(stage,  link) {
    this.stage = stage
    this.link = link
    this.init()
  }

  init() {
    this.linkSpr = new PIXI.Sprite()
    this.stage.addChild(this.linkSpr)

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0x004411)
    graphics.drawPolygon(this.link.polygon);
    graphics.endFill();
    graphics.alpha = 0
    this.linkSpr.addChild(graphics);
    this.linkSpr.interactive = true

    this._mouseclick = this.mouseclick.bind(this)
    this._mouseover = this.mouseover.bind(this)
    this._mouseout = this.mouseout.bind(this)
    this.linkSpr.on('click', this._mouseclick)
    this.linkSpr.on('tap', this._mouseclick)
    this.linkSpr.on('mouseover', this._mouseover)
    this.linkSpr.on('mouseout', this._mouseout)
  }

  mouseclick() {
    window.open(this.link.link, '_blank')
  }
  mouseover() {
    Emitter.emit('LINK:OVER')
  }
  mouseout() {
    Emitter.emit('LINK:OUT')
  }

  resize(w, h) {
    if (w && w) {
      this.w = w
      this.h = h
    }
    this.linkSpr.x = -1020 / 2
    this.linkSpr.y = -1020 / 2

  }
  destroy() {
    if(this.timer)clearTimeout(this.timer)
    this.linkSpr.removeAllListeners()
  }
}

export default Link;
