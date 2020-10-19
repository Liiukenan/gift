<!-- hall of Fame -->

<template>
<!-- value,key,index -->
  <div class="datelist bg-white">
    <div v-if="listShow()">
      <div v-for="(inte,index) in datelist" :key="index">
        <div class="date-box pt-1">
          <div class="date-time mt-24 fc-white bold flex-left pl-8" :class="{'date-ar':langAr()}">{{inte.date | datetime}}</div>
          <div class="list-box">
            <div class="list-main mt-18 pl-24 pb-16">
              <!-- @click="personDetail(item.jid)" -->
              <div
                v-for="(item,i) in inte.data"
                :key="i"
                class="flex-column person-box flex-center pr-10"
                
                :class="{'pr-38':i==inte.data.length-1}"
              >
                <div class="person-pic">
                  <div class="w72 bg-person border-round" :class="{'border-first':item.ranking==1,'border-second':item.ranking==2,'border-third':item.ranking==3}">
                      <img
                        :src="item.avatarUrl"
                        alt
                        class="width68 border-round"
                        :class="{w72:item.ranking>3}"
                    />
                  </div>
                  <img :src="bg(item.ranking)" class="width-22 person-icon"  v-if="item.ranking<4" />
                </div>
                <div class="bold person-nickname mt-10 norwap">{{item.nickname || $t("newList.unkonwn")}}</div>
                <div class="flex-center">
                  <img :src="giftIcon" class="width-16" alt />
                  <span class="ml-4">{{item.gifts}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line bg-hui1" v-if="index+1!=datelist.length"></div>
      </div>
    </div>
    <div class="flex-column flex-center flex-justify-center empty" v-else>
      <img src="../static/img/empty.png" alt />
      <span class="bold mt-18 fc-hui">{{$t("firstPage.noYet")}}</span>
    </div>
  </div>
</template>
<script>
import { jumpPersonDetail,jumpMessage} from "../common/jsInteractive";
export default {
  props: ["datelist","giftIcon"],
  data() {
    return {
    };
  },
  computed:{
    
  },
  filters: {
    datetime(val) {
      var now = val.substring(4, val.length);
      var left = now.substring(0, 2);
      var right = now.substring(2, 4);
      if (left < 10) {
        left = left.substring(1, 2);
      }
      return left + "." + right;
    }
  },
  methods: {
    langAr(){
      if(window.lang=='ar'){
        return true;
      }else {
        return false;
      }
    },
    bg(n) {
      return require("../static/img/ic_gift_ranking" + n + ".png");
    },
    personDetail: function(jid) {
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
    listShow(){
        var i=0;
        for(var x in this.datelist){
            i++;
        }
        if(i>0){
            return true;
        }else{
            return false;
        }
    }
  }
};
</script>
<style lang='stylus' scoped>
.datelist {
  border-radius: 0 0 .3333rem .3333rem;
  .date-time {
    width: 1.6667rem;
    height: 0.5556rem;
    background: url('./src/static/img/halloffame.png') no-repeat bottom;
    background-size: 100%;
  }

  .person-box {
    float: left;
  }

  .list-main {
    display: flex;
    
  }

  .list-box {
    overflow-x: scroll;
    overflow-y: hidden;
    min-width: calc(100%+.5rem);
  }

  .person-pic {
    position: relative;
    width: 2rem;

    .person-icon {
      position: absolute;
      left: 0;
      bottom: -0.3333rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .empty {
    height: 5.5556rem;

    img {
      width: 2.6389rem;
      height: 2.4444rem;
    }
  }
  .date-ar{
    padding-right .4167rem
  }
  .person-nickname{
    width 2.7778rem
  }
  
}
</style>