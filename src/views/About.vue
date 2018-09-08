<template>
  <div class="picker"
    @click="test">
    <div class="circle c7"
      style="background-color:#fffffb;border:1px solid #0c0c0c;"></div>
    <div class="circle c8"
      style="border:1px solid #fffffb;background-color:#0c0c0c"></div>
    <div class="circle c1"
      style="border:1px solid #fffffb;background-color:hsl(0,60%,50%)"></div>
    <div class="circle c2"
      style="border:1px solid #fffffb;background-color:hsl(60,60%,50%)"></div>
    <div class="circle c3"
      style="border:1px solid #fffffb;background-color:hsl(120,60%,50%)"></div>
    <div class="circle c4"
      style="border:1px solid #fffffb;background-color:hsl(180,60%,50%)"></div>
    <div class="circle c5"
      style="border:1px solid #fffffb;background-color:hsl(240,60%,50%)"></div>
    <div class="circle c6"
      style="border:1px solid #fffffb;background-color:hsl(300,60%,50%)"></div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  data() {
    return {
      isOpen: false,
      anime: null
    }
  },
  mounted() {},
  methods: {
    open() {
      anime({
        targets: document.querySelectorAll('.circle'),
        translateY: [
          '0rem',
          function(el, i, l) {
            return i * 2.2 + 'rem'
          }
        ],
        duration: 250,
        easing: 'linear'
      })
    },
    close() {
      anime({
        targets: document.querySelectorAll('.circle'),
        translateY: [
          function(el, i, l) {
            return i * 2.2 + 'rem'
          },
          '0rem'
        ],
        duration: 250,
        easing: 'linear'
      })
    },
    test() {
      console.log('click')
      if (this.isOpen === false) {
        this.open()
        this.isOpen = true
      } else {
        this.close()
        this.isOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
  position: relative;
  height: 2rem;
  width: 2rem;
  .circle {
    transition: all 1s;
    position: absolute;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
  }
}
</style>
