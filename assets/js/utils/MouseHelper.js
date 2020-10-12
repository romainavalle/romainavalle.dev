class MouseHelper {

  constructor () {
    this.isFirst = true
    this.isMouseNeeded = false
    this.x = Math.random() * 1200
    this.y = Math.random() * 800
    this.easeX = this.x
    this.easeY = this.y
    this.easeMouseX = this.x
    this.easeMouseY = this.y
    this.easeSlowX = this.x
    this.easeSlowY = this.y
    this._mouseMoveHandler = this.mouseMoveHandler.bind(this)
    if(process.browser) window.addEventListener('mousemove', this._mouseMoveHandler, {passive: true})
  }

  mouseMoveHandler (e) {
    this.x = e.clientX
    this.y = e.clientY
    if(this.isFirst && !this.isMouseNeeded){
      this.easeMouseX = this.easeSlowX = this.easeX = this.x
      this.easeMouseY = this.easeSlowY = this.easeY = this.y
    }
    this.isFirst = false
  }
  tick() {
    const dX = this.x - this.easeX
    const dY = this.y - this.easeY
    const dMouseX = this.x - this.easeMouseX
    const dMouseY = this.y - this.easeMouseY
    const dSlowX = this.x - this.easeSlowX
    const dSlowY = this.y - this.easeSlowY
    this.easeX += dX / 10
    this.easeY += dY / 10
    this.easeMouseX += dMouseX / 6
    this.easeMouseY += dMouseY / 6
    this.easeSlowX += dSlowX / 20
    this.easeSlowY += dSlowY / 20
  }
}


export default new MouseHelper()
