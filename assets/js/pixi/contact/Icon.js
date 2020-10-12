
import anime from 'animejs';
class Icon {

  constructor(stage,  baseTexture) {
    this.stage = stage
    this.baseTexture = baseTexture
    this.init()
  }

  init() {
    this.hand = new PIXI.Sprite()
    this.stage.addChild(this.hand)
    this.handImage = new PIXI.Sprite(new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(0, 72, 72, 72)))
    this.hand.addChild(this.handImage)
    this.handImage.anchor.set(0.5);
    this.puke = new PIXI.Sprite()
    this.stage.addChild(this.puke)
    this.pukeImage = new PIXI.Sprite(new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(0, 144, 72, 72)))
    this.pukeImage.anchor.set(0.5);
    this.handImage.width = 36
    this.handImage.height = 36
    this.pukeImage.width = 36
    this.pukeImage.height = 36
    this.puke.addChild(this.pukeImage)
    this.puke.alpha = 0

    anime({
      targets: this.pukeImage.scale,
      x: [.45, .55],
      y: [.45, .55],
      duration: 100,
      easing: 'easeOutQuad',
      loop: true,
      direction: 'alternate',
    });
    anime({
      targets: this.pukeImage,
      rotation: [Math.PI/20, -Math.PI/20],
      duration: 30,
      easing: 'easeOutQuad',
      loop: true,
      direction: 'alternate',
    });
  }

  showPuke() {
    anime({
      targets: this.hand,
      alpha: 0,
      duration: 250,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.hand.scale,
      x: 0,
      y:0,
      duration: 250,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.puke.scale,
      x: 1,
      y: 1,
      duration: 250,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.puke,
      alpha: 1,
      duration: 250,
      easing: 'easeOutQuad'
    });
  }
  hidePuke() {
    anime({
      targets: this.puke,
      alpha: 0,
      duration: 250,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.puke.scale,
      x: 0,
      y:0,
      duration: 250,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.hand.scale,
      x: 1,
      y: 1,
      duration: 250,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.hand,
      alpha: 1,
      duration: 500,
      easing: 'easeOutQuad'
    });

  }

  resize(w, h) {
    if (w && w) {
      this.w = w
      this.h = h
    }
  }
}

export default Icon;
