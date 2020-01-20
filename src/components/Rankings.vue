<!-- 列表 -->
<template>
  <div class="rankings-box">
    <div class="rank-title flex-between rank-center">
      <a
        href="javascript:void(0)"
        class="fc-black bold fs-16 flex-center flex-justify-center"
        @click="changeTab(0)"
        :class="{active:tab[0].active,lastTab:lastActive}"
      >{{$t("ActivityPage.tab_receive")}}</a>
      <a
        href="javascript:void(0)"
        class="fc-black bold fs-16 flex-center flex-justify-center"
        @click="changeTab(1)"
        :class="{active:tab[1].active,lastTab:lastActive}"
      >{{$t("ActivityPage.tab_send")}}</a>
    </div>
    <div class="tab-box bg-white">
      <div
        class="tab-date bg-white flex-center flex-justify-center"
        :class="{'last-center':lastActive,'langAr':langAr}"
      >
        <a
          href="javascript:void(0)"
          class="tab-title border-r18 flex-center flex-justify-center mr-20 bold"
          v-for="(item,index) in dateTab"
          :key="index"
          @click="changeDate(index)"
          :class="{'bg-pink':item.active,'fc-white':item.active,'ml-20':index==0}"
        >{{item.name}}</a>
      </div>
    </div>
    <div class="line bg-hui1"></div>
    <div class="pt-16 bg-white" v-if="lastActive"></div>
    
    <div
      class="time bold fc-red flex-center flex-justify-center bg-white"
      v-if="!lastActive && timeList"
    >
      <div class="mr-6">{{$t("newList.ending")}}</div>
      <div v-if="this.dailyTime()">{{days}}d {{hours}}h</div>
      <div v-else>
        <span class="border-r4 fc-white bg-red ml-2 mr-2">{{hours}}</span>:
        <span class="border-r4 fc-white bg-red ml-2 mr-2">{{minutes}}</span>:
        <span class="border-r4 fc-white bg-red ml-2 mr-2">{{seconds}}</span>
      </div>
    </div>
    <ranklist :list="list" v-if="timeList" :coinslist="coinslist" :giftIcon="giftIcon"></ranklist>
    <datelist :datelist="datelist" :giftIcon="giftIcon" v-else></datelist>
    <transition name="fade">
      <my-self v-if="showBox" class="mine_rank" :person="person" :giftIcon="giftIcon" />
    </transition>
  </div>
</template>
<script>
import ranklist from "./RankList";
import datelist from "./DateList";
import MySelf from "./MySelf";
import { mapGetters, mapState, mapActions } from "vuex";
import { logEvent } from "../common/jsInteractive";
export default {
  data() {
    return {
      timeList: true,
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      allhours: "",
      allminutes: "",
      allseconds: "",
      rankCenter: false,
      showBox: false,
      person: {
        ranking: "**",
        gifts: this.$t("ActivityPerson.distance_else")
      },
      datelist: {},
      tab: [
        {
          active: false,
          title: "Top Receivers"
        },
        {
          active: true,
          title: "Top Senders"
        }
      ],
      dateTab: [
        {
          name: this.$t("newList.daily"),
          title: "daily",
          active: true
        },
        {
          name: this.$t("newList.allTime"),
          title: "all_time",
          active: false
        },
        {
          name: this.$t("newList.hallFame"),
          title: "hall_of_fame",
          active: false
        }
      ],
      receTab: [
        {
          name: this.$t("newList.daily"),
          title: "daily",
          active: true
        },
        {
          name: this.$t("newList.allTime"),
          title: "all_time",
          active: false
        },
        {
          name: this.$t("newList.hallFame"),
          title: "hall_of_fame",
          active: false
        }
      ],
      senderTab: [
        {
          name: this.$t("newList.allTime"),
          title: "all_time",
          active: true
        }
      ],
      lastTab: [
        {
          name: this.$t("newList.allTime"),
          title: "all_time",
          active: true
        },
        {
          name: this.$t("newList.hallFame"),
          title: "hall_of_fame",
          active: false
        }
      ],
      list: [],
      sendData: {
        jid: window.jid,
        type: "top_receivers",
        date_type: "daily"
      },
      daily: true,
      coinslist: [],
      giftIcon: "",
      nowTime: "",
      ans: false,
      timeActive: "",
      trueState: "",
      falseState: "",
      topReceivers: {
        daily: {
          jid: window.jid,
          type: "top_receivers",
          date_type: "daily",
          list: [],
          coinslist: []
        },
        allTime: {
          jid: window.jid,
          type: "top_receivers",
          date_type: "all_time",
          list: [],
          coinslist: []
        },
        hallOfFame: {
          jid: window.jid,
          type: "top_receivers",
          date_type: "hall_of_fame",
          list: [],
          coinslist: []
        }
      },
      topSenders: {
        allTime: {
          jid: window.jid,
          type: "top_receivers",
          date_type: "daily",
          list: [],
          coinslist: []
        }
      }
    };
  },
  mounted() {
    
    if (window.jid.indexOf("anchor") != "-1") {
      this.showBox = true;
    } else {
      this.showBox = false;
    }
    if (this.lastActive) {
      this.dateTab = this.lastTab;
      this.sendData.date_type = this.lastTab[0].title;
      this.sendData.type = "top_receivers";
      this.sendData.date_type = "all_time";
      this.showBox = false;
      this.actstate(true).then(result => {
        this.trueState = result;
        this.giftIcon = result.activity.thumbnail_url;
        this.coinslist = result.reward_alltime.anchor;
        this.nowTime = new Date(result.activity.now_time).getTime();
        this.timeActive = setInterval(this.countTime, 1000);
      });
    } else {
      this.actstate().then(result => {
        this.falseState = result;
        this.giftIcon = result.activity.thumbnail_url;
        this.coinslist = result.reward_daily.anchor;
        this.nowTime = new Date(result.activity.now_time).getTime();
        this.timeActive = setInterval(this.countTime, 1000);
      });
    }
    let sendObj = {
      jid: window.jid,
      type: this.topReceivers.daily.type,
      date_type: this.topReceivers.daily.date_type
    };
    this.mylist(sendObj, this.lastActive);
  },
  components: {
    ranklist,
    datelist,
    MySelf
  },
  computed: {
    ...mapState({
      lastActive: "lastActive",
      activityState: "activityState"
    }),
    ...mapGetters({
      mySelf: "mySelf"
    }),
    langAr() {
      if (window.lang == "ar") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      actstate: "ACTIVITYSTATE",
      giftList: "ACTIVITYLIST"
    }),
    touchmove() {
      console.log(this.$refs.clientLeft);
    },
    rank(arr) {
      let obj = {
        ranking: "**",
        gifts: this.$t("ActivityPerson.distance_else")
      };
      if (arr.length > 0) {
        arr.forEach((item, index) => {
          if (item.jid == window.jid) {
            obj = arr[index];
          }
        });
      }
      this.person = obj;
    },
    mylist(obj, bool) {
      // if (n == 1 || n==2) {
      //     this.getDateList();
      //   } else {
      //     this.giftList(this.sendData).then(result => {
      //       this.list = result;
      //       this.rank(this.list);
      //     });
      //   }
      // this.giftList

      let data = obj;
      data.is_old_actitiy = bool;
      // 收礼榜日榜
      this.giftList(data).then(result => {
        if(!bool){
          this.list = result;
        }
        this.topReceivers.daily.list = result;
        this.rank(this.list);
      });
      data.date_type = "all_time";
      this.giftList(data).then(result => {
        if(bool){
          this.list=result;
        }
        this.topReceivers.allTime.list = result;
      });
      // data.date_type='hall_of_fame';
      // this.giftList(data).then(result => {
      //       this.topReceivers.hallOfFame.list=result;
      //       this.rank(this.list);
      // });
      data.date_type = "hall_of_fame";
      this.giftList(data).then(result => {
        var arr = [];
        var dateArr = [];
        for (var x in result) {
          arr.push(x);
        }
        arr.sort(function(a, b) {
          return b - a;
        });
        for (var x of arr) {
          dateArr.push({
            date: x,
            data: result[x]
          });
        }
        this.topReceivers.hallOfFame.list = dateArr;
      });
      data.type = "top_senders";
      data.date_type = "all_time";
      this.giftList(data).then(result => {
        this.topSenders.allTime.list = result;
      });
      
    },
    dailyTime(){
      //设置结束时间
      var todyYear = new Date(this.nowTime).getFullYear();
      var todyMonth = new Date(this.nowTime).getMonth() + 1;
      var todyDay = new Date(this.nowTime).getDate();
      
      var endDate = new Date(
        todyYear + "/" + todyMonth + "/" + todyDay + " 23:59:00"
      );
      if(!this.falseState) return false;
      //  如果是今天活动结束
      if (
        new Date(this.falseState.activity.end_time).getTime() - endDate.getTime() <= 86400000
        
      ) {
        
        endDate = new Date(this.falseState.activity.end_time);
        
      }
      // //如果不是今天结束
      
      if (
        new Date(this.falseState.activity.end_time).getTime() - endDate.getTime() > 86400000
      ) {
        if (this.daily) {
          if (this.ans) {
            endDate = new Date(this.falseState.activity.end_time);
          } else {
            endDate = new Date(
              todyYear + "/" + todyMonth + "/" + todyDay + " 23:59:00"
            );
          }
        } else {
          endDate = new Date(this.falseState.activity.end_time);
        }
      }
      var end = endDate.getTime();
      
      //时间差
      var leftTime = end - this.nowTime; // 结束秒数 - 现在秒数
      var days=null;
      if (leftTime >= 0) {
        // 当结束时间大于等于0 的时候执行这里
        if (this.daily) {
          if (this.ans) {
           days = true
          } else {
            days = false;
          }
        } else {
          days = true;
        }
      }
      return days;
    },
    countTime() {
      //设置结束时间
      this.nowTime = this.nowTime + 1000;
      var todyYear = new Date(this.nowTime).getFullYear();
      var todyMonth = new Date(this.nowTime).getMonth() + 1;
      var todyDay = new Date(this.nowTime).getDate();
      
      var endDate = new Date(
        todyYear + "/" + todyMonth + "/" + todyDay + " 23:59:00"
      );
      
      // 如果是今天活动结束
      var activity=this.falseState.activity || this.trueState.activity;
      if (
        new Date(activity.end_time).getTime() - endDate.getTime() <= 86400000
      ) {
        endDate = new Date(activity.end_time);
      }
      //如果不是今天结束
      
      if (
        new Date(activity.end_time).getTime() - endDate.getTime() >
        86400000
      ) {
        if (this.daily) {
          if (this.ans) {
            endDate = new Date(activity.end_time);
          } else {
            endDate = new Date(
              todyYear + "/" + todyMonth + "/" + todyDay + " 23:59:00"
            );
          }
        } else {
          endDate = new Date(activity.end_time);
        }
      }
      if (
        new Date(activity.end_time).getTime() - endDate.getTime() <
        0
      ) {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(this.timeActive);
        return; // 并停止这个函数
      }
      
      var end = endDate.getTime();
      
      //时间差
      var leftTime = end - this.nowTime; // 结束秒数 - 现在秒数
      
      if (leftTime >= 0) {
        // 当结束时间大于等于0 的时候执行这里
        this.days = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.hours = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.minutes = Math.floor((leftTime / 1000 / 60) % 60);
        this.seconds = Math.floor((leftTime / 1000) % 60);
      }
      
    },
    changeTab(n) {
      this.coinslist = "";
      this.days='';
      this.hours='';
      this.minutes ='';
      this.seconds ='';
      for (var x of this.tab) {
        x.active = true;
      }
      this.tab[n].active = false;
      if (n == 1) {
        this.list = this.topSenders.allTime.list;
        this.rank(this.topSenders.allTime.list);
        this.ans=true;
        try {
          logEvent("event_activity_ranking_send_show", "");
        } catch (err) {
          // console.log(err)
        }
        this.daily = false;
        this.dateTab = this.senderTab;
        if (this.lastActive) {
          this.showBox = false; 
          this.coinslist = this.trueState.reward_alltime.user;
        } else {
          this.coinslist = this.falseState.reward_alltime.user;
          if (window.jid.indexOf("user") != "-1") {
            this.showBox = true;
          } else {
            this.showBox = false;
          }
        }
      } else {
        this.ans=false;
        if(this.lastActive){
          this.list = this.topReceivers.allTime.list;
        }else{
          this.list = this.topReceivers.daily.list;
        }
        this.rank(this.topReceivers.daily.list);
        try {
          logEvent("event_activity_ranking_receive_show", "");
        } catch (err) {
          // console.log(err)
        }
        this.daily = true;
        if (this.lastActive) {
          this.dateTab = this.lastTab;
          this.showBox = false;
        } else {
          this.dateTab = this.receTab;
          if (window.jid.indexOf("anchor") != "-1") {
            this.showBox = true;
          } else {
            this.showBox = false;
          }
        }
        this.sendData.type = "top_receivers";
        this.sendData.date_type = this.dateTab[n].title;
        if (this.lastActive) {
          this.coinslist = this.trueState.reward_alltime.anchor;
        } else {
          this.coinslist = this.falseState.reward_daily.anchor;
        }
      }
      for (var x of this.dateTab) {
        x.active = false;
      }
      this.dateTab[0].active = true;
      this.timeList = true;
      // this.mylist(0);
    },
    changeDate(n) {
      this.days='';
      this.hours='';
      this.minutes ='';
      this.seconds ='';
      this.coinslist = "";
      for (var x of this.dateTab) {
        x.active = false;
      }
      this.dateTab[n].active = true;
      if (this.lastActive) {
        if (n == 1) {
          this.timeList = false;
        } else {
          this.timeList = true;
        }

        if(this.daily){
          if(n==0){
            this.list = this.topReceivers.allTime.list;
            this.coinslist = this.trueState.reward_alltime.anchor;
          }
          if(n==1){
            this.timeList = false;
            this.datelist = this.topReceivers.hallOfFame.list;
          }
        }else{
          this.list=this.topSenders.allTime.list;
          this.coinslist = this.trueState.reward_alltime.user;
        }
      } else {
        if (this.daily) {
          if (n == 0) {
            this.ans=false;
            this.list = this.topReceivers.daily.list;
            this.rank(this.topReceivers.daily.list);
            try {
              logEvent("event_activity_ranking_receive_daily_show", "");
            } catch (e) {}
            if (this.lastActive) {
              this.coinslist = this.trueState.reward_daily.anchor;
            } else {
              // console.log(this.falseState,'ddaabb')
              this.coinslist = this.falseState.reward_daily.anchor;
            }
          }
          if (n == 1) {
            this.ans = true;
            this.list = this.topReceivers.allTime.list;
            this.rank(this.topReceivers.allTime.list);
            clearInterval(this.timeActive);
            this.timeActive = setInterval(this.countTime, 1000);
            try {
              logEvent("event_activity_ranking_receive_all_show", "");
            } catch (e) {}
            if (this.lastActive) {
              this.coinslist = this.trueState.reward_alltime.anchor;
            } else {
              this.coinslist = this.falseState.reward_alltime.anchor;
              
            }
          }

          if (n == 2) {
            this.timeList = false;
            this.showBox = false;
            this.datelist = this.topReceivers.hallOfFame.list;
            try {
              logEvent("event_activity_ranking_receive_fame_show", "");
            } catch (e) {}
          } else {
            this.timeList = true;
            
            if (window.jid.indexOf("user") == "-1") {
              this.showBox = true;
            } else {
              this.showBox = false;
            }
          }
        } else {
          this.timeList = true;
          if (window.jid.indexOf("user") != "-1") {
            this.showBox = true;
          } else {
            this.showBox = false;
          }
          if (this.lastActive) {
            this.coinslist = this.trueState.reward_alltime.user;
          } else {
            this.coinslist = this.falseState.reward_alltime.user;
          }
        }
      }
      
    }
  }
};
</script>
<style lang='stylus' scoped>
.rankings-box {
  width: 100%;
  overflow: hidden;

  .time {
    height: 1.2222rem;

    span {
      width: 0.5556rem;
      height: 0.5556rem;
      display: inline-block;
      line-height: 0.6rem;
    }
  &.fc-red{
    color: #FF856B;
    span{
      background: #FF856B;
    }
  }
  }
  
  .rank-title {
    a {
      width: 50%;
      border-radius: 12px 12px 0 0;
      background: #fff;
      height: 1.2222rem;
    }

    a.active {
      background: rgba(255, 255, 255, 0.4);
      color: rgba(255, 255, 255, 0.6);
    }

    .lastTab {
      color: #FF478D;
    }
    .fc-black{
     color: #220227;
    }
  }

  .tab-box {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 1.3889rem;
    position: relative;
  }

  .tab-box::-webkit-scrollbar {
    display: none;
  }

  .tab-date {
    height: 1.3889rem;
    min-width: 100%;
    position: absolute;
    left: 0;
    right: auto;
    top: 0;
    transition: all 0.2s;

    a {
      padding: 0 0.5556rem;
      height: 0.8333rem;
      color: #9066BD;
      white-space: nowrap;
    }
    .bg-pink{
      background: #9066BD;
    }

    .fc-white {
      color: #fff;
    }
  }

  .langAr {
    .mr-20 {
      margin-left: 0.2778rem;
    }
  }

  .last-center {
    .bg-pink {
      background: #FF478D;
    }

    a {
      color: #FF478D;
    }
  }

  .mine_rank {
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 99;
    box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>