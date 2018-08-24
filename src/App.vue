<template>
    <v-app id="app" light class="scroll-y">
      <banner />
      <v-tabs centered hide-slider @input="changeTab" color="app_bg">
        <div class="tab_title">
            <v-tab v-bind:class="{selected_tab_item: isTabOne , unselected_tab_item : isTabTwo}">
              <div v-bind:class="{selected_tab_text: isTabOne , unselected_tab_text : isTabTwo}">
                {{$t("ActivityPage.tab_receive")}}
              </div>
            </v-tab>
            <v-tab v-bind:class="{selected_tab_item: isTabTwo , unselected_tab_item : isTabOne}">
              <div v-bind:class="{selected_tab_text: isTabTwo , unselected_tab_text : isTabOne}">
                {{$t("ActivityPage.tab_send")}}
              </div>
            </v-tab>
          </div>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <top-rank tabIndex="0"/>
              <RankingList tab_index="0" class="rank_item_list"/>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="white" class="tab_card">
              <top-rank tabIndex="1"/>
              <ranking-list tab_index ="1" class="rank_item_list"/>
            </v-card>
          </v-tab-item>
      </v-tabs>
      <my-self class="mine_rank" />
    </v-app>
</template>

<script>
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
    }
  },
  methods:{
    changeTab(val){
       this.isTabOne = val === 0;
       this.isTabTwo = val === 1;
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
    background: royalblue;
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

</style>
