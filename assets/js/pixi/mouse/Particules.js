

import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
class Particules {
  constructor(stage, baseTexture) {
    this.stage = stage
    this.isKonami = false
    this.showTexture = false
    this.baseTexture = baseTexture
    this.init()
  }

  init () {
    this.particules_array = []
    this.gravity = 0.3

    this.maxX = this.w
    this.minX = 0
    this.maxY = this.h
    this.minY = 0

    this.showTexture = ''

    this.container = new PIXI.particles.ParticleContainer(1000,{
      scale: true,
      position: true,
      rotation: true,
      uvs: false,
      alpha: true
  })
    this.stage.addChild(this.container)
    this._setHover = this.setHover.bind(this)
    this._resetHover = this.resetHover.bind(this)
    this._setKonami = this.setKonami.bind(this)
    Emitter.on('LINK:OVER', this._setHover)
    Emitter.on('LINK:OUT', this._resetHover)
    Emitter.on('KONAMI', this._setKonami)

  }
  setHover(bool) {
    if(bool)this.showTexture = true
  }
  setKonami() {
    this.isKonami = true
  }
  resetHover() {
    this.showTexture = false
  }

  addPart () {
    if (!this.showTexture && !this.isKonami) return
    let particule,textureFrame

    if(this.isKonami) {
      let rand = Math.floor(Math.random() * 10)
      textureFrame = new PIXI.Rectangle(0, rand * 72 , 72, 72);
    }else{
      textureFrame = new PIXI.Rectangle(0, 0, 72, 72);
    }
    particule = new PIXI.Sprite( new PIXI.Texture(this.baseTexture, textureFrame))
    particule.scale.set(.5 + Math.random() * .2)
    particule.position.x =  this.mouseX
    particule.position.y =  this.mouseY + 10
    particule.speedX = (Math.random() - 0.5) * 10
    particule.speedY = -5 - (Math.random()) * 10

    particule.accX = (Math.random() - 0.5) * 0.1
    particule.accY = (Math.random() - 0.5) * 0.1

    particule.spin = (Math.random() - 0.5) * .1

    particule.anchor.y = 0.5
    particule.anchor.x = 0.5
    this.particules_array.push(particule)
    this.container.addChild(particule)
    particule.animation = anime({
      targets: particule,
      alpha: 0,
      duration: () =>  1000 + Math.random() * 3000,
      easing: 'easeInQuad',
      complete:  this.removeParticuleOnComplete.bind(this)
    });
  }
  removeParticuleOnComplete(anim) {
    this.removeParticule(anim.animatables[0].target)
  }
  removeParticule(p) {
    this.container.removeChild(p)
    var index = this.particules_array.indexOf(p);
    if (index > -1) {
      this.particules_array.splice(index, 1);
    }
  }

  tick (mouseX, mouseY) {
    this.mouseX = mouseX
    this.mouseY = mouseY
    let particule, i
    this.addPart()
    this.addPart()
    this.addPart()
    const array = [...this.particules_array]
    const length = this.particules_array.length;
    for (i = 0; i < length; i++) {
      particule = array[i]

      particule.position.x += particule.speedX
      particule.position.y += particule.speedY
      particule.speedX += particule.accX
      particule.speedY += particule.accY
      particule.accX += (Math.random() - 0.5) * 0.01
      particule.accY += (Math.random() - 0.5) * 0.01
      particule.rotation += particule.spin * Math.PI * 2
      if (particule.position.x > this.maxX) {
        particule.speedX *= -1
        particule.position.x = this.maxX
      } else if (particule.position.x < this.minX) {
        particule.speedX *= -1
        particule.position.x = this.minX
      }

      if (particule.position.y > this.maxY + 20) {
        this.removeParticule(particule)
      }

      particule.speedY += this.gravity
    }
  }
  resize(w,h) {
    if(w && h) {
      this.w = w
      this.h = h
    }
    this.maxX = this.w
    this.maxY = this.h
  }
  destroy() {
    this.particules_array.forEach(el =>{
      el.animation.pause()
    })
    this.particules_array = []
    Emitter.removeListener('LINK:OVER', this._setHover)
    Emitter.removeListener('LINK:OUT', this._resetHover)
    Emitter.removeListener('KONAMI', this._setKonami)
    this.stage.removeChildren()
  }
}

export default Particules;
