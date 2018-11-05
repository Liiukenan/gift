<template>
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


            <v-card color="white" style="border-radius: 6px;padding: 15px 10px 15px 15px" v-if="showDialog">
              <button v-on:click="onCloseBtn" style="width: 30px; height: 30px; display:flex; position: absolute; right: 0px; top: 5px;">
                <img src="../pages/index/assets/ic_closed.png" style="width:20px; height:20px; margin:0 auto">
              </button>

              <v-card-text style="height: 500px; margin-top: 10px;">
              <!-- Title -->
              <div style="text-align: center; width: 100%; margin-top: 10px; font-weight: bold;font-size: 18px">
                {{$t("Ranking.incentiveDetails.title")}}
              </div>
              <v-spacer/>
              <!-- Time -->
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p >{{$t("ActivityPage.time_1")}}</p>
              </div>
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p >{{getActivityTime()}}</p>
              </div>
                <!-- activity incentives -->
                <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.activity_incentives')"></p>
                </div>
                <v-spacer/>
                <!-- top10 -->
                <div style="text-align: center; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.receive_Top10')"></p>
                </div>
                <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.receive_Top10_content')"></p>
                </div>

                <div style="text-align: center; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.send_Top10')"></p>
                </div>
                <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.send_Top10_content')"></p>
                </div>
              <!-- rules -->
              <div style="text-align: center; width: 100%; margin-top: 10px;font-size: 14px">
                <p >{{$t("Ranking.incentiveDetails.activity_rules")}}</p>
              </div>
              <!-- rules detail -->
              <div style="text-align: left; width: 100%;font-size: 14px">
                <p v-html="$t('Ranking.incentiveDetails.rules_content')"></p>
              </div>
              <!--</div>-->
              <v-spacer/>
            </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
      <v-spacer/>
      <v-spacer/>
    <button class="banner-btn">{{getActivityDesc(myActivity != null && myActivity.hasOwnProperty("status")?myActivity["status"]:"")}}</button>             

      <v-spacer/>
      <v-spacer/>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Banner",
  data() {
    return {
      dialog: false,
      showDialog: false,
      banner_bg: [
        require("../static/img/list_bg_ar.png"),
        require("../static/img/list_bg_de.png"),
        require("../static/img/list_bg_en.png"),
        require("../static/img/list_bg_es.png"),
        require("../static/img/list_bg_fr.png"),
        require("../static/img/list_bg_hi.png"),
        require("../static/img/list_bg_in.png"),
        require("../static/img/list_bg_tr.png"),
      ],
      calBgImage:true
    };
  },
  methods: {
    onCloseBtn(event){
        console.log("close btn clicked")
        this.dialog = false
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
      return path;
    }
  },
  created() {
    setTimeout(() => {
      this.showDialog = true;
    }, 0);
  },
  computed: {
   
    ...mapGetters({
      myActivity: "activity"
    })
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
.banner_root {
  background-size: cover;
}
.banner-btn {
  padding:.133333rem .4rem;
  border-radius: 100px;
  background: rgba(7,6,34,0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.333333rem;
  margin: 39% auto 3%;
  transform: scale(0.8);
  color: #DA485D;
}
.banner_float{
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(-180deg, #D200B7 0%, #950083 100%);
  box-shadow: 0 3px 4px 0 rgba(170,47,161,0.30);
  width:1.75rem;
  height: 1.75rem;
  font-size: .4rem;
  transform: scale(0.8);
}

</style>
