


class Cover {
  constructor(stage, id, w ,h, dim) {
    this.h = h
    this.w = w
    this.stage = stage
    this.dim = dim
    this.id = id
    this.init()
  }

  init() {
    this.resize()
  }

  load(cover) {

    this.baseTexture = new PIXI.BaseTexture.fromImage(cover)
    this.coverSprite = new PIXI.Sprite();
    this.stage.addChild(this.coverSprite);
    this.cover = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));
    this.coverSprite.addChild(this.cover);

    this.cover.width = this.dim * 1.2
    this.cover.height = this.dim * 1.2
    this.coverSprite.anchor.set(0.5);
    this.cover.anchor.set(0.5);

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
    }
  }

  destroy() {
    //this.baseTexture.destroy(true)
  }

}

export default Cover
