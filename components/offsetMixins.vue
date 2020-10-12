
<script>
import Utils from '~/assets/js/utils/Utils'
export default {
  data() {
    return {
      isShown: false,
      w:0,
      ph:0
    }
  },
  methods: {
    tick(scrollTop) {
      if(this.isShown) return
      if(this.w  && scrollTop > this.offsetY - this.h * .7) {
        this.isShown = true
        this.show()
      }
    },
    resize(w,h,ph) {
      if(this.isShown) return
      if(this.ph !== ph) {
        this.w = w
        this.h = h
        this.ph = ph
        this.offsetY = Utils.offset(this.$el).top
      }
    }
  }
}
</script>

