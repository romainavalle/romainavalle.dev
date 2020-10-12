import Utils from '~/assets/js/utils/Utils'
import anime from 'animejs'

class Media {
  constructor(stage, el, id, w ,h) {
    this.h = h
    this.w = w
    this.stage = stage
    this.isBig = true
    this.stage.name = "media"
    this.el = el
    this.isVideo = false
    this.ticker = 0
    this.id = id
    this.init()

  }

  init() {
    this.imgContainer = new PIXI.Sprite()
    this.imgContainer.scale.set(1, 1.5)
    this.imgContainer.position.y = this.h * .3
    this.imgContainer.alpha = 0.1
    this.stage.addChild(this.imgContainer)

    const loader = new PIXI.loaders.Loader()

    loader.add(this.el.dataset.src).onComplete.once(() => {

      const res = loader.resources[this.el.dataset.src];

      if(this.el.tagName.toLowerCase() === 'img'){
        this.baseTexture = new PIXI.BaseTexture.fromImage(this.el.dataset.src)
      }else{
        this.isVideo = true
        const video =  document.createElement('video')
video.crossOrigin = 'anonymous'
video.preload = ''
video.src = this.el.src
        this.baseTexture = new PIXI.VideoBaseTexture(video)
        this.baseTexture.source.autoplay = true
        this.baseTexture.source.playsinline = true
        this.baseTexture.source.muted = true
        this.baseTexture.source.loop = true
        this.baseTexture.autoUpdate = false
        setTimeout(()=>{
          this.baseTexture.source.play()
        }, 1000)
        //need to comment this.source.play() in VideoBaseTexture l198!!!!!!!!!
      }
      this.img = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));

      this.imgContainer.addChild(this.img);
      this.resize()
    });
    loader.load()
  }

  tick(scrollTop) {
    if(this.isVideo) {
      if(scrollTop + this.h > this.offsetTop && scrollTop < this.offsetTop + this.img.height) {
        this.ticker++
        if(this.ticker % 3 === 0){
          if(this.isVideo) this.baseTexture.update()
          this.ticker = 0
        }
      }
    }
    if(scrollTop + this.h - this.h * .3 > this.offsetTop) {

      if(this.isBig) {
        this.isBig = false
        anime({
          targets: this.imgContainer.scale,
          y: 1,
          duration: 1000,
          easing: 'easeOutQuad'
        })
        anime({
          targets: this.imgContainer.position,
          y: 0,
          duration: 1000,
          easing: 'easeOutQuad'
        })
        anime({
          targets: this.imgContainer,
          alpha: 1,
          duration: 1000,
          easing: 'easeOutQuad'
        })
      }
    }
  }

  resize(w, h) {
    if(w && w){
      this.w = w
      this.h = h
    }
    if(!this.img)return
    const offset = Utils.offset(this.el)
    this.offsetTop = offset.top
    this.stage.position.x = offset.left
    this.stage.position.y = offset.top //+ this.h * .1 //stage offset
    this.img.width = this.el.clientWidth
    this.img.height = this.el.clientHeight

  }

  destroy() {
    if(this.isVideo){
      if(this.baseTexture)this.baseTexture.source.pause()
    }
    this.stage.destroy(true,true,true)
    this.stage.removeChildren()
  }

}

export default Media
