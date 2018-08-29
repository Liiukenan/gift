<template>
  <div class="banner_root">
    <img class="banner_img" :src="getBannerBg()"/>
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


            <v-card color="white" style="border-radius: 6px;padding: 15px 10px 15px 15px" v-if="showDialog">

              <button v-on:click="onCloseBtn" style="width: 30px; height: 30px; display:flex; position: absolute; right: 0px; top: 5px;">
                <img src="../assets/ic_closed.png" style="width:20px; height:20px; margin:0 auto">
              </button>

              <v-card-text style="height: 500px; margin-top: 10px;">
              <!-- Title -->
              <div style="text-align: center; width: 100%; margin-top: 10px; font-weight: bold;font-size: 18px">
                {{$t("Ranking.incentiveDetails.title")}}
              </div>
              <v-spacer/>
              <!-- Time -->
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p >{{getActivityTime()}}</p>
              </div>
              <!-- rules -->
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p >{{$t("Ranking.incentiveDetails.activity_rules")}}</p>
              </div>
              <!-- rules detail -->
              <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.rules_content')"></p>
              </div>

              <!-- activity incentives -->
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.activity_incentives')"></p>
              </div>
              <v-spacer/>
              <!-- top3 -->
              <div style="text-align: center; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.receive_Top3')"></p>
              </div>
              <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.receive_Top3_content')"></p>
              </div>

              <div style="text-align: center; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.send_Top3')"></p>
              </div>
              <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.send_Top3_content')"></p>
              </div>

              <v-spacer/>
            </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
      <v-spacer/>
      <v-spacer/>
      <v-flex xs1 class="banner_des">
        <v-btn outline round small color="activity_time_color" class="banner_des_btn">
          {{getActivityDesc(myActivity != null && myActivity.hasOwnProperty("status")?myActivity["status"]:"")}}
        </v-btn>
      </v-flex>
      <v-spacer/>
      <v-spacer/>
    </v-layout>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name: "Banner",
     data () {
      return {
        dialog: false,
        showDialog: false,
        banner_bg: [
          require("../../static/img/ranking_list_bg_ar.png"),
          require("../../static/img/ranking_list_bg_de.png"),
          require("../../static/img/ranking_list_bg_en.png"),
          require("../../static/img/ranking_list_bg_es.png"),
          require("../../static/img/ranking_list_bg_fr.png"),
          require("../../static/img/ranking_list_bg_hi.png"),
          require("../../static/img/ranking_list_bg_in.png"),
          require("../../static/img/ranking_list_bg_tr.png"),
        ]
      }
    },
    methods: {
      getActivityTime:function(){
        var time = "";
        if (this.myActivity != null && this.myActivity.hasOwnProperty("time")){
          time = this.$t("ActivityPage.time").replace("@@@",this.myActivity["time"]);
        }
        return time;
      },
      getActivityDesc:function(status){
        var des = "";
        if (status === 0){
          des = this.$t("ActivityPage.time").replace("@@@",this.myActivity["time"]);
        } else if (status === 1){
          des = this.$t("ActivityPage.activity_finish")
        } else if (status === 2){
          des = ""
        }
        return des
      },
      onCloseBtn(event){
        console.log("close btn clicked")
        this.dialog = false
      },
      getBannerBg:function () {
        var path;
        if (window.lang == "ar"){
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
        return path;
      }
    },
    created(){
      setTimeout(()=>{
        this.showDialog = true
      },0)
    },
    computed:{
      ...mapGetters({
        myActivity: "activity"
      })
    }
  }
</script>

<style scoped>

  .banner_root {
    width: 100%;
    padding: 0 auto;
    margin: 0 auto;
    position: relative;
  }

  .banner_content {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
  }

  .banner_des {
    bottom: 14%;
  }

  .banner_float {
    margin-top: 10px;
    margin-right: 10px;
    min-width: 42px;
    min-height: 42px;
    right: 0;
    font-size: 10px;
    color: white;
    text-transform: Capitalize;
    background-image:  linear-gradient(-180deg, #CA8EFF 0%, #007EE9 100%);
    box-shadow: 0 3px 4px 0;
  }

  .banner_img {
    width: 100%;
  }

  .banner_des_btn {
    height: 19px;
    margin-left: auto;
    margin-right: auto;
    font-size: 10px;
    padding-right: 15px;
    padding-left: 15px;
    background-image:linear-gradient(90deg, #FFFFFF 0%,#FF6841 50%, #FFFFFF 100%) ;
    text-transform: Capitalize;
  }

</style>
