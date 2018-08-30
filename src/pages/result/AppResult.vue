<template>
<v-layout light class="result_root">

    <v-layout class="result_content" column>

        <v-card class="result_card">
            <div class="title">
                <img class="title_bg" src="../../resource/receiver_bg.png">
                <span class="receiver_title">
                {{$t("ActivityPage.tab_receive")}}
                </span>
            </div>

            <top-rank tabIndex="0" isLarge="" />

            <div class="title" style="margin-top: 10px;white-space: nowrap">
                <img class="title_bg" src="../../resource/send_bg.png">
                <span class="send_title">
                {{$t("ActivityPage.tab_send")}}
                </span>
            </div>

            <top-rank tabIndex="1" isLarge=""/>

            <v-btn align-center round dark style="color: white" class="result_btn" @click="jumpActivityDetail">{{$t("HomePage.bt_enter")}}</v-btn>

        </v-card>

        <div class="result_top">
            <img :src="getPopBg()" style="width:100%"/>
        </div>


    </v-layout>

</v-layout>
</template>

<script>
    import TopRank from '../../components/TopRank';
    import {enterEventDetails} from "../../common/jsInteractive"
    export default {
      name:'Result',
      data: function () {
        return {
          popBgs:[
            require("../../../static/img/pop_bg_ar.png"),
            require("../../../static/img/pop_bg_de.png"),
            require("../../../static/img/pop_bg_en.png"),
            require("../../../static/img/pop_bg_es.png"),
            require("../../../static/img/pop_bg_fr.png"),
            require("../../../static/img/pop_bg_hi.png"),
            require("../../../static/img/pop_bg_in.png"),
            require("../../../static/img/pop_bg_tr.png")
          ]
        }
      },
      components: {
        TopRank
      },
      created() {
        this.fetchData()
      },
      methods:{
        fetchData() {
          // this.$i18n.locale = "en"; // 切换语言
          console.log("fetchData");
          this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
          });
        },
        getPopBg:function(){
          var path;
          if (window.lang == "ar"){
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
        jumpActivityDetail:function () {
          console.log("jumpActivityDetail");
          enterEventDetails("")
        }
      }
    }
</script>

<style>
.result_root{
  text-align: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.result_content{
    position:relative;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-left: 12%;
    margin-right: 12%;
}
.title_bg{
    margin-left:20px;
    margin-right:20px;
    width : 170px;
}
.receiver_title{
    position:absolute;
    margin:0 auto;
    top:3px;
    left:0;
    right:0;
    text-align:center;
    font-size:14px;
}
.send_title{
    position:absolute;
    left:0;
    margin-top: 3px;
    right:0;
    top: 0;
    text-align:center;
    font-size:14px;
}
.title{
    position:relative;
    color: white;
    width: 100%;
}
.result_btn{
    background-image:  linear-gradient(-180deg, #FC673F 0%,#EF3276 50%, #C826A8 100%);
    min-width:250px;
    font-size: 16px;
    height: 32px;
}
.result_card{
    background: white;
    margin:auto;
    position:absolute;
    left:0;
    right:0;
    padding-top:26px;
    top:66px;
    border-bottom-left-radius:15px;
    border-bottom-right-radius:15px;
    padding-bottom: 5px;
}
.result_top{
    z-index:1;
}
</style>

