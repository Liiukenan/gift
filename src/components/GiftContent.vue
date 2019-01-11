<template>
  <div>
    <div class="content-head">
      <img class="head" :src="headUrl()" alt="">
    </div>
    <div class="content-gift">
      <h3 class="desc" v-if="isUser">
        <!-- 金币 --> 
        <span v-if="giftData.gift_type === 'gems'">{{$t("ActivityPage.get_gift_gems").replace('@', userGiftName() || '')}}</span>
        <!-- vip -->
        <span v-else>{{$t("ActivityPage.get_gift_vips").replace('@', userGiftName() || '')}}</span>
      </h3>
      <h3 class="desc" v-else>
        {{$t("ActivityPage.get_gift_anchor").replace('@', giftData.gift_name || '')}}  
      </h3>
      <div class="heart">
        <img class="bg" v-if="isUser" :src="getUserUrl(giftData.gift_type === 'gems' ? giftData.gift_type : giftData.gift_num)" alt="">
        <img class="bg" v-else :src="giftUrl(giftData.gift_id-1)" alt="">
      </div>
      <!-- <p class="txt">
        Free calls are x3 hours long.
      </p> -->
      <div class="btn-wrap" @click="comfrimGet">
        <span class="btn">
          {{$t("ActivityPage.gift_btn")}}
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
          'pop_bg_congratulations_ar',
          'pop_bg_congratulations_de',
          'pop_bg_congratulations_en',
          'pop_bg_congratulations_es',
          'pop_bg_congratulations_fr',
          'pop_bg_congratulations_hi',
          'pop_bg_congratulations_in',
          'pop_bg_congratulations_tr',
        ]
      }
    },
    props: {
      giftData:{
        type: Object,
        default: () => {
          return {}
        }
      },
      isUser: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      cancelDialog() {
        this.isShow = false
      },
      giftUrl(id) {
        id = id || 0
        let giftSrc = {}
        let ipcNames = ['love','rose','ring','laser_ball',]
        for(let item of ipcNames) {
          giftSrc[item] = require(`../static/img/Halloween/${item}.png`)
        }
        return giftSrc[ipcNames[id] || 'laser_ball']
      },
      userGiftName() {
        let mapName = {
          '3': 'vip3',
          '7': 'vip7',
          '50': 'gems50',
          '100': 'gems100',
          '200': 'gems200',
        }
        let giftNameLang =  '';
        if(!!mapName[this.giftData.gift_num]) {
          giftNameLang = this.$t(`ActivityPage.user_gift_name_${mapName[this.giftData.gift_num]}`) || ''
        }
        return giftNameLang
      },
      getUserUrl(type) {
        type = type || 'gems'
        // let map = {
        //   'gems': 'gems',
        //   '3': 'vip3',
        //   '7': 'vip7'
        // }
        let map = {
          'gems': 'gems',
          '3': 'vip',
          '7': 'vip'
        }
        let giftSrc = {}
        // let ipcNames = ['gems','vip3','vip7']
        let ipcNames = ['gems','vip']
        for(let item of ipcNames) {
          giftSrc[item] = require(`../static/img/Halloween/${item}.png`)
        }
        return giftSrc[map[type+'']]
      },
      headUrl() {
        let picPath = {};
        let langs = ['ar','de','en','es','fr','hi','in','tr'];
        for(let [i, item] of Object.entries(langs)) {
          picPath[item] = require(`../static/img/Halloween/${this.langArr[i] || this.langArr[2]}.png`)
        }
        return picPath[window.lang || 'en']
      },
      comfrimGet() {
        this.$emit('comfrimGet')
      },
      created() {
        console.log(giftData, 'wukai')
      },
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
        background-image url(./src/static/img/reward_coin_bg.png)
        background-size cover
        .bg
          width 70%
          height 70%
          position absolute
          top 50%
          left 50%
          transform translate3d(-50%, -50%, 0)
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