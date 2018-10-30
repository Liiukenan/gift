<template>
      <v-layout align-center justify-center class="result_content" column>
        <div>
          <div class="result_title">
            <img :src="getPopBg()" style="width:100%"/>
          </div>
          <v-card flat class="result_card">
              <div class="title">
                  <img class="title_bg" src="../resource/receiver_bg.png">
                  <span class="receiver_title">
                  {{$t("ActivityPage.tab_receive")}}
                  </span>
              </div>

              <top-rank tabIndex="0" isLarge="" />

              <div class="title" style="margin-top: 10px;white-space: nowrap">
                  <img class="title_bg" src="../resource/send_bg.png">
                  <span class="send_title">
                  {{$t("ActivityPage.tab_send")}}
                  </span>
              </div>

              <top-rank tabIndex="1" isLarge=""/>

              <v-btn dark style="color: white" class="result_btn" @click="jumpActivityDetail">{{$t("HomePage.bt_enter")}}</v-btn>

          </v-card>

          </div>
      </v-layout>
</template>

<script>
import TopRank from "./TopRank";
import { enterEventDetails } from "../common/jsInteractive";
export default {
  name: "ResultList",
  data: function() {
    return {
      popBgs: [
        require("../static/img/pop2_bg_ar.png"),
        require("../static/img/pop2_bg_de.png"),
        require("../static/img/pop2_bg_en.png"),
        require("../static/img/pop2_bg_es.png"),
        require("../static/img/pop2_bg_fr.png"),
        require("../static/img/pop2_bg_hi.png"),
        require("../static/img/pop2_bg_in.png"),
        require("../static/img/pop2_bg_tr.png")
      ],
      rootHeight: 0
    };
  },
  components: {
    TopRank,
  },
  created() {
    // 判断为阿拉伯语,添加属性direction:rtl;unicode-bidi:bidi-override;
    if (this.$i18n.locale === "ar") {
      document.documentElement.style.direction = "rtl";
      document.documentElement.style.unicodeBidi = "bidi-override";
    }
    var screenHeight = window.screen.height;
    this.rootHeight = screenHeight;
    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
      console.log("fetchData");
      this.$store
        .dispatch("FETCH_RANKING_LIST", { myJid: window.jid })
        .then(() => {});
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
    jumpActivityDetail: function() {
      console.log("jumpActivityDetail");
      enterEventDetails("");
    }
  }
};
</script>

<style>
.result_root {
  text-align: center;
  background: rgba(0, 0, 0, 0.4) !important;
}
.result_content {
  position: relative;
  margin-left: 10%;
  margin-right: 10%;
}
.title_bg {
  margin-left: 20px;
  margin-right: 20px;
  width: 150px;
}
.receiver_title {
  position: absolute;
  margin: 0 auto;
  top: 3px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
}
.send_title {
  position: absolute;
  left: 0;
  margin-top: 3px;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 14px;
}
.title {
  position: relative;
  color: white;
  width: 100%;
}
.result_btn {
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
.result_card {
  margin-top: -10px;
  background: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-bottom: 5px;
}
.result_title {
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(255, 255, 255, 1) 35%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
