<template>
  <div
    class="logo"
    @mouseover="onMouseEnter"
    @mouseout="onMouseLeave"
    @click="onMouseClick"
  ></div>
</template>
<script>
import { mapState } from "vuex";
import Emitter from "~/assets/js/events/EventsEmitter";
import ScrollHelper from "~/assets/js/utils/ScrollHelper";

export default {
  data() {
    return {
      w: 0
    };
  },
  computed: {
    ...mapState(["path"])
  },
  methods: {
    onMouseEnter() {
      Emitter.emit("LOGO:OVER");
    },
    onMouseLeave() {
      Emitter.emit("LOGO:OUT");
    },
    onMouseClick() {
      ScrollHelper.scrollTo(window.innerHeight - 120);
    },
    resize(w, h) {
      this.w = w;
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.logo
  width 100%
  height 100vh
  position relative
  display flex
  align-items center
  justify-content center
  background #000000
.device .logo
  display none
</style>
