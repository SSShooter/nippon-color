<template>
  <div class="card">
    <div class="color-block"
      :style="`background-color:#${rgb};`"></div>
    <div class="monji-block">
      <div class="kanji">{{kanji}}</div>
      <div class="rgb">{{'#'+rgb}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    kanji: String,
    romaji: String,
    rgb: String,
    cmyk: String
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #3a3226;
  height: 2.5rem;
  .color-block {
    height: 100%;
    width: 0.5rem;
    margin-right: 0.5rem;
  }
  .monji-block {
    flex-grow: 0;
    flex-shrink: 1;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .kanji {
      font-family: 'XANO';
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.2rem;
    }
    .rgb {
      font-size: 0.8rem;
    }
  }
}
</style>
