

import coverShader from '~/assets/js/shaders/coverShader.js'
import anime from 'animejs'
class Cover {
  constructor(stage, id, w ,h, dim) {
    this.h = h
    this.w = w
    this.stage = stage
    this.id = id
    this.time = 0
    this.dim = dim
    this.bwScale = .1
    this.uniforms = {}
    this.isSelected = false
    this.shadersValues = {
      time: 0,
      opacity: 0,
      scale: 1
    }
    this.init()
  }

  init() {
  }

  load(cover) {
    //console.log('COVER - load', this.w, this.h);
    this.baseTexture = new PIXI.BaseTexture.fromImage(cover)
    this.coverSprite = new PIXI.Sprite();
    this.stage.addChild(this.coverSprite);
    this.cover = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));
    this.coverBw = new PIXI.Sprite(new PIXI.Texture(this.baseTexture));
    this.coverSprite.addChild(this.coverBw);
    this.coverSprite.addChild(this.cover);
    this.cover.alpha = 0

    this.cover.width = this.dim * 1.2
    this.cover.height = this.dim * 1.2
    this.coverBw.width = this.dim * 1.2
    this.coverBw.height = this.dim * 1.2
    this.coverSprite.rotation = -Math.PI / 3
    this.coverSprite.anchor.set(0.5);
    this.cover.anchor.set(0.5);
    this.coverBw.anchor.set(0.5);
    this.coverSprite.scale.set(1.2,1.2)
    let uniforms = {
      uScale: { type: 'f', value: this.shadersValues.scale },
      uOpacity: { type: 'f', value: this.shadersValues.opacity },
      uTime: { type: 'f', value: this.shadersValues.time }
    };
    this.deformationFilter = new PIXI.Filter(null, coverShader, uniforms);
    this.coverBw.filters = [ this.deformationFilter]
  }



  onLoaded() {



  }
  doClick() {
    //console.log('COVER doClick', this.id);

    if(this.coverAlphaAnim)this.coverAlphaAnim.pause()
    this.show()
    this.coverAlphaAnim = anime({
      targets: this.cover,
      alpha: 1,
      duration: 500,
      delay: 400,
      easing: "easeOutQuad"
    })
  }

  resetClick() {
    //console.log('COVER resetClick', this.id);
    this.coverAlphaAnim = anime({
      targets: this.cover,
      alpha: 0,
      duration: 500,
      delay: 400,
      easing: "easeOutQuad"
    })

  }

  hide() {
    //console.log('COVER hide', this.id);
    if(this.rotateAnime) {
      this.rotateAnime.pause()
      this.scaleAnime.pause()
      this.shaderAnimation.pause()
    }
    this.rotateAnime = anime({
      targets: this.coverSprite,
      rotation: Math.PI / 3,
      duration: 800,
      easing: "easeOutQuad",
      complete:()=>{
        this.coverSprite.rotation = -Math.PI / 3
      }
    })
    this.scaleAnime = anime({
      targets: this.coverSprite.scale,
      x: 1.2,
      y: 1.2,
      alpha: 1,
      duration: 800,
      easing: "easeOutQuad"
    })
    this.shaderAnimation = anime({
      targets: this.shadersValues,
      opacity: 0,
      scale: 1,
      time: 60,
      duration: 800,
      easing: 'easeOutQuad',
      update: this.updateUniforms.bind(this),
      complete: () =>{
        //console.log("out complete")
      }
    });
    this.resetClick()
  }

  show() {
    //console.log('COVER show', this.id);
    if(this.rotateAnime) {
      this.rotateAnime.pause()
      this.scaleAnime.pause()
      this.shaderAnimation.pause()
    }
    this.rotateAnime = anime({
      targets: this.coverSprite,
      rotation: 0,
      duration: 800,
      easing: "easeOutQuad"
    })
    this.scaleAnime = anime({
      targets: this.coverSprite.scale,
      x: 1,
      y: 1,
      alpha: 1,
      duration: 800,
      easing: "easeOutQuad"
    })
    this.shaderAnimation = anime({
      targets: this.shadersValues,
      opacity: 1,
      scale: 0,
      time: [0 , 30],
      duration: 800,
      easing: 'easeOutQuad',
      update: this.updateUniforms.bind(this),
      complete: () =>{
        //console.log("in complete")
      }
    });

  }

  updateUniforms() {
    this.deformationFilter.uniforms.uTime = this.shadersValues.time
    this.deformationFilter.uniforms.uScale = this.shadersValues.scale
    this.deformationFilter.uniforms.uOpacity = this.shadersValues.opacity
  }


  normalize(min, max, x) {
  }
  resize(w, h, dim) {
    if(w && w){
      this.w = w
      this.h = h
      this.dim = dim
    }
    if(this.coverSprite) {
      this.coverSprite.x = this.w / 2;
      this.coverSprite.y = this.h / 2;
      this.cover.width = this.dim * 1.2
      this.cover.height = this.dim * 1.2
      this.coverBw.width = this.dim * 1.2
      this.coverBw.height = this.dim * 1.2

    }
  }

  destroy() {
    this.baseTexture.destroy(true)
  }

}

export default Cover
