<!-- 结果页 -->
<template>
  <div class="result-page">
    <div class="result-box">
      <div class="top-bg"></div>
      <div class="bg-white pt-10 flex-justify-center flex-column pl-20 pr-20 pb-10">
        <div class="title-bg flex-justify-center">
          <span class="fc-white bold mt-5">{{$t("ActivityPage.tab_receive")}}</span>
        </div>
        <div class="rece-list flex-between">
          <div
            class="flex-column flex-justify-center flex-center"
            v-for="(item,index) in receList"
            :key="index"
            :class="{'first-rank':index==1,'mt-10':index==1,'mt-15':index==0,'mt-18':index==2}"
          >
            
              <img class="anchor_crown" src="../resource/top_first.png" />
              <img class="anchor_person" :class="{second_person:index==1}" :src="item.avatarUrl" />
              <img class="anchor_rank_img" :src="rankIcon[index]" />
              <span class="bold fs-12 nickname">{{item.nickname || $t("newList.unkonwn")}}</span>
              <div class="fs-12">
                <img src="../static/img/ic_score.png" alt />
                <span class="fc-hui1">{{item.gifts}}</span>
              </div>
           
          </div>
        </div>
        <div class="title-bg flex-justify-center mt-10 send-bg">
          <span class="fc-white bold mt-5">{{$t("ActivityPage.tab_send")}}</span>
        </div>
        <div class="rece-list flex-between">
          <div
            class="flex-column flex-justify-center flex-center"
            v-for="(item,index) in sendList"
            :key="index"
            :class="{'first-rank':index==1,'mt-10':index==1,'mt-15':index==0,'mt-18':index==2}"
          >
            <img class="anchor_crown" src="../resource/top_first.png" />
            <img class="anchor_person" :class="{second_person:index==1}" :src="item.avatarUrl" />
            <img class="anchor_rank_img" :src="rankIcon[index]" />
            <span class="bold fs-12 nickname">{{item.nickname || $t("newList.unkonwn")}}</span>
            <div class="fs-12">
              <img src="../static/img/ic_score.png" alt />
              <span class="fc-hui1">{{item.gifts}}</span>
            </div>
          </div>
        </div>
        <div class="mt-20">
          <button class="result_btn fc-white bold" @click="enter">{{$t("HomePage.bt_enter")}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  props: ["receList", "sendList"],
  data() {
    return {
      rankIcon: [
        require("../resource/rank_second.png"),
        require("../resource/rank_first.png"),
        require("../resource/rank_third.png")
      ],
      receiveGifts: []
    };
  },
  methods: {
    enter(){
      this.$emit('hideResult',false);
    }
  },
  mounted(){
    localStorage.setItem('resShow','1');
  }
};
</script>
<style lang='stylus' scoped>
.result-page {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  .result-box {
    width: 8.3333rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .top-bg {
    width: 100%;
    height: 2.5556rem;
    background: url('./src/static/img/pop_bg_en.png') no-repeat bottom;
    background-size: cover;
  }

  .title-bg {
    width: 100%;
    height: 0.8889rem;
    background: url('./src/resource/receiver_bg.png') no-repeat bottom center;
    background-size: 6rem;
  }

  .send-bg {
    background: url('./src/resource/send_bg.png') no-repeat bottom center;
    background-size: 6rem;
  }

  .anchor_crown {
    width: 0.9444rem;
    z-index: 0;
  }

  .anchor_person {
    border: 0.0556rem solid rgba(198, 198, 198, 1);
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    margin-top: -0.333333rem;
  }

  .anchor_rank_img {
    width: 0.666667rem;
    margin-top: -0.4rem;
  }

  .second_person {
    width: 2rem;
    height: 2rem;
  }

  .first-rank {
    margin-top: 0.2778rem;
  }

  .result_btn {
    border-radius: 0.5rem;
    background-image: linear-gradient(-180deg, #fc673f 0%, #ef3276 50%, #c826a8 100%);
    min-width: 5.555556rem;
    font-size: 0.444444rem;
    height: 1rem;
  }

  .nickname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 1.6rem;
  }
}
</style>