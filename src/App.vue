<template>
  <div  id="app" class="scroll-y" >
    <banner />
    <v-tabs centered>
        <v-tab class="tab_item">
          <div>
            Receiving gifts
          </div>
        </v-tab>
        <v-tab >
          <v-btn round depressed disabled class="tab_item" color="white">
            Sending gifts
          </v-btn>
        </v-tab>
        <v-tab-item>
          <v-card color="white">
            <top-rank/>
            <ranking-list class="rank_item_list"/>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="white">
            <top-rank/>
            <ranking-list class="rank_item_list"/>
          </v-card>
        </v-tab-item>
    </v-tabs>
    <my-self class="mine_rank" />
  </div>
</template>

<script src="./common/jsInteractive.js"></script>
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
    margin-bottom: 70px;
  }
  .tab_item{
    text-transform: Capitalize;
    color: rgba(158,0,232, 1);
  }

</style>
