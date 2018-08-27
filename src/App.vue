<template>
    <v-app id="app" light class="scroll-y">
      <banner />
      <v-tabs centered hide-slider @input="changeTab" color="app_bg">
        <div class="tab_title">
            <v-tab style="min-width: 120px" v-bind:class="{selected_tab_item: isTabOne , unselected_tab_item : isTabTwo}">
              <div v-bind:class="{selected_tab_text: isTabOne , unselected_tab_text : isTabTwo}">
                {{$t("ActivityPage.tab_receive")}}
              </div>
            </v-tab>
            <v-tab style="min-width: 120px" v-bind:class="{selected_tab_item: isTabTwo , unselected_tab_item : isTabOne}">
              <div v-bind:class="{selected_tab_text: isTabTwo , unselected_tab_text : isTabOne}">
                {{$t("ActivityPage.tab_send")}}
              </div>
            </v-tab>
          </div>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="0"/>
              <RankingList tab_index="0" class="rank_item_list"/>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <TopRank tabIndex="1"/>
              <ranking-list tab_index ="1" class="rank_item_list"/>
            </v-card>
          </v-tab-item>
      </v-tabs>
      <transition name="slide-fade">
        <my-self  v-if="(mySelf != undefined && mySelf['role'] == 'anchor' && tabIndex == 1 )||(mySelf != undefined && mySelf['role'] == 'user' && tabIndex == 0 )" class="mine_rank" />
      </transition>
    </v-app>
</template>

<script>
  import {mapGetters} from "vuex";
  import RankingList from './components/RankingList'
  import TopRank from './components/TopRank'
  import MySelf from './components/MySelf'
  import Banner from './components/Banner'

export default {
  name: 'App',
  components: {
    RankingList,
    TopRank,
    Banner,
    MySelf
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
      tabIndex:0
    }
  },
  created() {
    this.fetchData()
  },
  computed:{
    ...mapGetters({
      mySelf: "mySelf",
      myActivity: "activity"
    })
  },
  methods:{
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
      console.log("fetchData");
      this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
      });
    },
    changeTab(val){
       this.isTabOne = val === 0;
       this.isTabTwo = val === 1;
       this.tabIndex = val;
    }
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
    height: 70px;
  }
  .rank_item_list{
    margin-bottom: 80px;
  }
  .tab_title{
    height: 45px;
    border-radius: 50px;
    background: rgba(158,0,232, 1);
    white-space: nowrap;
    margin-left: auto;
    margin-right: auto;
  }

  .selected_tab_item{
    border-radius: 50px;
    background: white;
    font-size: 16px;
    font-weight: bold;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: Capitalize;
  }
  .unselected_tab_item{
    font-size: 16px;
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
  .tab_card{
    padding: 5px;
    margin: 10px;
    border-radius: 15px;
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

</style>
