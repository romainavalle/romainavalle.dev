import Particules from '~/assets/js/pixi/mouse/Particules'
import Mouse from '~/assets/js/pixi/mouse/Mouse'
class MouseSprite {
  constructor(stage, path) {
    this.stage = stage
    this.stage.name = "mouse"
    this.path = path
    this.init()
  }


  init() {

    this.baseTexture = new PIXI.BaseTexture.fromImage(`${this.path}icons-new-1.png`, undefined, undefined, 1)
    const particulesContainer = new PIXI.Sprite();
    this.stage.addChild(particulesContainer);
    this.particules = new Particules(particulesContainer, this.baseTexture);
    const mouseContainer = new PIXI.Sprite();
    this.stage.addChild(mouseContainer);
    this.mouse = new Mouse(mouseContainer);
  }

  onMouseOver() {
    this.mouse.onMouseOver()
  }
  onMouseOut() {
    this.mouse.onMouseOut()
  }
  onCoverOver() {
    this.mouse.onCoverOver('black')
  }
  onCoverOut() {
    this.mouse.onCoverOut('black')
  }
  onLogoOver() {
    this.mouse.onCoverOver('white')
  }
  onLogoOut() {
    this.mouse.onCoverOut('white')
  }

  changePage(pageName) {
    this.mouse.changePage(pageName)
  }


  tick(mouseX, mouseY, mouseEaseX, mouseEaseY) {
    this.particules.tick(mouseX, mouseY)
    this.mouse.tick(mouseX, mouseY, mouseEaseX, mouseEaseY)
  }

  resize(w, h) {
    if(w && w){
      this.w = w
      this.h = h
    }
    this.particules.resize(this.w, this.h)
  }
  destroy() {
    this.particules.destroy()
    this.mouse.destroy()
    this.baseTexture.destroy(true)
  }
}

export default MouseSprite
