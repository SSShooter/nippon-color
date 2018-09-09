<template>
  <div class="home">
    <div class="display"
      :style="`background-color:#${colorSelected.rgb};`"
      :class="{'color-bright':colorSelected.f === 'b'}">
      <svg class="share"
        @click="share(colorSelected.name)"
        :class="{'fill-bright':colorSelected.f === 'b'}"
        width="200px"
        height="200.00px"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M888.921 63.946H131.993c-38.727 0-70.412 31.686-70.412 70.412v756.929c0 38.726 31.685 70.412 70.412 70.412h756.929c38.727 0 70.412-31.686 70.412-70.412V134.358c-0.001-38.725-31.686-70.412-70.413-70.412z m-87.278 811.193c-23.901 2.074-52.149 3.118-79.025 3.118-25.694 0-50.138-0.948-68.357-2.862C501.349 859.356 413.64 771.988 413.64 635.69V341.466c0-42.132 34.15-76.28 76.28-76.28s76.279 34.149 76.279 76.28v65.382h207.046c42.13 0 76.28 34.149 76.28 76.28s-34.15 76.28-76.28 76.28H566.2v76.28c0 28.828 0 77.067 103.986 87.974 24.566 2.576 77.935 2.991 118.251-0.511 42.056-3.479 78.951 27.425 82.596 69.396 3.645 41.973-27.423 78.952-69.39 82.592z" />
      </svg>
      <div>
        <!-- 添加到喜爱颜色 -->
        <!-- 复制hex -->
      </div>
      <ColorSeriesPicker class="series"
        :borderColor="colorSelected.f"
        @colorChange="handleColorChange" />
      <div class="kanji">
        {{colorSelected.name||'日本の伝統色'}}
      </div>
      <div class="romaji">
        {{colorSelected.color||'The Traditional Colors of Japan'}}
      </div>
      <div class="rgb-block">
        <div v-for="(el,i) in ['r','g','b']"
          :key="el"
          :style="`width:${colorSelected.Drgb?(colorSelected.Drgb[i]/255*100):0}%`"
          :class="{[el]:true,'bg-bright':colorSelected.f === 'b'}"></div>
      </div>
      <div class="rgb-number"
        v-if="colorSelected.Drgb">
        <template v-for="el in ['R','G','B']">
          <div :key="el">{{el}}</div>
          <div :key="el + 'n'"
            class="n">0</div>
        </template>
      </div>
      <div class="cmyk-number"
        v-if="colorSelected.cmyk">
        <div v-for="el in ['c','m','y','k']"
          :key="el"
          class="n"
          :class="{[el]:true}">0</div>
      </div>
    </div>
    <div class="tab">
      <ColorTab class="js-tab-item"
        v-for="color in colorList"
        @click.native="changeColor(color)"
        :key="color.name"
        :kanji="color.name"
        :romaji="color.color"
        :cmyk="color.cmyk"
        :rgb="color.rgb" />
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import ColorTab from '@/components/ColorTab.vue'
import ColorSeriesPicker from '@/components/ColorSeriesPicker.vue'
import colorList from '@/data/color'

export default {
  name: 'home',
  data() {
    return {
      colorList: [],
      colorSelected: {}
    }
  },
  components: {
    ColorTab,
    ColorSeriesPicker
  },
  watch: {
    colorList() {
      this.$nextTick(() => {
        this.listAnime()
      })
    },
    colorSelected() {
      this.$nextTick(() => {
        this.displayAnime()
      })
    },
    $route(r) {
      this.retrieveColorAndSelect(r.query.c)
    }
  },
  mounted() {
    // trigger watch colorList
    this.colorList = colorList
    this.retrieveColorAndSelect(this.$route.query.c)
    let monji = document.querySelectorAll('.display .kanji,.romaji')
    anime({
      targets: monji,
      opacity: [0, 1],
      duration: 2500,
      easing: 'easeOutSine'
    })
  },
  methods: {
    retrieveColorAndSelect(rgb) {
      if (rgb) {
        let color = this.colorList.find(val => val.rgb === rgb)
        this.colorSelected = color
      } else {
        this.colorSelected = {
          rgb: 'ffffff'
        }
      }
    },
    handleColorChange(color) {
      if (color === 'all') this.colorList = colorList
      else this.colorList = colorList.filter(val => val.c === color)
      this.colorSelected = this.colorList[0]
    },
    changeColor(color) {
      this.$router.push({ path: '/', query: { c: color.rgb } })
    },
    share(name) {
      window.open(
        `https://twitter.com/intent/tweet?hashtags=nipponcolors&via=zhoudejie&text=${name ||
          ''}`
      )
    },
    listAnime() {
      anime({
        targets: document.querySelectorAll('.js-tab-item'),
        translateY: [250, 0],
        opacity: [0, 1],
        easing: 'easeOutSine',
        delay: function(el, i, l) {
          let delay = 80 - i
          if (delay > 1) return i * delay
          else return i
          // hack
          // TODO 元素可见时添加动画，并且需要使用节流函数
        }
      })
    },
    displayAnime() {
      let monji = document.querySelectorAll('.display .kanji,.romaji')
      let rgb = document.querySelectorAll('.display .rgb-number .n')
      let cmyk = document.querySelectorAll('.display .cmyk-number .n')
      anime.remove([monji, rgb, cmyk])
      anime({
        targets: monji,
        translateX: [250, 0],
        opacity: [0, 1],
        easing: 'easeOutSine'
      })
      anime({
        targets: rgb,
        innerHTML: (el, i, l) => {
          return this.colorSelected.Drgb[i]
        },
        round: 1,
        easing: 'easeOutSine'
      })
      anime({
        targets: cmyk,
        innerHTML: (el, i, l) => {
          return this.colorSelected.cmyk.slice(i * 3, (i + 1) * 3)
        },
        round: 1,
        easing: 'easeOutSine'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    // 需要等宽字体
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
  .tab {
    flex-shrink: 0;
    flex-basis: 100px;
    height: 100%;
    overflow: scroll;
  }
}
.color-bright {
  color: #fffffb !important;
}
.bg-bright {
  background-color: #fffffb !important;
}
.fill-bright {
  fill: #fffffb !important;
}
</style>
