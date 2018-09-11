<template>
  <div class="home">
    <div
      :style="`background-color:#${colorSelected.rgb};`"
      :class="{'color-bright':colorSelected.f === 'b'}"
      class="display">

      <ShareButton
        class="share"
        @click.native="share(colorSelected.name)" />
      <!-- 添加到喜爱颜色 -->
      <!-- 复制hex -->
      <!-- 随机 -->
      <ShareButton
        :fill-color="colorSelected.f"
        class="share"
        @click.native="share(colorSelected.name)" />
      <ColorSeriesPicker
        :border-color="colorSelected.f"
        class="series"
        @colorChange="handleColorChange" />
      <div class="kanji">
        {{ colorSelected.name||'日本の伝統色' }}
      </div>
      <div class="romaji">
        {{ colorSelected.color||'The Traditional Colors of Japan' }}
      </div>
      <div class="rgb-block">
        <div
          v-for="(el,i) in ['r','g','b']"
          :key="el"
          :style="`width:${colorSelected.Drgb?(colorSelected.Drgb[i]/255*100):0}%`"
          :class="{[el]:true,'bg-bright':colorSelected.f === 'b'}"/>
      </div>
      <div
        v-if="colorSelected.Drgb"
        class="rgb-number">
        <template v-for="el in ['R','G','B']">
          <div :key="el">{{ el }}</div>
          <div
            :key="el + 'n'"
            class="n">0</div>
        </template>
      </div>
      <div
        v-if="colorSelected.cmyk"
        class="cmyk-number">
        <div
          v-for="el in ['c','m','y','k']"
          :key="el"
          :class="{[el]:true}"
          class="n">0</div>
      </div>
    </div>
    <div class="tab-wrapper">
      <div class="tab">
        <ColorTab
          v-for="color in colorList"
          :key="color.name"
          :kanji="color.name"
          :rgb="color.rgb"
          class="js-tab-item tab-item"
          @click.native="changeColor(color)" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import ColorTab from '@/components/ColorTab.vue'
import ColorSeriesPicker from '@/components/ColorSeriesPicker.vue'
import ShareButton from '@/components/ShareButton.vue'
import colorList from '@/data/color'

export default {
  name: 'Home',
  components: {
    ColorTab,
    ColorSeriesPicker,
    ShareButton,
  },
  data () {
    return {
      colorList: [],
      colorSelected: {},
    }
  },
  watch: {
    colorList () {
      this.$nextTick(() => {
        this.listAnime()
      })
    },
    colorSelected () {
      this.$nextTick(() => {
        this.displayAnime()
      })
    },
    $route (r) {
      this.retrieveColorAndSelect(r.query.c)
    },
  },
  mounted () {
    // trigger watch colorList
    this.colorList = colorList
    this.retrieveColorAndSelect(this.$route.query.c)
  },
  methods: {
    retrieveColorAndSelect (rgb) {
      if (rgb) {
        let color = this.colorList.find(val => val.rgb === rgb)
        this.colorSelected = color
      } else {
        this.colorSelected = {
          rgb: 'ffffff',
        }
      }
    },
    handleColorChange (color) {
      if (color === 'all') this.colorList = colorList
      else this.colorList = colorList.filter(val => val.c === color)
      this.colorSelected = this.colorList[0]
    },
    changeColor (color) {
      this.$router.push({ path: '/', query: { c: color.rgb } })
    },
    share (name) {
      window.open(
        `https://twitter.com/intent/tweet?hashtags=nipponcolors&via=zhoudejie&text=${name ||
          ''}`
      )
    },
    listAnime () {
      anime({
        targets: document.querySelectorAll('.js-tab-item'),
        translateY: [250, 0],
        opacity: [0, 1],
        easing: 'easeOutSine',
        delay: function (el, i, l) {
          let delay = 80 - i
          if (delay > 1) return i * delay
          else return i
          // hack
          // TODO 元素可见时添加动画，并且需要使用节流函数
        },
      })
    },
    displayAnime () {
      let monji = document.querySelectorAll('.display .kanji,.romaji')
      let rgb = document.querySelectorAll('.display .rgb-number .n')
      let cmyk = document.querySelectorAll('.display .cmyk-number .n')
      anime.remove([monji, rgb, cmyk])
      anime({
        targets: monji,
        translateX: [150, 0],
        opacity: [0, 1],
        easing: 'easeOutSine',
      })
      anime({
        targets: rgb,
        innerHTML: (el, i, l) => {
          return this.colorSelected.Drgb[i]
        },
        round: 1,
        easing: 'easeOutSine',
      })
      anime({
        targets: cmyk,
        innerHTML: (el, i, l) => {
          return this.colorSelected.cmyk.slice(i * 3, (i + 1) * 3)
        },
        round: 1,
        easing: 'easeOutSine',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/mixin.scss';
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .series {
    position: absolute;
    height: 1.2rem;
    width: 1.2rem;
    bottom: 1.5rem;
    right: 1rem;
  }
  .share {
    position: absolute;
    height: 1.2rem;
    width: 1.2rem;
    bottom: 1.5rem;
    right: 2.5rem;
    fill: #0c0c0c;
  }
  .display {
    position: relative;
    height: 100%;
    width: 100px;
    flex-grow: 1;
    transition: all 1s;
    .romaji {
      position: absolute;
      bottom: 1.5rem;
      left: 5rem;
      writing-mode: vertical-lr;
      letter-spacing: 0.2rem;
    }
    .kanji {
      font-family: 'XANO';
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      writing-mode: vertical-lr;
      letter-spacing: 0.5rem;
      font-size: 3rem;
    }
    .rgb-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2px;
      .r,
      .g,
      .b {
        transition: all 1s;
        background-color: #0c0c0c;
        height: 2px;
        width: 0%;
        margin-top: 2px;
      }
    }
    .rgb-number {
      font-family: 'MONO';
      font-size: 1.3rem;
      display: flex;
      justify-content: space-around;
    }
    // mononspace needed
    .cmyk-number {
      font-family: 'MONO';
      font-size: 1.3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 2rem 1rem;
      .n {
        &::after {
          margin-bottom: 0.5rem;
          margin-left: -0.5rem;
          display: inline-block;
          font-size: 1rem;
          position: relative;
          top: -0.8rem;
        }
      }
      .c {
        &::after {
          content: 'c';
        }
      }
      .m {
        &::after {
          content: 'm';
        }
      }
      .y {
        &::after {
          content: 'y';
        }
      }
      .k {
        &::after {
          content: 'k';
        }
      }
    }
  }
  .tab-wrapper {
    flex-shrink: 0;
    height: 100%;
    overflow-y: scroll;
    @include for-phone {
      flex-basis: 100px;
    }

    @include for-tablet {
      flex-basis: 400px;
    }
    @include for-desktop {
      flex-basis: 800px;
    }
    @include for-desktop-plus {
      flex-basis: 1200px;
    }
    .tab {
      width: 100%;
      position: relative;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: url(../assets/64253519_p3.png);
        background-attachment: local;
        background-repeat: repeat-y;
        opacity: 0.3;
      }
      @include for-tablet-up {
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
      }
      .tab-item {
        margin-bottom: 1rem;
        @include for-phone {
          width: 100%;
        }
        @include for-tablet {
          width: 33%;
        }
        @include for-desktop {
          width: 25%;
        }
        @include for-desktop-plus {
          width: 20%;
        }
      }
    }
  }
}
.color-bright {
  color: #fffffb !important;
}
.bg-bright {
  background-color: #fffffb !important;
}
</style>
