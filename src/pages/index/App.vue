<template>
    <v-app id="app" light class="scroll-y" :class="{stop:stop}">
      <banner :date="date" :activity="activity" :hi="hi" @transtop="transtop"></banner>
      <div class="main">
      <div class="gift-content">
        <rankings v-if="!lastActive"></rankings>
      </div>
      <!-- <div class='reward' v-if='this.hasReward == 1 && !this.closeStatus'>
          <reward @closeDialog='closeDialog'/>
      </div> -->
      <!-- <transition name="fade">
         <first-page @cancelPage='cancelPage' v-if="pageb" :hi="hi" :class="{stop:pageb}"></first-page>
      </transition> -->
      <div class="mt-16 bottom-img bottom-fix">
      </div>
      </div>
      <transition name="fade">
        <lastactive v-if="lastActive"></lastactive>
      </transition>
      <!-- <transition name="fade">
        <result :receList="receList" :sendList="sendList" @hideResult="hideResult" v-if="res"></result>
      </transition> -->
      
    </v-app>
</template>
<script>
import { mapGetters, mapState,mapActions} from "vuex";
import Rankings from "../../components/Rankings.vue";
import Guide from "../../components/Guide.vue";
import Banner from '../../components/Banner'
import Reward from '../../components/Reward'
import firstPage from '../../components/FirstPage'
import lastactive from '../../components/lastActivity'
import ObtainReward from '../../components/ObtainReward'
import Result from '../../components/Result'
import {getCurrentJid} from '../../store/ApiHelper'
import {logEvent} from "../../common/jsInteractive"
export default {
  name: "App",
  components: {
    Banner,
    Rankings,
    Guide,
    Reward,
    ObtainReward,
    firstPage,
    lastactive,
    Result
  },
  data: function() {
    return {
      isTabOne: true,
      isTabTwo: false,
      lastAct:true,
      color: 0,
      allList:"",
      colors: ["white", "tab_text_color"],
      tabIndex: 0,
      tabHeight: "48px",
      closeStatus: false,
      pageb:false,
      active:true,
      fadeSlide:true,
      res:true,
      rewardArr:[],
      changeTitle:[
        {
          title:'Rankings',
          active:true
        },
        {
          title:'Guide to use',
          active:false
        }
      ],
      sendList:[],
      receList:[],
      date:[],
      hi:false,
      activity:{},
      stop:false
    };
  },
  created() {
    this.changeTitle[0].title=this.$t("ActivityPage.bt_regular");
    this.changeTitle[1].title=this.$t("ActivityPage.bt_ranking");
    // 判断为阿拉伯语,添加属性direction:rtl;unicode-bidi:bidi-override;
    if (this.$i18n.locale === "ar") {
      document.documentElement.style.direction = "rtl";
      document.documentElement.style.unicodeBidi = "bidi-override";
    }
    var screenWidth = window.screen.width;
    if (screenWidth >= 500) {
      this.tabHeight = "90px";
    }
    // this.fetchData();
    this.chooseContent();
    // 活动页面展示
    try{
      logEvent("event_activity_page_show", "");
    }catch(e) {}
  },
  
  computed: {
    ...mapState({
      resultData: "hasRewardResult",
      lastActive:"lastActive"
    }),
    showBox(){
      if(!this.rankShow && this.userShow == false && this.tabIndex == 0){
        return true;
      }
      if(!this.rankShow && this.userShow == true && this.tabIndex == 1){
        return true;
      }
    },
    styleAr(){
       // 阿拉伯语适配
      if (window.lang == "ar") {
        return true;
      }else{
        return '';
      }
    },
    hasReward() {
      if (this.resultData == undefined) {
        return 0;
      }
      // alert(window.lang)
      if (this.resultData.status == 1) {
        this.setBodyScroll(false);
      } else {
        this.setBodyScroll(true);
      }
      console.log(this.resultData,'kenan')
      return this.resultData.status;
    }
  },
  
  methods: {
   ...mapActions({
      actstate: "ACTIVITYSTATE",
      giftList: "ACTIVITYLIST"
    }),
    transtop(msg){
      this.stop=msg;
    },
    hideResult(msg){
      this.res=msg;
    },
    getIndex(msg){
      this.tabIndex=msg;
    },
    closeDialog(msg) {
      this.closeStatus = msg;
      this.setBodyScroll(true);
    },
    cancelPage(msg){
      this.pageb=msg;
    },
    changeTab(index) {
      for(var x of this.changeTitle){
        x.active=false;
      }
      this.changeTitle[index].active=true;
      if(index==0){
        this.rankShow=true;
      }else{
        this.rankShow=false;
      }
    },
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
      // console.log("fetchData");
      this.$store
        .dispatch("FETCH_RANKING_LIST", { myJid: window.jid })
        .then(() => {
          if(localStorage.getItem("rankStatus")==1){
            this.$store
            .dispatch("FETCH_HAS_REWARD", { myJid: window.jid })
            .then(result => {});
          }
          
          
        });
        
    },
    chooseContent(){
      // 判断是主播还是用户
      // console.log('00000000000'+getCurrentJid().indexOf('user'))
      if(getCurrentJid().indexOf('user')==-1){
        // 主播
        this.userShow=false;
      }else{
        // 用户
        this.userShow=true;
      }
    },

    loadTabHeight(val) {
      val.height = 90;
    },
    setBodyScroll: function(scroll) {
      if (!scroll) {
        document.documentElement.style.overflow = "hidden";
        document.body.scroll = "no";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      } else {
        document.documentElement.style.overflow = "scroll";
        document.body.scroll = "yes";
        document.body.style.position = "relative";
        document.body.style.width = "100%";
      }
    }
  },
  mounted(){
    //是否是第一次展示
    this.actstate().then(result=>{
      this.date=result.activity;
      this.hi=result.profile.is_india_anchor;
      this.activity=result;
    });
    // var sendData={
    //     jid: window.jid,
    //     type: "top_receivers",
    //     date_type: "all_time",
    //     is_old_actitiy: true
    // }
    // this.giftList(sendData).then(result => {
    //   var newArr=[result[1],result[0],result[2]];
    //   this.receList=newArr;
    // });
    // sendData.type="top_senders";
    // this.giftList(sendData).then(result => {
    //   var newArr=[result[1],result[0],result[2]];
    //   this.sendList=newArr;
    // });
    var pageBolean=localStorage.getItem('firstPage');
    if(pageBolean==1){
      this.pageb=false;
      return;
    }
    if(window.jid.indexOf('user')==-1){
         this.pageb=true;
    }else {
      this.pageb=false;
    }
    
    

    
  },
  watch: {
    
  }
};
</script>
<style lang='stylus' scoped>
*{
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #4F065E;
}
.main{
  width: 100%;
  height: 100%;
  background: #4F065E;
  background-size: 100%;
  position: relative;
  margin-top:.4444rem;
  padding-bottom 2.2222rem;
}

.changeTitle{
  text-align: center;
  margin-bottom: .5rem;
}
.changeTitle span{
  position: relative;
  margin-right: 1rem;
  color: rgba(46,205,208,0.60);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-size: .4rem;
}
.changeTitle span:last-child{
  margin-right: 0;
}
.changeTitle span.styleAr:first-child{
  margin-right: 0;
}
.changeTitle span.styleAr:last-child{
  margin-right: 1rem;
}
.changeTitle span.active{
  color: #2ECDD0;
  font-weight: bold;
  font-size: .533333rem;
}
.changeTitle span.active i{
  content: '';
  display: block;
  width: .666667rem;
  height: .133333rem;
  position: absolute;
  bottom: -0.166667rem;
  background:  #2ECDD0;
  transition: all 0.3s ease-in-out;
  transform: scale3d(0, 1, 1);
  left: 25%;
  border-radius: 3.333333rem;
  transform-origin: 50% 0;
}
.changeTitle span.active i {
  transform: scale3d(1, 1, 1);
}
.gift-content{
  position: relative;
}
.bottom-fix{
    position absolute
    bottom 0
    left 0
    z-index 2
  }
 .bottom-img{
    width:100%;
    height:1.5556rem;
    background:url('./src/static/img/bg_bottom.png') no-repeat center;
    background-size:100%;
  }


</style>
