<template>
  <section class="work" :class="{'ready': isReady}" :style="{'background-color': work.color}" v-if="work">
    <v-cover :img="`${work.cover}`" :path="`${path}${work.slug}/`" :imgPath="imgPath"  :title="work.title" ref="cover"></v-cover>
    <v-desc :year="work.year" :keywords="work.keywords" :desc="work.desc" ref="desc"></v-desc>
    <component v-for="(item, i) in work.content" :key="`item-${i}`" ref="media" :is="item.type" :item="item" :path="`${path}${work.slug}/`" :imgPath="imgPath" :videoPath="videoPath" :alt="work.title"></component>
    <v-awards :awards="work.awards" ref="awards" v-if="work.awards"></v-awards>
    <v-credits :credits="work.credits" ref="credits"></v-credits>
    <v-next :work="nextWork" ref="next"></v-next>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import vCover from '~/components/work/cover.vue'
import vDesc from '~/components/work/desc.vue'
import vImage from '~/components/work/image.vue'
import vImageFull from '~/components/work/imageFull.vue'
import vColumn from '~/components/work/column.vue'
import vVideo from '~/components/work/video.vue'
import vAwards from '~/components/work/awards.vue'
import vCredits from '~/components/work/credits.vue'
import vNext from '~/components/work/next.vue'
import Utils from '~/assets/js/utils/Utils'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import transform from 'dom-transform'
import Emitter from '~/assets/js/events/EventsEmitter'
export default {
  head(){
    return{

      meta: [
          { hid: 'description', name: 'description', content: this.work ? this.work.desc : 'Interactive developer based in Paris.'},
          { hid: 'og:description', property: 'og:description', content: this.work ? this.work.desc : 'Interactive developer based in Paris.' },
          { hid: 'twitter:description', property: 'twitter:description', content: this.work ? this.work.desc : 'Interactive developer based in Paris.' },
          { hid: 'og:url', property: 'og:url', content: this.work ? `https://www.romainavalle.dev/work/${this.work.slug}` : 'https://www.romainavalle.dev'},
          { hid: 'twitter:url', property: 'twitter:url', content: this.work ? `https://www.romainavalle.dev/work/${this.work.slug}` : 'https://www.romainavalle.dev'},
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.work ? `https://www.romainavalle.dev/images/${this.work.slug}/${this.work.cover}` :'https://www.romainavalle.dev/images/share.jpg'
          },
          {
            hid: 'twitter:image',
            property: 'twitter:image',
            content: this.work ? `https://www.romainavalle.dev/images/${this.work.slug}/${this.work.cover}` :'https://www.romainavalle.dev/images/share.jpg'
          }
        ]
    }
  },
  data() {
    return {
      isReady: false,
      isOverScrolled: false,
      pageScroll: 0,
      imgLoaded: 0,
      w: 0
    }
  },
  components: {
    vCover, vDesc, vImage, vImageFull, vCredits, vNext, vVideo, vColumn, vAwards
  },
  computed: {
    ...mapState(['path','vPath', 'nextOffset']),
    ...mapGetters(['work', 'nextWork', 'isDevice']),
    imgPath() {
      return  `${this.path}${this.work.slug}/`
    },
    videoPath() {
      return `${this.vPath}${this.work.slug}/`
    },
  },
  methods: {
    ...mapActions(['setNextOffset']),
    tick(scrollTop) {
      this.$refs.desc.tick(scrollTop)
      if(this.$refs.awards)this.$refs.awards.tick(scrollTop)
      this.$refs.credits.tick(scrollTop)
      if(this.isDevice) {
        this.$refs.media.forEach(el=>{
          el.tick(scrollTop)
        })
        this.$refs.next.tick(scrollTop)
      }else{

        if(scrollTop + this.h > this.nextOffset) {
          this.pageScroll =  (scrollTop + this.h) - this.nextOffset
        }else{
          this.pageScroll = 0
        }
        this.pourc = this.pageScroll / (this.pageHeight - this.nextOffset )// Math.min(2000, Math.max(0,(scrollTop + (this.h)) - (this.nextOffset))) /  1999

        if(this.pourc >  .99 && !this.isOverScrolled) {
          this.isOverScrolled = true
          this.$router.push({name:'work-slug', params: { slug: this.nextWork.slug }})
        }
        transform(this.$el, {translate3d: [0, this.pageScroll, 0]})
      }
    },
    onLoad() {
      this.imgLoaded++
      if(this.imgLoaded === this.imgs.length) Emitter.emit('GLOBAL:RESIZE')

    },
    resize(w,h, pageHeight) {
      if(w && h){
        this.w = w
        this.h = h
        this.pageHeight = pageHeight
      }

      if(this.$refs.awards)this.$refs.awards.resize(this.w, this.h, pageHeight)
      this.$refs.credits.resize(this.w, this.h, pageHeight)
      this.$refs.desc.resize(this.w, this.h, pageHeight)
      if(this.isDevice) {
        this.$refs.media.forEach(el=>{
          el.resize(this.w, this.h)
        })
        this.$refs.next.resize(this.w, this.h)
      }
      this.setNextOffset(Utils.offset(this.$refs.next.$el).top)
    }
  },
  beforeDestroy() {
    this.imgs.forEach(element => {
      element.removeEventListener('load',this._onLoad)
    });
  },
  mounted() {

    this._onLoad = this.onLoad.bind(this)
    this.imgs = []
    this.$nextTick(()=>{
      const imgs = [].slice.call(this.$el.querySelectorAll('img'))
      imgs.forEach(element => {
        if(!element.dataset.src) return
        const img = new Image()
        img.addEventListener('load',this._onLoad)
        img.src = element.dataset.src
        this.imgs.push(img)
      });
      this.isReady = true
    })
    setTimeout(()=>{
      Emitter.emit('GLOBAL:RESIZE')
    },1000)
  }
}

</script>

<style lang="stylus" scoped>
.work
  color $black
  min-height 100vh


</style>
<style lang="stylus" >
.no-touch .work.ready
  img, video
    opacity 0
</style>

