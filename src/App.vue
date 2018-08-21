<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <top-rank/>
    <ranking-list/>
    <my-self class="mine_rank" />
  </div>
</template>

<script>
import RankingList from './components/RankingList'
import TopRank from './components/TopRank'
import MySelf from './components/MySelf'

export default {
  name: 'App',
  components: {
    RankingList,
    TopRank,
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
  margin-top: 60px;
}
  .mine_rank{
    position: fixed;
    bottom: 0px;
  }

</style>
