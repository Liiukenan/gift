<!-- 我的详情 -->
<template>
  <div class="myself bg-white pl-20  flex-center flex-between" :class="{arperson:arperson,curved:curved}"  @touchmove.prevent>
    <div class="flex-center">
      <div class="mr-18">
        <span class="fc-hui1"> {{person.ranking}}</span>
      </div>
      <div class="w36">
        <img v-if="activityState.profile" :src="activityState.profile.avatarUrl" alt class="border-round w36" />
      </div>
      <div class="flex-column ml-4">
        <div class="bold flex-left" v-if="activityState.profile">{{activityState.profile.nickname || $t("newList.unkonwn")}}</div>
        <div class="flex-center mt-2" v-if="haveRank">
          <img :src="giftIcon" class="w22" alt />
          <span class="ml-4 fc-hui1">{{person.gifts}}</span>
        </div>
        <div class="flex-center mt-2 fs-12" v-if="!haveRank">
          {{person.gifts}}
        </div>
      </div>
    </div>
    <div class="help-girl flex-center flex-justify-center" @click="hittop" v-if="user">
      <span class="bold fc-white fs-16">{{$t("ActivityPage.bt_me_punching")}}</span>
    </div>
    <div class="help-girl flex-center flex-justify-center" @click="help" v-else>
      <span class="bold fc-white fs-16">{{$t("ActivityPage.bt_help_punching")}}</span>
    </div>
  </div>
</template>
<script>
import { jumpOnlineUser, jumpMain, logEvent } from "../common/jsInteractive";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  props:['person',"giftIcon"],
  data() {
    return {
      user:false,
      curved:false
    };
  },
  methods:{
    hittop(){
      logEvent("event_activity_page_hittop_click", "");
      jumpOnlineUser();
    },
    help(){
      logEvent("event_activity_page_hittop_click", "");
      jumpMain();
    },
    isIphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height >736)
    }
  },
  computed: {
    ...mapState({
      activityState: "activityState"
    }),
    haveRank(){
      if(this.person.ranking=='**'){
        return false;
      }else {
        return true;
      }
    },
    arperson(){
      if(window.lang=='ar'){
        return true;
      }else{
        return false;
      }
    }
  },
  filters: {
    rank(val){
      
    }
  },
  mounted() {
    if(window.jid.indexOf('user')!='-1'){
      this.user=false;
    }else {
      this.user=true;
    }
    if(this.isIphoneX()){
        this.curved=true;
    }
  }
};
</script>
<style lang='stylus' scoped>
.myself {
  .help-girl{
    background-image: linear-gradient(180deg, #FF29A3 0%, #880BDB 100%);
    border-radius: 2.7778rem 0 0 2.7778rem;
    height 1.5556rem
    padding 0 .2778rem
    min-width 3.3333rem
  }
}
.curved{
  padding-bottom .9444rem
}
.arperson{
   padding-left 0
   .mr-18{
     margin-left .5rem
   }
   .ml-4{
     margin-right .1111rem
   }
   .help-girl{
      border-radius:0 2.7778rem 2.7778rem 0;
   }
}
</style>