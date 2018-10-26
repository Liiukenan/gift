<template>
  <div class="anchor-wrap">
    <ul class="anchor">
      <li class="anchor-item">
        <div class="anchor-left">
          <p class="txt-wrap">
            你已收到南瓜礼物
            <span class="num-wrap">
              <i class="num">5</i>/5
            </span>
          </p>
          <div class="prog-wrap">
            <span class="bar">
              <i class="btn-bar icon icon-prog_bar_btn"></i>
            </span>
          </div>
        </div>

        <div class="anchor-right">
          <div class="gift-wrap">
            <i class="gift"></i>
            <span class="num">X 3</span>
          </div>
          <div class="receive-wrap ">
            <!-- receive incomplete yes-->
            <span class="btn yes">
              <i class="icon icon-btn_yes"></i>
            </span>
          </div>
        </div>
      </li>

      <li class="anchor-item">
        <div class="anchor-left">
          <p class="txt-wrap">
            你已收到南瓜礼物
            <span class="num-wrap">
              <i class="num">5</i>/5
            </span>
          </p>
          <div class="prog-wrap">
            <span class="bar">
              <i class="btn-bar icon icon-prog_bar_btn"></i>
            </span>
          </div>
        </div>

        <div class="anchor-right">
          <div class="gift-wrap">
            <i class="gift"></i>
            <span class="num">X 3</span>
          </div>
          <div class="receive-wrap ">
            <!-- receive incomplete yes-->
            <span class="btn yes">
              <i class="icon icon-btn_yes"></i>
            </span>
          </div>
        </div>
      </li>

      <li class="anchor-item">
        <div class="anchor-left">
          <p class="txt-wrap">
            你已收到南瓜礼物
            <span class="num-wrap">
              <i class="num">5</i>/5
            </span>
          </p>
          <div class="prog-wrap">
            <span class="bar">
              <i class="btn-bar icon icon-prog_bar_btn"></i>
            </span>
          </div>
        </div>

        <div class="anchor-right">
          <div class="gift-wrap">
            <i class="gift"></i>
            <span class="num">X 3</span>
          </div>
          <div class="receive-wrap ">
            <!-- receive incomplete yes-->
            <span class="btn yes">
              <i class="icon icon-btn_yes"></i>
            </span>
          </div>
        </div>
      </li>
    </ul>

    <dailog :is-show="isShow"/>
  </div>
</template>

<script>
import Dailog from './Dailog'
  export default {
    data() {
      return {
        isShow: true  
      }
    },
    components: {
      Dailog
    }
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
</style>