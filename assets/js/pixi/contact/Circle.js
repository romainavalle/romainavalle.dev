import Link from '~/assets/js/pixi/contact/Link'

class Circle {
  constructor(stage, id, path, contacts) {
    this.stage = stage
    this.parent = this.stage.parent
    this.id = id
    this.path = path
    this.contacts = contacts
    this.scale = (4-this.id) / 4
    this.rotation = this.id / 4
    this.isSwaped = true
    this.init()
  }

  init() {
    this.circle = new PIXI.Sprite()
    this.circleImg =  new PIXI.Sprite.fromImage(`${this.path}contact-2.png`)
    this.circleImg.scale.set(.5)

    this.circle.addChild(this.circleImg)
    this.circle.name = `circle-${this.id}`
    this.stage.addChild(this.circle)
    this.circleImg.pivot.set(.5, .5)
    this.circleImg.anchor.set(0.5);

    this.links_array =[]
    for (let index = 0; index < 4; index++) {
      const linkSpr = new PIXI.Sprite()
      this.circle.addChild(linkSpr)
      const link = new Link(linkSpr, this.contacts.networks[index])
      this.links_array.push(link)
    }
  }

  tick(time, sign) {
    let mod = (this.scale + time) % 1
    if(mod < 0)mod = 1 + mod
    const modRotation = (this.rotation + time)
    const scale = mod * (this.w > 600 ? 2.1 : 2.5)
    if(sign>0) {
      if(Math.round(scale * 100) / 100 < 0.1){
        if(!this.isSwaped) {
          this.parent.removeChild(this.stage)
          this.parent.addChild(this.stage)
          this.isSwaped = true
        }
      }else{
        if(this.isSwaped)this.isSwaped = false
      }
    } else {
      if(Math.round(scale*100)/100 > (this.w > 600 ? 2 : 2.4)) {
        if(!this.isSwaped) {
          this.parent.removeChild(this.stage)
          this.parent.addChild(this.stage)
          this.isSwaped = true
        }
      } else {
          if(this.isSwaped)this.isSwaped = false
      }
    }
    this.circle.scale.set(scale  )
    this.circle.alpha = scale > .2 ? 1 : this.lerp(0,1, (scale/.2 -.5) * 2)
    this.circle.rotation = (this.id % 2 ? 1 : -1) * modRotation * Math.PI * 2
  }
  lerp(x, y, r) {
    return x + ((y - x) * r);
  }

  resize(w, h) {
    if (w && w) {
      this.w = w
      this.h = h
    }

    this.links_array.forEach((el)=>{
      el.resize(this.w, this.h)
    })
  }
  destroy() {
    this.links_array.forEach((el)=>{
      el.destroy()
    })
  }
}

export default Circle;
