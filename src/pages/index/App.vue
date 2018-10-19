<template>
    <v-app id="app" light class="scroll-y">
      <banner />
      <v-tabs centered hide-slider @input="changeTab" class="tabs" color="transparent" :height="tabHeight">
          <div class="tab_title">
            <v-layout>
              <v-tab class="tab_item" v-bind:class="{selected_tab_item: isTabOne , unselected_tab_item : isTabTwo}">
                <div v-bind:class="{selected_tab_text: isTabOne , unselected_tab_text : isTabTwo}">
                  {{$t("ActivityPage.tab_receive")}}
                </div>
              </v-tab>
              <v-tab class="tab_item" v-bind:class="{selected_tab_item: isTabTwo , unselected_tab_item : isTabOne}">
                <div v-bind:class="{selected_tab_text: isTabTwo , unselected_tab_text : isTabOne}">
                  {{$t("ActivityPage.tab_send")}}
                </div>
              </v-tab>
            </v-layout>
          </div>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="0" isLarge="true"/>
              <RankingList tab_index="0"/>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="1" isLarge="true"/>
              <ranking-list tab_index ="1"/>
            </v-card>
          </v-tab-item>
      </v-tabs>
      <transition name="slide-fade">
        <my-self  v-if="(mySelf != undefined && mySelf['role'] == 'anchor' && tabIndex == 0 )||(mySelf != undefined && mySelf['role'] == 'user' && tabIndex == 1 )" class="mine_rank" />
      </transition>

      <div class='reward' v-if='this.hasReward == 1 && !this.closeStatus'>
          <reward @closeDialog='closeDialog'/>
      </div>
    </v-app>
</template>

<script>
  import {mapGetters,mapState} from "vuex";
  import RankingList from '../../components/RankingList'
  import TopRank from '../../components/TopRank'
  import MySelf from '../../components/MySelf'
  import Banner from '../../components/Banner'
  import Reward from '../../components/Reward'
  import ObtainReward from '../../components/ObtainReward'
  import {logEvent} from "../../common/jsInteractive"


export default {
  name: 'App',
  components: {
    RankingList,
    TopRank,
    Banner,
    MySelf,
    Reward,
    ObtainReward
  },
  data:function(){
    return{
      isTabOne: true,
      isTabTwo:false,
      color:0,
      colors:[
          'white',
          'tab_text_color'
      ],
      tabIndex:0,
      tabHeight:'48px',
      closeStatus :false,
    }
  },
  created() {
    // 判断为阿拉伯语,添加属性direction:rtl;unicode-bidi:bidi-override;
    if(this.$i18n.locale === 'ar'){
      document.documentElement.style.direction = 'rtl'
      document.documentElement.style.unicodeBidi = 'bidi-override'
    }
    var screenWidth = window.screen.width;
    if (screenWidth>=500){
      this.tabHeight = '90px';
    }
    this.fetchData();
    // 活动页面展示
    logEvent("event_activity_page_show", "")
  },
  computed:{
    ...mapState({
        resultData: "hasRewardResult"
      }),
    ...mapGetters({
      mySelf: "mySelf",
      myActivity: "activity"
    }),
    hasReward(){
      if(this.resultData == undefined){
        return 0
      }
      if(this.resultData.status == 1){
          this.setBodyScroll(false)
      }else{
        this.setBodyScroll(true)
      }
      return this.resultData.status
    }
  },
  methods:{
    closeDialog(){
      this.closeStatus = true
      console.log('app  close dialog')
    },
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
      console.log("fetchData");
      this.$store
        .dispatch("FETCH_HAS_REWARD", { myJid: window.jid })
        .then((result) => {});
      this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
      });
    },
    changeTab(val){
       this.isTabOne = val === 0;
       this.isTabTwo = val === 1;
       this.tabIndex = val;
       if (this.isTabOne) {
         logEvent("event_activity_ranking_receive_show","")
       }
       if (this.isTabTwo){
         logEvent("event_activity_ranking_send_show","")
       }
    },
    loadTabHeight(val){
      console.log("height " + val);
      val.height = 90;
    },
    setBodyScroll:function(scroll){
      if(!scroll){
          document.documentElement.style.overflow = 'hidden';
          document.body.scroll = "no";
          document.body.style.position = "fixed";          
          document.body.style.width = "100%";
      } else{
          document.documentElement.style.overflow = 'scroll';
          document.body.scroll = "yes";
          document.body.style.position = "relative";
          document.body.style.width = "100%";
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(226,53,166,1);
  height: 100%;
}
  .mine_rank{
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: 56px;
  }

  .tab_title{
    height: 32px;
    border-radius: 50px;
    background: rgba(158,0,232, 1);
    white-space: nowrap;
    margin-left: auto;
    margin-right: auto;
  }

  .selected_tab_item{
    border-radius: 50px;
    background: white;
    font-size: 12px;
    font-weight: bold;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: Capitalize;
  }
  .unselected_tab_item{
    font-size: 12px;
    font-weight: bold;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: Capitalize;
  }
  .selected_tab_text{
    color: rgba(158,0,232, 1);
  }
  .unselected_tab_text{
    color: white;
  }
  .tab_card {
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 15px;
    margin-bottom: 60px;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(70px);
    opacity: 0;
  }
  .tab_item{
    width: 120px;
    height: 32px;
  }
  .tabs{
    margin-top: -40px;
  }
  .reward{
    position: absolute;
    left: 0;
    top: 0;
  }

</style>
