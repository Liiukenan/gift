<template>
  <div>
    <div class="content-head">
      <img class="head" :src="headUrl()" alt="">
    </div>
    <div class="content-gift">
      <h3 class="desc">
        Congratulations on your first prize in the "gift competition" and won the championship award.
      </h3>
      <div class="heart">
        <img class="bg" :src="giftUrl(giftData.gift_id-1)" alt="">
      </div>
      <p class="txt">
        Free calls are x3 hours long.
      </p>
      <div class="btn-wrap" @click="comfrimGet">
        <span class="btn">
          Get
        </span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        langArr: [
          'pop_bg_congratulations_arab',
          'pop_bg_congratulations_german',
          'pop_bg_congratulations_en',
          'pop_bg_congratulations_spain',
          'pop_bg_congratulations_french',
          'pop_bg_congratulations_hindi',
          'pop_bg_congratulations_indonesia',
          'pop_bg_congratulations_turkey',
        ]
      }
    },
    props: {
      giftData:{
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      giftData(n,o) {
        console.log(n, 'wukai')
      }
    },
    components: {
    },
    methods: {
      cancelDialog() {
        this.isShow = false
      },
      giftUrl(id) {
        id = id || 0
        let giftSrc = {}
        let ipcNames = ['laser_ball','love','ring','rose']
        for(let item of ipcNames) {
          giftSrc[item] = require(`../static/img/Halloween/${item}.png`)
        }
        return giftSrc[ipcNames[id]]
      },
      headUrl() {
        let picPath = {};
        let langs = ['ar','de','en','es','fr','hi','in','tr','zh'];
        for(let [i, item] of Object.entries(langs)) {
          picPath[item] = require(`../static/img/Halloween/${this.langArr[i] || this.langArr[2]}.png`)
        }
        return picPath[window.lang || 'en']
      },
      comfrimGet() {
        this.$emit('comfrimGet')
      }
    }
  }
</script>

<style lang="stylus">
    .content-head
      display inline-block
      margin-top -30px
      .head
        width 100%
        height auto
    .content-gift
      padding 0 24px
      .desc, .txt
        font-size 14px
        letter-spacing 0
        text-align center
        line-height 20px
        position relative
        z-index 1
      .desc
        color rgba(0,0,0,0.80)
        margin 0 0 0 0
      .heart
        position relative
        width 140px
        height 140px
        margin -10px auto 0
        z-index 0
        // background-image url(./src/static/img/reward_coin_bg.png)
        background-size cover
        .bg
          width 100%
          height 100%
      .txt
        color #F54A6F
        margin-top -11px
        margin-bottom 0
      .btn-wrap
        padding-top 10px
        .btn
          display block
          width 100%
          font-size 16px
          color #FFFFFF
          text-align center
          line-height 42px
          height 42px
          background-image linear-gradient(-90deg, #C826A8 0%, #FC673F 100%)
          box-shadow 0 6px 8px 0 rgba(202,39,166,0.30)
          border-radius 21px
</style>