

class CoverNext {
  constructor(stage, id, w ,h, dim) {
    this.h = h
    this.w = w
    this.dim = dim
    this.stage = stage
    this.id = id
    this.init()
  }

  init() {
    this.resize()
  }

  load(cover) {
    //console.log('COVERNext - load', this.w, this.h);

    this.baseTexture = new PIXI.BaseTexture.fromImage(cover)
    this.coverSprite = new PIXI.Sprite();
    this.stage.addChild(this.coverSprite);
    this.cover = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));
    this.coverBw = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));
    this.coverSprite.addChild(this.coverBw);
    this.coverSprite.addChild(this.cover);

    this.cover.width = this.dim * 1.2
    this.cover.height = this.dim * 1.2
    this.coverBw.width = this.dim * 1.2
    this.coverBw.height = this.dim * 1.2
    this.coverSprite.rotation = -Math.PI / 3
    this.coverSprite.anchor.set(0.5);
    this.cover.anchor.set(0.5);
    this.cover.alpha = 0
    this.coverBw.anchor.set(0.5);
    this.coverSprite.scale.set(1.2,1.2)
    const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    this.coverBw.filters = [colorMatrix];
    colorMatrix.blackAndWhite();
    this.resize()

  }



  tick(pourc) {
    if(this.coverSprite) {
      this.coverSprite.rotation = -Math.PI / 3 + (Math.PI / 3 * pourc)
      this.coverSprite.scale.set(1.2 - (.2 * pourc))
      this.cover.alpha = pourc
    }
  }

  resize(w, h, dim) {
    if(w && w){
      this.w = w
      this.h = h
      this.dim = dim
    }
    this.stage.x = this.w / 2;
    this.stage.y = this.h / 2;
    if(this.coverSprite) {
      this.cover.width = this.dim * 1.2
      this.cover.height = this.dim * 1.2
      this.coverBw.width = this.dim * 1.2
      this.coverBw.height = this.dim * 1.2

    }
  }

  destroy() {
    //this.baseTexture.destroy()
    //this.stage.removeChildren()
  }

}

export default CoverNext
