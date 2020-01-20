<!-- 首次进入 -->
<template>
<div class="first-box">
    <div class="first-page  border-r12 pb-24">
      <div class="pl-24 pr-24">
          <img src="../static/img/popbig.png" alt="" class="coins1 w20">
          <img src="../static/img/popbig.png" alt="" class="coins2 w20">
          <img src="../static/img/popsmall.png" alt="" class="coins3 w30">
          <div class="fc-white bold mt-20 fs-20 title">
            {{$t("firstPage.title")}}
         </div>
         <div class="article mt-16">
            <div class="fc-white bold fc-14">{{$t("firstPage.firstOne")}}</div>
            <div class="fc-white1 fs-12">{{$t("firstPage.hit")}}</div>
         </div>
         <div class="article mt-16">
            <div class="fc-white bold fc-14">{{$t("firstPage.dounble")}}</div>
            <div class="fc-white1 fs-12">{{$t("firstPage.doubleCont")}}</div>
         </div>
         <div class="article mt-16">
            <div class="fc-white bold fc-14">{{$t("firstPage.third")}}</div>
            <div class="fc-white1 fs-12">{{$t("firstPage.thirdCont")}}</div>
         </div>
         <div class="article mt-16" v-if="hi">
            <div class="fc-white bold fc-14">{{$t("firstPage.four")}}</div>
            <div class="fc-white1 fs-12">{{$t("firstPage.fourCont")}}</div>
         </div>
      </div>
      <button @click="close" class="close">
        <img src="../static/img/btn_rule_close.png" alt="">
      </button>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props:['hi'],
  data () {
    return {

    };
  },
  mounted(){
    localStorage.setItem("firstPage","1");
  },
  methods:{
      ...mapActions({
        actstate: "ACTIVITYSTATE",
        giftList: "ACTIVITYLIST"
        }),
      close(){
          this.$emit('cancelPage',false)
      }
  },
}

</script>
<style lang='stylus' scoped>
.first-box{
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    background: rgba(0,0,0,0.60)
    z-index 999
}
    .first-page{
        width 8.3333rem
        position fixed
        z-index 999
        left 50%
        top 50%
        transform translate(-50%,-50%)
        background rgba(224,66,253,1) url('./src/static/img/bg_pop_newgift.png') no-repeat top center
        background-size 8.3333rem 1.7778rem
        padding-top 1.7778rem
        position relative
        .coins1{
            position absolute
            top -0.4167rem
            right .9167rem
            width .8333rem
            height .8333rem

        }
        .coins2{
            position absolute
            top 1.6667rem
            left -0.4167rem
            width .8333rem
            height .8333rem
        }
        .coins3{
            position absolute
            top 6.5278rem
            right -0.5556rem
            width 1.1667rem
            height 1.1667rem
        }
        .title{
            line-height .6111rem
        }
        .close{
            position absolute
            left 50%
            bottom -1.3889rem
            transform translate(-50%)
            img{
                width .8333rem
                height .8333rem
            }
        }
    }
</style>