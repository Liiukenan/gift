<!-- 列表 -->
<template>
  <div class="bg-white list-box pb-16">
      <div class="list">
        <div class="flex-between pl-20 pr-20 bold fc-hui">
          <span>{{this.$t("newList.ranking")}}</span>
          <span v-if="!lastActive">{{this.$t("newList.bonus")}}</span>
        </div>
        <!-- @click="personDetail(item.jid)" -->
        <div class="mt-8" v-if="list.length>0">
          <div v-for="(item,index) in list" :key="index" class="width-100" :class="{'mt-8':item.ranking<coinslist.length+1}" >
            <div class="line bg-hui1 mb-8 mt-8" v-if="index==10"></div>
            <div
              class=" list-person flex-center mr-4 ml-4"
              :class="{'bg-yellow':item.ranking<coinslist.length+1,'border-r8':item.ranking<coinslist.length+1,'bottom-line':item.ranking>=coinslist.length+1 && item.ranking!=list.length, 'bg1':item.ranking==1,'bg2':item.ranking==2,'bg3':item.ranking==3}"
            >
              <div class="pl-16 pr-16 flex-center width-100">
                <div class="flex-between width-100">
                  <div class="flex-left">
                    <div class="flex-center mr-18 flex-justify-center">
                      <img :src="bg(item.ranking)" alt class="width-22" v-if="item.ranking<4"/>
                      <span class="fc-hui1 bold width-22" v-else>{{item.ranking}}</span>
                    </div>
                    <div class="flex-between">
                      <div class="flex-center w48 mr-8 bg-person border-round" >
                        <img
                          :src="item.avatarUrl"
                          alt
                          class="w48 border-round"
                        />
                      </div>
                      <div class="flex-column flex-justify-center">
                        <div class="name bold fc-hui3">
                            <span class="norwap" style="display:block;text-align:left;">{{item.nickname || $t("newList.unkonwn")}}</span> 
                        </div>
                        <div class="flex-center mt-2">
                          <img :src="giftIcon" class="w22" alt />
                          <span class="ml-4">{{item.gifts}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-center" v-if="!lastActive && coinslist[index]!=undefined">
                    <img :src="coinsIcon" class="w16" />
                    <span class="ml-4 bold fc-hui2">{{coinslist[index].reward_num}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-column flex-center flex-justify-center empty" v-else>
          <img src="../static/img/empty.png" alt />
          <span class="bold mt-18 fc-hui">{{$t("firstPage.noYet")}}</span>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import {jumpPersonDetail,jumpMessage, getIconName} from "../common/jsInteractive";
export default {
  props:['list','coinslist','giftIcon'],
  data () {
    return {
      showLast:false,
      coinsIcon:''
    };
  },
  mounted(){
    const packageName=getIconName();
    this.coinsIcon=require(`../static/img/${packageName}.png`);
  },
  watch:{
    lastActive(){
      if(this.lastActive){
        this.showLast=false;
      }else {
        this.showLast=true;
      }
    }
  },
  computed: {
     ...mapState({
      lastActive: "lastActive",
    }),
  },
  methods: {
      bg(n) {
        return require("../static/img/ic_gift_ranking" + n + ".png");
      },
      personDetail:function (jid) {
        if (jid.indexOf("user") == -1) {
            //   主播 
            if(window.bool){
              jumpMessage(jid);
            }
            // else{
            //    jumpPersonDetail(jid);
            // }
            
          }
        
      },
  }
}

</script>
<style lang='stylus' scoped>
    .list-box {
    border-radius: 0px 0px 12px 12px;
    .list{
      margin-top -0.027778rem;
    }
    

    .bg1 {
      background-image: linear-gradient(270deg, #FFF2D9 0%, #F8B83B 100%);
    }

    .bg2 {
      background-image: linear-gradient(270deg, #F4F4F4 0%, #DADADA 100%);
    }

    .bg3 {
      background-image: linear-gradient(270deg, #FFE1CD 0%, #D5793A 100%);
    }

    .list-person {
      height: 1.7778rem;
      width calc(100% - .2222rem)
    }

    .norwap {
      width: 4.1667rem;
      
    }

    .empty {
      height: 5.5556rem;

      img {
        width: 2.6389rem;
        height: 2.4444rem;
      }
    }
    .bottom-line{
      border-bottom 0.5px solid #F2F2F2;
    }
  }
</style>