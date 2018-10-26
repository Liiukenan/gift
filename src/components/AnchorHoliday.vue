<template>
  <div class="anchor-wrap">
    <ul class="anchor">
      <li class="anchor-item" v-for="(item,index) in dataList.gifts" :key="index">
        <div class="anchor-left">
          <p class="txt-wrap">
            你已收到{{item.gift_name}}
            <span class="num-wrap">
              <i class="num">{{item.gift_rate_score}}</i>/{{item.gift_rate_require}}
            </span>
          </p>
          <div class="prog-wrap">
            <span class="bar" :style="progBar(item)">
              <i class="btn-bar icon icon-prog_bar_btn"></i>
            </span>
          </div>
        </div>

        <div class="anchor-right">
          <div class="gift-wrap">
            <i class="gift">
              <img class="pic" :src="giftUrl(item.gift_id-1)" alt="">
            </i>
            <span class="num">X 1</span>
          </div>
          <div class="receive-wrap ">
            <!-- receive incomplete yes-->
            <button class="btn" :disabled="disabledCon(item.could_get)" @click="getGift(item.gift_id)" :class="btnStatus(item.could_get)">
              <i class="icon icon-btn_yes"></i>
            </button>
          </div>
        </div>
      </li> 
    </ul>
    <dialog-model :is-show="isShow" @cancelDialog="cancelDialog">
      <gift-content @comfrimGet="comfrimGet" :gift-data="giftData"/>
    </dialog-model/>
  </div>
</template>

<script>
import DialogModel from './Dialog'
import GiftContent from './GiftContent'
import {mapActions} from 'vuex'
import { setTimeout } from 'timers';


  export default {
    data() {
      return {
        isShow: false,
        dataList: {},
        giftData: {}
      }
    },
    components: {
      DialogModel,
      GiftContent
    },
    methods: {
      ...mapActions({
        fetchAnchorGift: 'FETCH_ANCHOR_GIFT',
        fetchAnchorLuckDraw:'FETCH_ANCHOR_LUCK_DRAW'
      }),
      cancelDialog() {
        this.isShow = false
      },
      progBar(item) {
        let scale = `${(item.gift_rate_score/item.gift_rate_require)*100}%`
        return {'width': scale}
      },
      btnStatus(could_get) {
        var className = ['incomplete', 'receive', 'yes']
        return `${className[could_get]}`
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
      disabledCon(isCan) {
        return isCan === 1 ? false : true
      },
      getGift(giftId) {
        this.fetchAnchorLuckDraw({myJid: this.dataList.jid, giftId: giftId}).then(res => {
          if(+res.status === 1) { //成功回调
            this.isShow = true
            this.giftData = {}
            setTimeout(() => {
              this.giftData = res
            })
            this.fetchAnchorGift().then(data => { //再次跟新数据
              this.dataList = data
            }).catch(console.error)
          }
        }).catch(console.error)
      },
      comfrimGet() {
        this.isShow = false
      }
    },
    created() {
      this.fetchAnchorGift().then(data => {
        this.dataList = data
      }).catch(console.error)
    },
  }
</script>

<style lang="stylus">
  .anchor-wrap
    padding 0 6px
    .anchor
      padding 0px
    .anchor-item
      padding-left 15px
      overflow hidden
      border-radius 12px
      background rgba(0,0,0,0.35)
      border-radius 6px
      margin-top 6px
      .anchor-left, .anchor-right
        float left
      .anchor-left
        padding 20px 0 27px
        width calc(100% - 112px)
        .txt-wrap
          margin 0px
          font-size 12px
          line-height 14px
          color  rgba(255,255,255,0.60)
          margin-bottom 11px
          .num-wrap
            display inline-block
            padding-left 10px
            .num
              color #ffffff
              font-style normal
      .prog-wrap
        width 100%
        height 6px
        border-radius 3px
        background rgba(255,255,255,0.10)
        position relative
        .bar
          position absolute
          left 0
          top 0
          width 50%
          height 100%
          background-image linear-gradient(-90deg, #C826A8 0%, #FC673F 100%)
          border-radius 3px
          .btn-bar
            position absolute
            right -11px
            top 50%
            transform translateY(-50%)
            width 23px
            height 23px
            
      .anchor-right
        width 112px
        padding 4px 0 8px
        padding 0 12px
        overflow hidden
        .gift-wrap
          padding 2px 0px 2px
          overflow hidden
          width 67px
          margin 0 auto
          .gift, .num
            float left
          .gift
            display inline-block
            width 44px
            height 44px
            .pic
              width 100%
              height 100%
          .num
            display inline-block
            font-size 12px
            color rgba(255,255,255,0.80)
            margin-top 13px
        .receive-wrap
          padding-bottom 7px
          .btn
            display block
            font-size 12px
            color #ffffff
            width 100%
            text-align center
            height 22px
            line-height 22px
            border-radius 14px
            &.receive
              box-shadow: 0 6px 8px 0 rgba(202,39,166,0.30)
              background-image linear-gradient(0deg, #C826A8 0%, #EF3276 52%, #FC673F 100%)
              .icon
                display none 
            &.receive:after
              content "Receive"
              display inline-block
            &.incomplete, &.yes
              background rgba(255,255,255,0.10)
              color rgba(255,255,255,0.40)
            &.incomplete:after
              content "incomplete"
              display inline-block
            &.incomplete .icon
              display none
            &.yes .icon
              margin-top 4px

*:focus {
	outline:none
}
</style>