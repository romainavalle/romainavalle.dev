<template>
  <div class="TurnDevice">
    <div class="content">
      <div class="svg">
          <v-svg />
      </div>
    </div>
  </div>
</template>
<script>

import vSvg from "~/assets/svgs/mobile.svg?inline";
import { mapGetters } from 'vuex'
export default {
  name: 'TurnDevice',
  data(){
    return {
    }
  },
  components: {
    vSvg
  },
  computed: {
  },
  methods:{
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
  }
}

</script>

<style lang="stylus" scoped>
.TurnDevice
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 20
  display none
  background #000000
  .content
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    text-align center
    display flex
    justify-content center
    align-items center
    flex-direction column
    .svg
      width 200px
      height 135px
      svg
        fill white
        display block
  @media (orientation: landscape)
    display block
</style>
