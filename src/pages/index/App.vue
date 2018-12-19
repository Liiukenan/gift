<template>
    <v-app id="app" light class="scroll-y">
      <banner/>
      <div class="main">
        
      <!-- <user v-if="userShow"></user> -->
      <!-- <AnchorHoliday v-if="!userShow"></AnchorHoliday> -->
      <!-- <div class="changeTitle">
        <span v-for="(item,index) in changeTitle"  :key="index" :class="{'active':item.active,'styleAr':styleAr}" @click="changeTab(index)">
            {{item.title}}
            <i></i>
        </span>
      </div> -->
      <div class="gift-content">
        <rankings  @transIndex="getIndex" :tabIndex="tabIndex"></rankings>
        <!-- <guide v-show="rankShow"></guide> -->
      </div>
      <transition name="slide-fade">
          <my-self  v-if="showBox" class="mine_rank"/>
      </transition>
     
      <div class='reward' v-if='this.hasReward == 1 && !this.closeStatus'>
          <reward @closeDialog='closeDialog'/>
      </div>
      </div>
    </v-app>
</template>
<script>
import { mapGetters, mapState} from "vuex";
import Rankings from "../../components/Rankings.vue";
import Guide from "../../components/Guide.vue";
import Banner from '../../components/Banner'
import Reward from '../../components/Reward'
import MySelf from '../../components/MySelf'
import ObtainReward from '../../components/ObtainReward'
import {getCurrentJid} from '../../store/ApiHelper'
import {logEvent} from "../../common/jsInteractive"
// import User from '../../components/user'
// import AnchorHoliday from "../../components/AnchorHoliday.vue";
export default {
  name: "App",
  components: {
    Banner,
    Rankings,
    Guide,
    // User,
    // AnchorHoliday,
    MySelf,
    Reward,
    ObtainReward
  },
  data: function() {
    return {
      isTabOne: true,
      isTabTwo: false,
      color: 0,
      colors: ["white", "tab_text_color"],
      tabIndex: 0,
      tabHeight: "48px",
      closeStatus: false,
      // rankShow: true,
      active:true,
      // userShow:false,
      fadeSlide:true,
      changeTitle:[
        {
          title:'Rankings',
          active:true
        },
        {
          title:'Guide to use',
          active:false
        }
      ]
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
    this.fetchData();
    this.chooseContent();
    // 活动页面展示
    logEvent("event_activity_page_show", "");
    
  },
  
  computed: {
    ...mapState({
      resultData: "hasRewardResult"
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
    ...mapGetters({
      mySelf: "mySelf",
      myActivity: "activity"
    }),
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
    getIndex(msg){
      this.tabIndex=msg;
    },
    closeDialog(msg) {
      this.closeStatus = msg;
      this.setBodyScroll(true);
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
      console.log(this.hasReward,'kenan9')
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
      console.log("height " + val);
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
  }
};
</script>
<style>
*{
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background:  #000844; */
  background: #9D1024;
}
.main{
  width: 100%;
  height: 100%;
  padding-top: 8px;
  background: #9D1024;
  background-size: 100%;
  position: relative;
  margin-top:.4rem
}
.mine_rank {
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 56px;
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
  height: 100%;
  
}
</style>
