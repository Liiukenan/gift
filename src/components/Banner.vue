<template>
  <div class="banner-main">
    <div class="banner_root" :style="{backgroundImage: 'url(' + getBannerBg() + ')' }">
        <button class="previous-btn fc-white fs-12" @click="previous">
          <span>{{$t("newList.prevAct")}}</span>
        </button>
        <button class="rules" @click="showRules">
          <span>{{$t("Ranking.incentiveDetails.activity_rules")}}</span>
        </button>
      <v-layout>
        <v-flex>
          <v-layout>
            <v-dialog v-model="dialog" width="100%" height="80%"   scrollable>
              <v-card color="white" class="rule-card" v-if="showDialog">
                <div class="close-box">
                  <div class="close-main">
                    <button v-on:click="onCloseBtn" class="rule-btn"></button>
                  </div>
                </div>
                <v-card-text>
                  <!-- Title -->
                  <div class="rule-title bold">{{$t("firstPage.title")}}</div>
                  <!-- Time -->
                  <div class="rule-time mt-16 flex-center flex-column">
                    <p>{{$t("firstPage.firstOne")}}</p>
                    <p class="font-small fs-14 fc-hui1">{{$t("firstPage.hit")}}</p>
                  </div>
                  <div class="rule-time mt-16">
                    <p>{{$t("firstPage.dounble")}}</p>
                    <p class="font-small fs-14 fc-hui1">{{$t("firstPage.doubleCont")}}</p>
                  </div>
                  <div class="rule-time mt-16">
                    <p>{{$t("firstPage.third")}}</p>
                    <p class="font-small fs-14 fc-hui1">{{$t("firstPage.thirdCont")}}</p>
                  </div>
                  <div class="rule-time mt-16" v-if="hi">
                    <p>{{$t("firstPage.four")}}</p>
                    <p class="font-small fs-14 fc-hui1">{{$t("firstPage.fourCont")}}</p>
                  </div>
                  <v-spacer/>
                  <div class="rule-incentives">
                    <p
                      v-html="$t('Ranking.incentiveDetails.activity_incentives')"
                      class="font-bold fs-18"
                    ></p>
                    <p v-if="activity.reward_alltime" v-html="$t('Ranking.incentiveDetails.send_Top10').replace('5',activity.reward_alltime.user.length)" class="font-small bold fc-hui1 fs-14"></p>
                  </div>
                  <!-- top10 -->
                  <table class="rule-prize rule-user">
                    <tr>
                      <th class="flex-between fc-hui1">
                      <div class="pl-20 bold">{{$t("Ranking.incentiveDetails.top")}}</div>
                      <div
                        class="pr-20 bold"
                      >{{$t("Ranking.incentiveDetails.activity_incentives")}}</div>
                      </th>
                    </tr>
                    <template v-if="activity.reward_alltime">
                    <tr  v-for="(item,index) in activity.reward_alltime.user" :key="index">
                      <td class="flex-between flex-center">
                        <div class="bold">{{index+1}}</div>
                        <div class="bold  flex-right flex-center">
                          <img :src="coinsIcon" class="w16">
                          <span class="font-bold">{{item.reward_num}}</span>
                        </div>
                      </td>
                    </tr>
                    </template>
                  </table>
                  <div class="rule-incentives">
                    <p
                      class="font-bold fs-18"
                    >
                    {{$t("newList.toplist")}}
                    </p>
                    <p class="font-small bold fc-hui1 fs-14" v-if="activity.reward_daily">
                      {{$t("newList.top5").replace('5',activity.reward_daily.anchor.length)}}
                    </p>
                  </div>
                  <!-- top10 -->
                  <table class="rule-prize rule-user">
                    <tr>
                      <th class="flex-between fc-hui1">
                      <div class="pl-20 bold">{{$t("Ranking.incentiveDetails.top")}}</div>
                      <div
                        class="pr-20 bold"
                      >{{$t("Ranking.incentiveDetails.activity_incentives")}}</div>
                      </th>
                    </tr>
                    <template v-if="activity.reward_daily">
                      <tr v-for="(item,index) in activity.reward_daily.anchor" :key="index">
                        <td class="flex-between flex-center">
                          <div class="bold">{{index+1}}</div>
                          <div class="bold  flex-right flex-center">
                            <img :src="coinsIcon" class="w16">
                            <span class="font-bold">{{item.reward_num}}</span>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </table>
                  <div class="rule-incentives">
                    <p
                      class="font-bold fs-18"
                    >
                    {{$t("newList.alltimeList")}}
                    </p>
                    <p class="font-small bold fc-hui1 fs-14" v-if="activity.reward_alltime">
                      {{$t("newList.top5").replace('5',activity.reward_alltime.anchor.length)}}
                    </p>
                  </div>
                  <!-- top10 -->
                  <table class="rule-prize rule-user">
                    <tr>
                      <th class="flex-between fc-hui1">
                      <div class="pl-20 bold">{{$t("Ranking.incentiveDetails.top")}}</div>
                      <div
                        class="pr-20 bold"
                      >{{$t("Ranking.incentiveDetails.activity_incentives")}}</div>
                      </th>
                    </tr>
                    <template v-if="activity.reward_alltime!=undefined">
                      <tr v-for="(item,index) in activity.reward_alltime.anchor" :key="index">
                        <td class="flex-between flex-center">
                          <div class="bold">{{index+1}}</div>
                          <div class="bold  flex-right flex-center">
                            <div class="mr-8 flex-center" v-if="item.invite_days>0">
                              <img src="../static/img/ticket.png" class="w16">
                              <span class="font-bold" v-if="item.invite_days>1">{{item.invite_days}} {{$t("Ranking.incentiveDetails.days")}}</span>
                              <span class="font-bold" v-else>{{item.invite_days}} {{$t("Ranking.incentiveDetails.day")}}</span>
                            </div>
                            <div class="flex-center">
                              <img :src="coinsIcon" class="w16">
                              <span class="font-bold">{{item.reward_num}}</span>
                            </div>
                            
                          </div>
                        </td>
                      </tr>
                    </template>
                  </table>
                
                  <!-- rules -->
                  <div class="rule-details-title fs-18 bold">
                    <p>{{$t("Ranking.incentiveDetails.activity_rules")}}</p>
                  </div>
                  <!-- rules detail -->
                  <div class="rule-content fc-hui2 fs-14" :class="{'langAr':langAr}">
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
      <div class="banner-box"></div>
    </div>
    <div class="flex-justify-center flex-center">
      <div
      class="banner-btn mr-8 flex-center"
    >{{$t("newList.time")}}{{date.time}}
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from "vuex";
import { getIconName } from '../common/jsInteractive';
import { getCurrentJid } from "../store/ApiHelper";
export default {
  props:['date','activity','hi'],
  name: "Banner",
  data() {
    return {
      dialog: false,
      showDialog: false,
      coinsIcon:'default',
      sendList:[
        {money:16200},
        {money:12600},
        {money:9000},
        {money:5400},
        {money:1800}

      ],
      dailyList:[
        {money:16200},
        {money:12600},
        {money:9000},
        {money:5400},
        {money:1800}
      ],
      banner_bg: [
        require("../static/img/ranking-list_bg_ar.jpg"),
        require("../static/img/ranking-list_bg_de.jpg"),
        require("../static/img/ranking-list_bg_en.jpg"),
        require("../static/img/ranking-list_bg_es.jpg"),
        require("../static/img/ranking-list_bg_fr.jpg"),
        require("../static/img/ranking-list_bg_hi.jpg"),
        require("../static/img/ranking-list_bg_in.jpg"),
        require("../static/img/ranking-list_bg_tr.jpg"),
        require("../static/img/ranking-list_bg_ko.jpg"),
        require("../static/img/ranking-list_bg_zh_TW.jpg"),
        require("../static/img/ranking-list_bg_ja.jpg")
      ],
      
      calBgImage: true,
      userShow: false
    };
  },
  methods: {
    ...mapMutations([
      "setLastActive"
    ]),
    getActivityDesc(d){
      var des = "";
      if (d.status === 0) {
        des = this.$t("ActivityPage.time").replace(
          "@@@",
          d.time
        );
      } else if (d.status === 1) {
        des = this.$t("ActivityPage.activity_finish");
      } else if (d.status === 2) {
        des = "";
      }
      return des;
    },
    previous(){
      this.setLastActive(true);
    },
    showRules(){
      this.dialog = true;
      this.$emit('transtop',true);
    },
    onCloseBtn(event) {
      this.dialog = false;
      this.$emit('transtop',false);
    },
    giftId() {
      return require(`../static/img/${localStorage.getItem("gift_id")}.png`);
    },
    getActivityTime: function() {
      var time = "";
      if (this.myActivity != null && this.myActivity.hasOwnProperty("time")) {
        time = this.myActivity["time"];
      }
      return time;
    },
    getBannerBg: function() {
      let n = null;
      let lang = window.lang;
      const langArr = ["ar", "de", "en", "es", "fr", "hi", "in", "tr","ko","zh_TW","ja"];
      if (langArr.includes(lang)) {
        n = langArr.indexOf(lang);
      }else{
        n =1
      }
      return this.banner_bg[n];
    }
  },
  created() {
    setTimeout(() => {
      this.showDialog = true;
    }, 0);
    // 判断是主播还是用户
    if (getCurrentJid().indexOf("user") == -1) {
      //   主播
      
      this.userShow = false;
    } else {
      //   用户
      this.userShow = true;
    }
  },
  computed: {
    ...mapGetters({
      myActivity: "activity"
    }),
    langAr(){
      if(window.lang=='ar'){
        return true;
      }else{
        return false;
      }
    },
    bannerBtnFr() {
      if (window.lang == "fr") {
        // return 'banner-btn-fr';
        return "";
      } else {
        return "";
      }
    }
  },
  mounted() {
    const packageName=getIconName();
    this.coinsIcon=require(`../static/img/${packageName}.png`);
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
<style lang='stylus' scoped>
.banner-main {
  position: relative;
  .previous-btn{
    position:absolute;
    right 0
    top .4444rem
    width 2rem
    border-radius .2222rem 0 0 .2222rem
    background-image: linear-gradient(180deg, #CD84FF 0%, #8751FF 90%);
    transition all 0.2s
    min-height 1rem
    span{
      transform scale(0.8)
      display inline-block
      word-break break-word
      color: rgba(255,255,255,0.80);
    }
  }
  .rules{
    border-radius 50%
    position absolute
    left .3333rem
    top .4444rem
    width 1.25rem
    height 1.25rem
    color: rgba(255,255,255,0.80);
    background-image: linear-gradient(180deg, #CD84FF 0%, #8751FF 90%);
    span{
      transform scale(0.8)
      display inline-block
    }
  }
}
.banner_root {
  background-size: cover;
  padding-top: 72%;
  
}
.v-dialog__content{
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}


/* .banner-box{ */
/* margin: 0 auto; */
/* padding-top: 10px; */
/* } */
.myGift {
  position: absolute;
  left: 50%;
  bottom: 13%;
  transform: translateX(-50%);
  width: 3.6rem;
}

.banner-btn {
  padding: 0 .4444rem;
  background: rgba(0,0,0,0.30);
  border-radius: .3056rem;
  font-size: 0.333333rem;
  color: #fff;
  outline: none;
  height .6111rem
  line-height: 0.444444rem;
  white-space nowrap
  z-index: 30;
}

.banner_float {
  position: absolute;
  right: 0;
  top: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: .3333rem;
  transform: scale(0.8);
  font-weight: bold;
  background-image: linear-gradient(0deg, #860B81 0%, #EA1FD3 100%);
  box-shadow: 0 2px 6px 0 rgba(205,94,94,0.60);
  
}
.banner-btn-fr {
  margin: 41% auto 3%;
}
.rule-card {
  border-radius: 0.2rem;
}
.close-box {
  height: 30px;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.close-main {
  position: relative;
}
.rule-btn {
  width: 0.466667rem;
  height: 0.466667rem;
  margin-right: 10px;
  margin-top: 10px;
  float: right;
  background: url("./src/static/img/ic_closed.png") no-repeat;
  background-size: cover;
}
.rule-title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-top: 0.5rem;
}
p {
  margin: 0;
}
.rule-time {
  padding 0 .5556rem
  font-size: 14px;

}
.rule-time p:first-child {
  font-weight: bold;
}
.rule-incentives {
  margin-top: .8333rem
  font-size: 14px;
}
.rule-prize {
  font-size: 14px;
  font-weight: normal;
  width: 100%;
  border-collapse: collapse;
  background: #F9F2FF;
  margin-top: 0.266667rem;
}
.rule-prize th {
  font-weight: 400;
  padding-top: .1389rem;
  padding-bottom: .1389rem;
}
.rule-prize tr:nth-child(even){
  background: rgba(255,255,255,0.50);
}
.rule-prize td {
  padding: .2222rem .5556rem;
}
.rule-prize img {
  vertical-align: bottom;
  display: inline-block;
  margin-right: .1111rem
}
.rule-prize .gift1 {
  width: 21%;
}
.rule-prize .gift2 {
  width: 24%;
}
.rule-prize .gift-info {
  font-size: 12px;
  transform: scale(0.8);
  margin-top: -4px;
}
.rule-prize .border-top {
  border-top: none;
}
.rule-prize .border-right {
  border-right: none;
}
.rule-prize .border-left {
  border-left: none;
  font-weight: bold;
}
.rule-prize .border-bottom {
  border-bottom: none;
}
.rule-prize .gift2 img {
  margin-right: 0;
}
.rule-prize .gift2 span {
  margin-top: -5px;
  display: inline-block;
}
.rule-user .border-right img{
  width: .5556rem;
  height: .5556rem;
  margin-right: 0;
}
.rule-details-title {
  margin-top: 0.7rem;
}
.rule-content {
  text-align: left;
  margin-top .2222rem
  p{
    word-break break-word
  }
}
.langAr{
  text-align right
}
.font-bold {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
}

.gift3 .font-bold {
  display: inline-block;
  vertical-align: top;
  margin-top: 4px;
}
.gift3 .gift-number {
  margin-top: 0px;
}
.font-small {
  font-size: 12px;
}
.font-middle {
  font-size: 14px;
}
</style>
