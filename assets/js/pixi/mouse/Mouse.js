


import anime from 'animejs'
class Mouse {
  constructor(stage, baseTexture) {
    this.stage = stage
    this.customEase = []
    this.particules = 1
    this.init()
  }

  init () {
    this.point =  new PIXI.Graphics()
    this.point.beginFill(0xffffff, 1);
    this.point.drawCircle(0, 0, 2);
    this.point.endFill();
    this.stage.addChild(this.point)
    this.circle = new PIXI.Graphics()
    this.circle.lineStyle(2, 0xffffff);
    this.circle.drawCircle(0, 0, 25);
    this.circle.alpha = .8
    this.stage.addChild(this.circle)
    this.arrowBlack = new PIXI.Graphics();
    this.arrowBlack.lineStyle(2, 0x000000, 1);
    this.arrowBlack.moveTo(0,0);
    this.arrowBlack.lineTo(5, 5);
    this.arrowBlack.lineTo(10, 0);
    this.arrowBlack.alpha = 0
    this.stage.addChild(this.arrowBlack);
    this.arrowWhite = new PIXI.Graphics();
    this.arrowWhite.lineStyle(2, 0xffffff, 1);
    this.arrowWhite.moveTo(0,0);
    this.arrowWhite.lineTo(5, 5);
    this.arrowWhite.lineTo(10, 0);
    this.arrowWhite.alpha = 0
    this.stage.addChild(this.arrowWhite);
  }
  tick (mouseX, mouseY, easeX, easeY) {


    this.point.position.x = mouseX
    this.point.position.y = mouseY
    this.arrowBlack.position.x = mouseX - 5
    this.arrowBlack.position.y = mouseY - 2.5
    this.arrowWhite.position.x = mouseX - 5
    this.arrowWhite.position.y = mouseY - 2.5
    this.circle.position.x = easeX
    this.circle.position.y = easeY
  }
  easeInQuad(t) { return t*t}
  changePage(pageName){
    if(pageName === 'work-slug') {
      this.point.tint = 0x000000
      this.circle.tint = 0x000000
    }else{
      this.point.tint = 0xffffff
      this.circle.tint = 0xffffff
    }
    this.onMouseOut()
  }
  onMouseOver() {
    anime({
      targets: this.point,
      alpha: 0,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.circle,
      alpha: 1,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.circle.scale,
      x: 2,
      y: 2,
      duration: 300 ,
      update: ()=>{
        this.circle.clear()
        this.circle.lineStyle(3-this.circle.scale.x, 0xffffff);
        this.circle.drawCircle(0, 0, 25);
      },
      easing: 'easeOutQuad'
    });
  }
  onMouseOut() {
    anime({
      targets: this.point,
      alpha: 1,
      duration: 300 ,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.circle,
      alpha: .5,
      duration: 300 ,
      easing: 'easeInQuad'
    });
    anime({
      targets: this.circle.scale,
      x: 1,
      y: 1,
      duration: 300 ,
      update: ()=>{
        this.circle.clear()
        this.circle.lineStyle(3-this.circle.scale.x, 0xffffff);
        this.circle.drawCircle(0, 0, 25);
      },
      easing: 'easeInQuad'
    });
  }

  onCoverOver(color) {
    const arrow = color === 'black' ? this.arrowBlack : this.arrowWhite
    anime({
      targets: this.point,
      alpha: 0,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: arrow,
      alpha: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.point.scale,
      x: 0,
      y: 0,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: arrow.scale,
      x: 1,
      y: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });

  }

  onCoverOut(color) {
    const arrow = color === 'black' ? this.arrowBlack : this.arrowWhite
    anime({
      targets: this.point,
      alpha: 1,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: arrow,
      alpha: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
    anime({
      targets: this.point.scale,
      x: 1,
      y: 1,
      duration: 300 ,
      easing: 'easeOutQuad'
    });
    anime({
      targets: arrow.scale,
      x: 0,
      y: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });

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
    this.stage.removeChildren(false)

    this.particules_array = []
  }
}

export default Mouse;
