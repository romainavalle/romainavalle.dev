<template>
  <article class="credits">
    <h3 class="title">Credits.</h3>
    <p>
      Designed by
      <a
        href="https://www.simondaufresne.com"
        target="_blank"
        rel="noopener"
        @mouseenter="onMouseEnter('simon')"
        @mouseleave="onMouseLeave"
        >Simon Daufresne.</a
      >
    </p>
    <p>This website is developed with VueJs <br />with NuxtJs.</p>
    <p>WebGL managed with PixiJS. Animations powered by animeJS.</p>
  </article>
</template>
<script>
import { mapState } from "vuex";
import Emitter from "~/assets/js/events/EventsEmitter";
import offsetMixins from "./../offsetMixins.vue";
import anime from "animejs";
export default {
  computed: {
    ...mapState(["contact"])
  },
  mixins: [offsetMixins],
  methods: {
    onMouseEnter(type) {
      Emitter.emit("LINK:OVER", type);
    },
    onMouseLeave(type) {
      Emitter.emit("LINK:OUT");
    },
    show() {
      anime({
        targets: this.anime_array,
        translateY: 0,
        scaleY: 1,
        duration: 500,
        opacity: 1,
        easing: "easeOutQuad",
        delay: anime.stagger(100)
      });
    }
  },
  mounted() {
    this.anime_array = [
      this.$el.querySelector("h3"),
      ...[].slice.call(this.$el.querySelectorAll("p"))
    ];
    anime.set(this.anime_array, {
      translateY: 100,
      opacity: 0
    });
  }
};
</script>

<style lang="stylus" scoped>
p:last-child
  margin-bottom 0

a
  display inline-block
  border-bottom 1px solid #fff
  line-height 1
.device &
  br
    display none
</style>
