<template>
  <div class="index">
    <v-logo ref="logo"></v-logo>
    <div class="u-container">
      <div class="u-d-f">
        <v-portrait ref="portrait"></v-portrait>
        <div>
          <v-about ref="about"></v-about>
          <v-recognitions ref="recognitions"></v-recognitions>
          <v-credits ref="credits"></v-credits>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vLogo from '~/components/index/logo.vue'
import vPortrait from '~/components/index/portrait.vue'
import vAbout from '~/components/index/about.vue'
import vRecognitions from '~/components/index/recognitions.vue'
import vCredits from '~/components/index/credits.vue'
export default {
  components: {
    vLogo, vCredits, vAbout, vRecognitions, vPortrait
  },
  methods:{
    tick(scrollTop) {
      this.$refs.portrait.tick(scrollTop)
      this.$refs.about.tick(scrollTop)
      this.$refs.recognitions.tick(scrollTop)
      this.$refs.credits.tick(scrollTop)
    },
    resize(w,h,ph) {
      this.$refs.portrait.resize(w,h,ph)
      this.$refs.about.resize(w,h,ph)
      this.$refs.recognitions.resize(w,h,ph)
      this.$refs.credits.resize(w,h,ph)
      this.$refs.logo.resize(w,h)
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.index
  background $black
  width 100%
  min-height 100vh
  padding-bottom 20vh


.about, .recognitions
  margin-bottom 20vh
</style>

