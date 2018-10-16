<template>
    <v-layout align-center justify-center column class="reward_content">
        <div>
            <div class="reward_title">
                <img :src="getPopBg()" style="width:100%"/>
            </div>
            <v-card flat class="reward_card">
                <div class="obtain_coin_des">
                    Chompion Award Successful   
                </div>
                <div class="obtain_des">
                    Congratulations on receiving the 3-hour free call length award, which will be distributed in the form of gold coins to your account. You can check it out in the gold coin balance.
                </div>
                <div class="btn_layout">
                    <v-btn outline class="obtain_btn"  color="indigo" @click="goChat">Go to chat</v-btn>
                    <v-btn outline class="obtain_btn"  color="indigo" @click="checkScores">Check scores</v-btn>
                </div>
                
            </v-card>
        </div>
  </v-layout>
</template>

<script>
import {closePager, jumpMain} from "../common/jsInteractive"
export default {
  name: "ObtainReward",
  data: function() {
    return {
      popBgs: [
        require("../../static/img/pop_bg_ar.png"),
        require("../../static/img/pop_bg_de.png"),
        require("../../static/img/pop_bg_en.png"),
        require("../../static/img/pop_bg_es.png"),
        require("../../static/img/pop_bg_fr.png"),
        require("../../static/img/pop_bg_hi.png"),
        require("../../static/img/pop_bg_in.png"),
        require("../../static/img/pop_bg_tr.png")
      ],
      isAnchor:false,
      showAnimateLayout:false,
    };
  },
  created(){
      var currentJid = window.jid
  },
  methods: {
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
    goChat:function(){
        closePager()
    },
    checkScores:function(){
        enterEventDetails()
    }
  }
};
</script>

<style>
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
.obtain_des {
  margin-top: 16px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
}
.reward_layout {
  position: relative;
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
.obtain_coin_des {
  font-size: 18px;
  color: rgba(245,74,111,1);
}
.obtain_btn {
    border-radius: 20px;
  text-transform: capitalize;
  width: 126px;
  font-size: 14px;
  height: 36px;
}
.btn_layout{
    margin-top: 10px;
    width: 100%;
    display: flex;
}
</style>



