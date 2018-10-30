<template>
  <div class="banner_root" :style="{backgroundImage: 'url(' + getBannerBg() + ')' }">
    <button class="banner-btn">{{getActivityDesc(myActivity != null && myActivity.hasOwnProperty("status")?myActivity["status"]:"")}}</button>             
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
  /* border-bottom: 1px solid #000844;
   */
}
.banner-btn {
  height: 0.533333rem;
  padding:0 .366667rem;
  line-height: .533333rem;
  border-radius: 100px;
  background: rgba(7, 6, 34, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.333333rem;
  color: #2fc3c5;
  margin: 48% auto 3%;
  transform: scale(0.8);
}

</style>
