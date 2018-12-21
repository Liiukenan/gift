<template>
<div class="banner-main" >
  <div class="banner_root" :style="{backgroundImage: 'url(' + getBannerBg() + ')' }">
    <v-layout column class="banner_content">
      <v-flex>
        <v-layout right class="text-xs-center">
          <v-dialog
            v-model="dialog"
            width="90%"
            height="80%"
            scrollable>
            <v-btn
              fab right class="banner_float"
              slot="activator"
              dark>
              {{$t("ActivityPage.bt_regular")}}
            </v-btn>
            <v-card color="white" class="rule-card" v-if="showDialog">
            <div class="close-box">
              <div class="close-main">
                <button v-on:click="onCloseBtn" class="rule-btn"></button>
              </div>
                
            </div>
              
              <v-card-text>
              <!-- Title -->
              <div class="rule-title">
                {{$t("Ranking.incentiveDetails.title")}}
              </div>
              <!-- Time -->
              <div class="rule-time">
                <p>{{$t("ActivityPage.time_1")}}</p>
                <p class="font-small">{{getActivityTime()}}</p>
              </div>
               <v-spacer/>
                <div class="rule-incentives">
                  <p v-html="$t('Ranking.incentiveDetails.activity_incentives')" class="font-bold"></p>
                  <p v-html="$t('Ranking.incentiveDetails.send_Top10')" class="font-small"></p>
                </div>
                <!-- top10 -->
                <table class="rule-prize">
                  <tr>
                    <th class="border-top border-left">
                      {{$t("Ranking.incentiveDetails.top")}}
                    </th>
                    <th class="border-top border-right">
                      {{$t("Ranking.incentiveDetails.activity_incentives")}}
                    </th>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       1
                    </td>
                   
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*7{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendOne")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       2
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*6{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendTwo")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       3
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*5{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendThree")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       4
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*4{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFour")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       5
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*3{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       6
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*2{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       7
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*1{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       8
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*1{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       9
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*1{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       10
                    </td>
                    
                    <td class="gift3 border-right">
                      <img src="../static/img/card2.png" alt="">
                       <span class="font-bold">*1{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.sendFive")}}
                      </p>
                    </td>
                  </tr>
                
               
               
                
                </table>
                <!-- activity incentives -->
                 <div class="rule-incentives">
                  
                  <p v-html="$t('Ranking.incentiveDetails.receive_Top10')" class="font-small"></p>
                </div>
                <table class="rule-prize">
                  <tr>
                    <th class="border-top border-left">
                      {{$t("Ranking.incentiveDetails.top")}}
                    </th>
                    <th colspan="2" class="border-top border-right border-bottom">
                      {{$t("Ranking.incentiveDetails.activity_incentives")}}
                    </th>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       1
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift7.png" alt="">
                      <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right border-top">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*10{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       2
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift7.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*9{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       3
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift7.png" alt="">
                      <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*8{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       4
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift8.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*7{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       5
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift8.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*6{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       6
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift8.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*5{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       7
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift9.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*4{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       8
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift9.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*3{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       9
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift9.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*2{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="gift1 border-left">
                       10
                    </td>
                    <td class="gift2">
                      <img src="../static/img/gift9.png" alt="">
                       <span class="font-bold"></span>
                    </td>
                    <td class="gift3 border-right">
                      <img src="../static/img/card1.png" alt="">
                       <span class="font-bold">*1{{$t("Ranking.incentiveDetails.days")}}</span>
                      <p class="gift-info">
                        {{$t("Ranking.incentiveDetails.anthorIncentives")}}
                      </p>
                    </td>
                  </tr>
                
                  
                  
                 
                </table>
              <!-- rules -->
              <div class="rule-details-title">
                <p class="font-middle">{{$t("Ranking.incentiveDetails.activity_rules")}}</p>
              </div>
              <!-- rules detail -->
              <div class="rule-content">
                <p v-html="$t('Ranking.incentiveDetails.rules_content')"></p>
              </div>
              <!--</div>-->
              <v-spacer/>
            </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="banner-box">
    </div>
  </div>
      <img  :src="giftId()" alt="" class="myGift" v-if="userShow">
      <button class="banner-btn" :class="bannerBtnFr">{{getActivityDesc(myActivity != null && myActivity.hasOwnProperty("status")?myActivity["status"]:"")}}</button>             
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {getCurrentJid} from '../store/ApiHelper'
export default {
  name: "Banner",
  data() {
    return {
      dialog: false,
      showDialog: false,
      banner_bg: [
        require("../static/img/ranking-list_bg_ar.jpg"),
        require("../static/img/ranking-list_bg_de.jpg"),
        require("../static/img/ranking-list_bg_en.jpg"),
        require("../static/img/ranking-list_bg_es.jpg"),
        require("../static/img/ranking-list_bg_fr.jpg"),
        require("../static/img/ranking-list_bg_hi.jpg"),
        require("../static/img/ranking-list_bg_in.jpg"),
        require("../static/img/ranking-list_bg_tr.jpg"),
      ],
      anchor_bg:[
        require("../static/img/anchor_ranking-list_bg_ar.jpg"),
        require("../static/img/anchor_ranking-list_bg_de.jpg"),
        require("../static/img/anchor_ranking-list_bg_en.jpg"),
        require("../static/img/anchor_ranking-list_bg_es.jpg"),
        require("../static/img/anchor_ranking-list_bg_fr.jpg"),
        require("../static/img/anchor_ranking-list_bg_hi.jpg"),
        require("../static/img/anchor_ranking-list_bg_in.jpg"),
        require("../static/img/anchor_ranking-list_bg_tr.jpg"),
      ],
      calBgImage:true,
      userShow:false
      
    };
  },
  methods: {
    onCloseBtn(event){
        console.log("close btn clicked")
        this.dialog = false
    },
    giftId(){
      return require(`../static/img/${localStorage.getItem('gift_id')}.png`)
    },
    getActivityTime: function() {
      var time = "";
      if (this.myActivity != null && this.myActivity.hasOwnProperty("time")) {
        time = this.myActivity["time"];
      }
      return time;
    },
    getActivityDesc: function(status) {
      var des = "";
      if (status === 0) {
        des = this.$t("ActivityPage.time").replace(
          "@@@",
          this.myActivity["time"]
        );
      } else if (status === 1) {
        des = this.$t("ActivityPage.activity_finish");
      } else if (status === 2) {
        des = "";
      }
      return des;
    },
    getBannerBg: function() {
      var path;
      if(this.userShow){
        if (window.lang == "ar") {
          path = this.banner_bg[0];
        } else if (window.lang == "de") {
          path = this.banner_bg[1];
        } else if (window.lang == "en") {
          path = this.banner_bg[2];
        } else if (window.lang == "es") {
          path = this.banner_bg[3];
        } else if (window.lang == "fr") {
          path = this.banner_bg[4];
        } else if (window.lang == "hi") {
          path = this.banner_bg[5];
        } else if (window.lang == "in") {
          path = this.banner_bg[6];
        } else if (window.lang == "tr") {
          path = this.banner_bg[7];
        } else {
          path = this.banner_bg[2];
        }
      }else{
        switch(window.lang){
          case 'ar':
          path = this.anchor_bg[0];
          break;
          case 'de':
          path = this.anchor_bg[1];
          break;
          case 'en':
          path = this.anchor_bg[2];
          break;
           case 'es':
          path = this.anchor_bg[3];
          break;
           case 'fr':
          path = this.anchor_bg[4];
          break;
           case 'hi':
          path = this.anchor_bg[5];
          break;
           case 'in':
          path = this.anchor_bg[6];
          break;
           case 'tr':
          path = this.anchor_bg[7];
        }
      }
      return path;
      
    }
  },
  created() {
    setTimeout(() => {
      this.showDialog = true;
    }, 0);
    // 判断是主播还是用户
   
    if(getCurrentJid().indexOf('user')==-1){
      //   主播
      this.userShow=false;
    }else{
      //   用户
      this.userShow=true;
    }
     
  },
  computed: {
    ...mapGetters({
      myActivity: "activity"
    }),
    
    bannerBtnFr(){
      if(window.lang=="fr"){
        // return 'banner-btn-fr';
        return '';
      }else{
        return '';
      }
    }
  },
  mounted() {
    this.calBgImage =
      document.body.clientWidth / document.body.clientHeight > 1.83;
      const that = this;
      window.onresize = function temp() {
        that.calBgImage =
        document.body.clientWidth / document.body.clientHeight > 1.83;
      };
  }
};
</script>
<style scoped>
.banner-main{
  position: relative;
  
}
.banner_root {
  background-size: cover;
  padding-top: 69%;
}

.banner-box{
  margin: 0 auto;
  padding-top: 10px;
}
.myGift{
  position: absolute;
  left:50%;
  bottom:13%;
  transform: translateX(-50%);
  width: 3.6rem;
  
}
 .banner-btn{
    padding:0 .333333rem;
    background: rgba(0,0,0,0.30);
    border-radius: .222222rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.333333rem;
    
    color: #EBD584;
    outline: none;
    position: absolute;
    left:50%;
    top:100%;
    width: 5.555556rem;
    z-index: 30;
    transform: scale(0.9) translateX(-55%);
  }
.banner_float{
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(-180deg, #FF7676 0%, #FF7676 100%);
  box-shadow: 0 3px 4px 0 rgba(170,47,161,0.30);
  width: 1.444444rem;
  height: 1.444444rem;
  font-size: .333333rem;
  transform: scale(0.8);
  /* background-color: #FF7676; */
}
.banner-btn-fr{
  margin: 41% auto 3%;
}
.rule-card{
  border-radius: .2rem;
}
.close-box{
  height: 30px;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.close-main{
  position: relative;
}
.rule-btn{
  width: .466667rem; 
  height: .466667rem; 
  margin-right: 10px;
  margin-top: 10px;
  float: right;
  background: url('./src/static/img/ic_closed.png') no-repeat;
  background-size: cover;
}
.rule-title{
  text-align: center;
   font-weight: bold;
   font-size: 18px;
   margin-top:.333333rem;
}
p{
  margin:0;
}
.rule-time{
  text-align: center;
  font-size: 14px;
  margin:0;
}
.rule-time p:first-child{
  font-weight: bold;
}
.rule-incentives{
  margin-top: .333333rem;
  font-size: 14px;
  
}
.rule-prize{
  font-size:14px;
  font-weight: normal;
  width: 100%;
  border-collapse: collapse;
  margin-top: .266667rem;
  background: rgba(158,0,232,0.07);
}
.rule-prize th{
  font-weight: 400;
  padding:5px 0;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.11);
}
.rule-prize td{
  border: 1px solid rgba(0,0,0,0.11);
  padding:5px 0;
}
.rule-prize img{
  width: .8rem;
  height: .8rem;
  vertical-align: bottom;
  display: inline-block;
  margin-right: .166667rem;
  
  
}
.rule-prize .gift1{
  width: 21%;
}
.rule-prize .gift2{
  width: 24%;
}
.rule-prize .gift-info{
  font-size: 12px;
  transform: scale(0.8);
  margin-top: -4px;
}
.rule-prize .border-top{
  border-top: none;
}
.rule-prize .border-right{
  border-right: none;
}
.rule-prize .border-left{
  border-left: none;
  font-weight: bold;
}
.rule-prize .border-bottom{
  border-bottom: none;
}
.rule-details-title{
  font-size: 14px;
  margin-top: .7rem;
  font-weight: bold;
  
}
.rule-content{
  color: rgba(0,0,0,0.60);
  text-align: left;
  font-size: 12px;

}
.font-bold{
  font-weight: bold;
  color: rgba(0,0,0,0.80);
}
.gift3 .font-bold{
  display:inline-block;
  vertical-align:top;
  margin-top: 4px;
}
.font-small{
  font-size: 12px;
}
.font-middle{
  font-size: 14px;
}
</style>
