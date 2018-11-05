<template>
<v-app class="result_root">
    <v-layout align-center justify-center column class="reward_content" v-if="!obtainReward">
        <div>
            <div class="reward_title">
                <img :src="getPopBg()" style="width:100%"/>
            </div>
            <v-card flat class="reward_card">
                <div class="reward_des">
                    {{this.rewardDes}}
                </div>
                <div class="reward_layout">
                    <img v-bind:src="rewardCoinBg" class="reward_coin_bg"/>
                    <img v-bind:src="rewardPictureUrl" class="reward_coin"/>
                </div>
                <div class="reward_coin_des">
                    {{this.rewardCoinDes}}
                </div>
                <v-btn dark style="color: white" class="reward_btn" @click="receiveReward">{{$t("Reward.get_reward")}}</v-btn>
            </v-card>
        </div>
  </v-layout>
  <obtain-reward v-if="obtainReward" @checkScores='checkScores'/>
  <v-layout v-show='showAnimateLayout' class="animate_layout" id="animate_layout">
      <div class="coins_layout" id="coins_layout">
        <img v-bind:src="rewardLeftCoins" class="coins_left" id="left_coins_ele"/>
        <img v-bind:src="rewardRightCoins" class="coins_right" id="right_coins_ele"/>
      </div>
  </v-layout>
</v-app>
</template>

<script>
import dynamics from 'dynamics.js'
import ObtainReward from './ObtainReward'
import { setTimeout } from 'timers';
export default {
  name: "Reward",
  data: function() {
    return {
      popBgs: [
        require("../static/img/pop_bg_ar.png"),
        require("../static/img/pop_bg_de.png"),
        require("../static/img/pop_bg_en.png"),
        require("../static/img/pop_bg_es.png"),
        require("../static/img/pop_bg_fr.png"),
        require("../static/img/pop_bg_hi.png"),
        require("../static/img/pop_bg_in.png"),
        require("../static/img/pop_bg_tr.png")
      ],
      showAnimateLayout:false,
      obtainReward:false,
      coinAnimateCound:0,
      rewardCoinBg:'',
      rewardLeftCoins:'',
      rewardRightCoins:'',
    };
  },
  components: {
      ObtainReward
  },
  created(){
      var currentJid = window.jid
      this.rewardCoinBg = require('../static/img/reward_coin_bg.png')
      this.rewardLeftCoins = require('../static/img/coins_left.png')
      this.rewardRightCoins = require('../static/img/coins_right.png')
  },
  mounted(){
      this.$nextTick(() => {
        this.initViewLocation()
      })
  },
  computed:{
    isAnchor:function(){
        var response = this.$store.state.hasRewardResult;
        return response.userType == 'anchor'
    },
    rewardPictureUrl:function(){
        var response = this.$store.state.hasRewardResult;
        return this.isAnchor ? response.giftUrl : require('../static/img/reward_coin.png')
    },
    rewardDes:function(){
        var str = ''
        if(this.isAnchor){
            str = this.$t("Reward.anchor_reward_des")
        }else{
            str = this.$t("Reward.user_reward_des")
        }
        var response = this.$store.state.hasRewardResult;
        return str.replace('@',response.rank)
    },
    rewardCoinDes:function(){
        var str = ''
        var response = this.$store.state.hasRewardResult
        var rank = response.rank
        if(this.isAnchor){
            str = this.$t("Reward.receive_des")
            str = str.replace('@@',response.rewardNum)
            str = str.replace('@@@',response.inviteTimes)
            str = str.replace('@@@@',response.inviteDays)
            str = str.replace('@',rank)
        }else{
            str = this.$t("Reward.send_des")
            var rewardNum = 1
            if(rank == 1) rewardNum = 7
            else if(rank == 2) rewardNum = 6
            else if(rank == 3) rewardNum = 5
            else if(rank == 4) rewardNum = 4
            else if(rank == 5) rewardNum = 3
            else if(rank == 6) rewardNum = 2
            str = str.replace('@@',rewardNum)
            str = str.replace('@',rank)
        }
        return str
    }
  },
  methods: {
    checkScores(){
         console.log('----check scores ')
         this.$emit('closeDialog')
    },
    getPopBg: function() {
      var path;
      if (window.lang == "ar") {
        path = this.popBgs[0];
      } else if (window.lang == "de") {
        path = this.popBgs[1];
      } else if (window.lang == "en") {
        path = this.popBgs[2];
      } else if (window.lang == "es") {
        path = this.popBgs[3];
      } else if (window.lang == "fr") {
        path = this.popBgs[4];
      } else if (window.lang == "hi") {
        path = this.popBgs[5];
      } else if (window.lang == "in") {
        path = this.popBgs[6];
      } else if (window.lang == "tr") {
        path = this.popBgs[7];
      } else {
        path = this.popBgs[2];
      }
      return path;
    },
    initViewLocation:function(){
        console.log('init view location')
        var width = window.screen.width;
        var viewWidth = width/2
        var viewHeight = width / 2  *  327/618
        var leftCoinsElement = document.getElementById('left_coins_ele')
        leftCoinsElement.style.width = width / 2 +"px"
        leftCoinsElement.style.height = (width / 2  *  327/618 )+"px"
        leftCoinsElement.style.left = -width/2 +"px"
        var rightCoinsElement = document.getElementById('right_coins_ele')
        rightCoinsElement.style.width = width / 2 +"px"
        rightCoinsElement.style.height = (width / 2  *  312/648 )+"px"
        rightCoinsElement.style.left = width+"px"
    },
    receiveReward:function(){
        if(!this.isAnchor){
          this.receiveAnimate()
        }
        this.fetchData()
    },
    receiveAnimate:function(){
            this.showAnimateLayout = true
            var count = Math.random() * 15 + 30
            this.coinsInAnimate()
            for(var index = 0; index < count ; index ++){
                this.createSigleCoin(Math.random() * 2000 + 500)
            }
            var that = this
            setTimeout(function(){
                that.coinsOutAnimate(that)
            },3600)
    },
    coinsOutAnimate:function(that){
            var width = window.screen.width;
            var leftCoinsElement = document.getElementById('left_coins_ele')
            var rightCoinsElement = document.getElementById('right_coins_ele')
            dynamics.animate(leftCoinsElement,{
                translateX:-width/2
            },{
                duration: 700,
                friction:200,
                type:dynamics.easeOut
            })

            dynamics.animate(rightCoinsElement,{
                translateX:width/2
            },{
                duration: 700,
                friction:200,
                type:dynamics.easeOut,
                complete:function(){
                    that.showAnimateLayout = false
                }
            })
    },
    coinsInAnimate:function(){
            var width = window.screen.width;
            var leftCoinsElement = document.getElementById('left_coins_ele')
            var rightCoinsElement = document.getElementById('right_coins_ele')
            dynamics.animate(leftCoinsElement,{
                translateX:width/2
            },{
                duration: 500,
                friction:200,
                type:dynamics.easeOut
            })

            dynamics.animate(rightCoinsElement,{
                translateX:-width/2
            },{
                duration: 600,
                friction:200,
                type:dynamics.easeOut
            })
    },
    createSigleCoin:function(delay){
        var width = window.screen.width
        var height = window.screen.height

        var viewX = Math.random() * width
        var reboundX = width/2
        if(viewX < width / 2){
            reboundX = -width/2
        }
        var reboundY = height - Math.random() * height / 2
        var translateY = height - 40

        var duration = Math.random() * 300 + 600

        var animateEle = document.getElementById('animate_layout')
        var coinEle = document.createElement('img')
        coinEle.src = require('../static/img/coin.png')
        coinEle.style.width = '58px'
        coinEle.style.height = '58px'
        coinEle.style.position = 'absolute'
        coinEle.style.left = viewX + 'px'
        coinEle.style.top = '-58px'
        animateEle.appendChild(coinEle)
        this.$nextTick(function(){
            dynamics.animate(coinEle,{
                translateY:translateY,
            },{
                duration: 800,
                friction:104,
                type:dynamics.easeIn,
                delay:delay,
                complete:function(){
                    dynamics.animate(coinEle,{
                        translateY:reboundY,
                        translateX:reboundX
                    },{
                        type:dynamics.easeOut,
                        duration: 400,
                        complete:function(){
                            animateEle.removeChild(coinEle)
                        }
                    })
                }
            })
        })
    },
    fetchData() {
      console.log("fetchData");
      this.$store
        .dispatch("FETCH_REWARD", { myJid: window.jid })
        .then((result) => {
            this.obtainReward = result
        });
    }
  }
};
</script>

<style>
.result_root {
  text-align: center;
  background: rgba(0, 0, 0, 0.4) !important;
}
.reward_title {
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(255, 255, 255, 1) 35%,
    rgba(255, 255, 255, 1) 100%
  );
}
.reward_content {
  position: relative;
  margin-left: 10%;
  margin-right: 10%;
}
.reward_card {
  margin-top: -10px;
  background: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-bottom: 5px;
}
.reward_des {
  color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
.reward_layout {
  position: relative;
}
.reward_gift {
  margin: auto;
  width: 120px;
  height: auto;
}
.reward_coin {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 120px;
  height: auto;
}
.reward_coin_bg {
  width: 160px;
  height: auto;
  -webkit-animation: bg_rotate 4s linear infinite;
  -moz-animation: bg_rotate 4s linear infinite;
  animation: bg_rotate 4s linear infinite;

}
.reward_coin_des {
  font-size: 14px;
  color: red;
  margin-left: 10px;
  margin-right: 10px;
}
.reward_btn {
  text-transform: capitalize;
  border-radius: 18px;
  background-image: linear-gradient(
    -180deg,
    #fc673f 0%,
    #ef3276 50%,
    #c826a8 100%
  );
  min-width: 200px;
  font-size: 16px;
  height: 36px;
}

@keyframes bg_rotate{
    0%{
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
        transition:
    }
}
.coins_left{
    position: absolute;
    left: 0px;
    bottom: -5px;
}
.coins_right{
    position: absolute;
    left: 0px;
    bottom: 0px
}
.coins_layout{
    width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
    position: absolute;
}
.animate_layout{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
}
</style>
