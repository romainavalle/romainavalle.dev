<template>
  <section class="works u-container">
    <ul>
      <li v-for="(work,i) in works" :key="`work-${i}`">
        <nuxt-link :to="{name:'work-slug', params: { slug: work.slug }}" v-html="work.title" class="vLarge"></nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
  },
  computed: {
    ...mapState(['works']),
    ...mapGetters(['isDevice'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop, mouseEaseX, mouseEaseY, mouseEaseSlowX, mouseEaseSlowY) {

    }
  },
  mounted() {
    if(!this.isDevice)this.$el.querySelector('ul').style.visibility = 'hidden'
  }
}
</script>

<style lang="stylus" scoped>
.works
  position relative
  background $black
  ul
    padding 100px 0px
    width 100%
    li
      display block
      .vLarge
        font-size 40px
        line-height 1
    li+li
      margin-top 30px
</style>
<style lang="stylus" >
.no-touch section.works
  height 1000vh
</style>

