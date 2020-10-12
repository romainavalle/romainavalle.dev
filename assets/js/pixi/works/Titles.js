

import Title from '~/assets/js/pixi/works/Title'
import anime from 'animejs'
class Titles {
  constructor(stage, backStage,works, w ,h) {
    this.h = h
    this.w = w
    this.stage = stage
    this.backStage = backStage
    this.works = works
    this.totalWorks = works.length
    this.titles_array = []
    this.titles_array = []
    this.titleOffset = 0
    this.titlesHeight = 0
    this.isShown = false
    this.isWorkSelected = false
    this.scrollTop = 0
    this.currentId = this.totalWorks
    this.init()
  }


  init() {

    this.container = new PIXI.Sprite()
    this.stage.addChild(this.container);
    this.titleContainer = new PIXI.Sprite()
    this.backStage.addChild(this.titleContainer);
    this.titleStrokeContainer = new PIXI.Sprite()
    this.container.addChild(this.titleStrokeContainer);
    this.titleBlackContainer = new PIXI.Sprite()
    this.container.addChild(this.titleBlackContainer);


    let posId = -this.totalWorks -1
    let id =0

    this.currentId = 0
    for (let index = 0; index < 3; index++) {
      this.works.forEach((el, i) => {
        const titleSprite = new PIXI.Sprite()
        this.titleContainer.addChild(titleSprite)
        const title = new Title(titleSprite, el.title, id, posId, false, false, this.w, this.h)
        const titleStrokeSprite = new PIXI.Sprite()
        this.titleStrokeContainer.addChild(titleStrokeSprite)
        const titleStroke = new Title(titleStrokeSprite, el.title, id, posId, true, false, this.w, this.h)
        const titleBlackSprite = new PIXI.Sprite()
        this.titleBlackContainer.addChild(titleBlackSprite)
        const titleBlack = new Title(titleBlackSprite, el.title, id, posId, false, true, this.w, this.h)
        this.titles_array.push({title,titleStroke,titleBlack})
        id++
      });
    }
  }
  setCurrentId(id) {
    this.currentId = id + this.totalWorks
  }

  showAll() {
    //console.log('titles showAll')
    this.itemClicked = -1
    this.isShown = true
    this.isWorkSelected = false
    anime({
      targets:this,
      duration:  700,
      easing: 'easeInQuad',
      complete: ()=>{
        this.isWorkSelected = false
      }
    })



    //console.log(this.currentId,this.currentId,this.currentId)
    const realId = this.currentId % this.totalWorks + this.totalWorks
    this.titles_array.forEach((el,i)=>{
      el.title.show((i-realId) * 300)
      el.titleStroke.show((i-realId) * 300)
      el.titleBlack.show((i-realId) * 300)
    })

  }
  hideAll(){
    //console.log('titles hideAll')
    this.itemClicked = -1
    this.isShown = false

    const realId = this.currentId % this.totalWorks + this.totalWorks
    this.titles_array.forEach((el,i)=>{
      el.title.hide((i-realId) * 300, false,false,true)
      el.titleStroke.hide((i-realId) * 300, false,false,true)
      el.titleBlack.hide((i-realId) * 300, false,false,true)
    })
  }


  doClick(id, isFast) {
    if(this.isWorkSelected) return
    this.itemClicked = id
    this.isWorkSelected = true
    //console.log('TITLES > doClick',id);
    anime({
      targets:this,
      scrollTop: this.titles_array[id].title.yPos - (this.h ) / 2,
      duration:  isFast ? 0 : 700,
      easing: 'easeInQuad'
    })
    this.titles_array.forEach((el,i)=>{
      if(i === id ) {
      }else{
        el.title.hide((i-id) * 300,isFast)
        el.titleStroke.hide((i-id) * 300,isFast)
        el.titleBlack.hide((i-id) * 300,isFast)
      }
    })

  }
  showWork(id, isFast) {
    //console.log('TITLES > showWork',id)
    this.doClick(id, isFast)
    this.realId = this.itemClicked === -1 ? id % this.totalWorks + this.totalWorks : this.itemClicked
    //console.log('TITLES > showWork realId',this.realId)
    this.itemClicked = -1
    this.titles_array.forEach((el,i)=>{
      if(i === this.realId ) {
        el.title.doClick()
        el.titleStroke.doClick()
        el.titleBlack.doClick()
      }else{
        el.title.hide((i-this.realId) * 300,isFast)
        el.titleStroke.hide((i-this.realId) * 300,isFast)
        el.titleBlack.hide((i-this.realId) * 300,isFast)
      }
    })

  }

  resize(w, h) {
    if(w && w){
      this.w = w
      this.h = h
    }
    //console.log('TITLES > RESIZE realId',this.realId);

    if(this.isWorkSelected && this.titles_array[this.realId] && this.itemClicked === -1)  this.scrollTop = this.titles_array[this.realId].title.yPos - (this.h ) / 2
    this.titleOffset = this.h / 2
    let titlePos = 0
    for (let index = 0; index < this.works.length; index++) {
      const el = this.titles_array[index]
      el.title.resize(this.w, this.h, titlePos)
      titlePos += el.title.textMetrics.height + this.h / 5
    }
    this.titlesHeight = titlePos

    titlePos = this.titleOffset - this.titlesHeight
    this.titles_array.forEach((el,i) => {
      el.title.resize(this.w, this.h, titlePos)
      el.titleStroke.resize(this.w, this.h, titlePos)
      el.titleBlack.resize(this.w, this.h, titlePos)
      titlePos += el.title.textMetrics.height + this.h / 5
    })



  }
  tick(scrollTop) {
    if(!this.isWorkSelected)this.scrollTop = scrollTop

    this.titles_array.forEach((el,i) => {
      el.title.tick(this.scrollTop )
      el.titleStroke.tick(this.scrollTop )
      el.titleBlack.tick(this.scrollTop )
    })
  }
  destroy() {

    this.titles_array.forEach((el,i) => {
      el.title.destroy()
      el.titleStroke.destroy()
      el.titleBlack.destroy()
    })
    this.stage.removeChildren()
    this.stage.destroy()
  }
}

export default Titles

