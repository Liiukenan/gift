<!-- 排行榜 -->
<template>
<transition name="slider" mode="out-in">
<div class="rankings">
    <v-tabs centered hide-slider class="tabs" color="transparent">
          <div class="tab_title">
            <v-layout>
              <v-tab @click="tabClick(0)" class="tab_item" v-bind:class="{selected_tab_item: isTabOne , unselected_tab_item : isTabTwo}">
                <div v-bind:class="{selected_tab_text: isTabOne , unselected_tab_text : isTabTwo}">
                  {{$t("ActivityPage.tab_receive")}}
                </div>
              </v-tab>
              <v-tab @click="tabClick(1)" class="tab_item" v-bind:class="{selected_tab_item: isTabTwo , unselected_tab_item : isTabOne}">
                <div v-bind:class="{selected_tab_text: isTabTwo , unselected_tab_text : isTabOne}">
                  {{$t("ActivityPage.tab_send")}}
                </div>
              </v-tab>
            </v-layout>
          </div>
          <v-tab-item @touchstart='touchStart' 
                      @touchend='touchEnd'>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="0" isLarge="true"/>
              <RankingList tab_index="0"/>
            </v-card>
          </v-tab-item>
          <v-tab-item @touchstart='touchStart' 
                      @touchend='touchEnd'>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="1" isLarge="true"/>
              <ranking-list tab_index ="1"/>
            </v-card>
          </v-tab-item>
      </v-tabs>
</div>
</transition>
</template>
<script>
import RankingList from './RankingList'
import TopRank from './TopRank'
import {logEvent} from "../common/jsInteractive"
import {mapGetters} from "vuex";
export default {
  props:['tabIn'],
  data () {
    return{
      isTabOne: true,
      isTabTwo:false,
      color:0,
      colors:[
          'white',
          'tab_text_color'
      ],
      tabIndex:0,
      startX:'',
      startY:'',
      endX:'',
      endY:''
    }
  },
  components:{
      RankingList,
      TopRank,
  },
  computed:{
    ...mapGetters({
      mySelf: "mySelf",
      myActivity: "activity"
    })
  },
  methods:{
    // changeTab(val){
    //   console.log('0000000000000')
    //    this.isTabOne = val === 0;
    //    this.isTabTwo = val === 1;
    //    this.tabIndex = val;
    //    if (this.isTabOne) {
    //      logEvent("event_activity_ranking_receive_show","");
    //    }
    //    if (this.isTabTwo){
    //      logEvent("event_activity_ranking_send_show","");
    //    }
    // },
    touchStart(e){
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      e = e || window.event;
    },
    touchEnd(e){
      this.endX = e.changedTouches[0].pageX;
      this.endY = e.changedTouches[0].pageY;
      this.upOrDown(this.startX,this.startY,this.endX,this.endY);
    },
    upOrDown(startX, startY, endX, endY){
      let direction = this.GetSlideDirection(startX, startY, endX, endY);
      switch(direction) {
        case 0:
          console.log("没滑动");
          break;
        case 1:
          console.log("向上");
          break;
        case 2:
          console.log("向下");
          break;
        case 3:
          this.isTabOne=false;
          this.isTabTwo=true;
          this.$emit('transIndex',1);
          break;
        case 4:
          this.isTabOne=true;
          this.isTabTwo=false;
          this.$emit('transIndex',0);
          break;
        default:
          break;
      }
    },
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    GetSlideDirection:function (startX, startY, endX, endY) {
      let dy = startY - endY;
      let dx = endX - startX;
      let result = 0;
      //如果滑动距离太短
      if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
      }
      let angle = this.GetSlideAngle(dx, dy);
      if(angle >= -45 && angle < 45) {
        result = 4;
      }else if (angle >= 45 && angle < 135) {
        result = 1;
      }else if (angle >= -135 && angle < -45) {
        result = 2;
      }
      else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      }
      return result;
    },
    //返回角度
    GetSlideAngle:function (dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    },
    tabClick(index){
      if(index==0){
        this.isTabOne=true;
        this.isTabTwo=false;
        logEvent("event_activity_ranking_receive_show","");
      }else{
        this.isTabOne=false;
        this.isTabTwo=true;
        logEvent("event_activity_ranking_send_show","");
        
      }
      this.$emit('transIndex',index);
      


    }
  }
}
</script>
<style>
  .slider-enter-active, .slider-leave-active{
    transition: all 0.3s
  }
.slider-enter, .slider-leave-to{
  transform : translate3d(100%, 0, 0);
}
    
    .tab_title{
    height: 1.066667rem;
    /* width: 8rem; */
    border-radius: 1.666667rem;
    background: #9E00E8;
    white-space: nowrap;
    margin:0 auto;
  }
  .rankings{
    position: absolute;
    width: 100%;
    left: 0;
    top: -1px;
  }
  .rankings .v-tabs__container{
    height: 1.066667rem;
    margin-bottom: 7px;
    
  }

  .selected_tab_item{
    
    border-radius: 1.666667rem;
    background: white;
    font-size: .4rem;
    font-weight: bold;
    height: 100%;
    
    text-transform: Capitalize;
  }
  .unselected_tab_item{
    font-size:.4rem;
    font-weight: bold;
    height: 100%;
    text-transform: Capitalize;
  }
  .selected_tab_text{
    color:  #9E00E8;
  }
  .unselected_tab_text{
    color: white;
  }
  .tab_card {
    /* padding: .333333rem; */
    margin-left: .333333rem;
    margin-right: .333333rem;
    border-radius: .5rem;
    margin-bottom: 1rem;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(2.333333rem);
    opacity: 0;
  }
  .tab_item{
    height: 1.066667rem;
    overflow: hidden;
    padding:0 .3rem;
  }

</style>