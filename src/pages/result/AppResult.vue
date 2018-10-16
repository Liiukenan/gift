<template>
<v-app class="result_root">
    <reward v-if='resultData.status == 1'/>
    <result-list v-if='resultData.status == 0'/>
</v-app>
</template>

<script>
import Reward from "../../components/Reward";
import ResultList from "../../components/ResultList";
  import {mapGetters,mapState} from "vuex";
export default {
  name: "Result",
  data: function() {
    return {
      showReward:false,
      showResultList:false,
    };
  },
  components: {
    Reward,
    ResultList
  },
  created() {
    this.fetchData();
  },
  computed: {
      ...mapState({
        resultData: "hasRewardResult"
      }),
  },
  methods: {
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
      console.log("fetchData");
      this.$store
        .dispatch("FETCH_HAS_REWARD", { myJid: window.jid })
        .then((result) => {});
      this.$store
        .dispatch("FETCH_RANKING_LIST", { myJid: window.jid })
        .then(() => {});
    }
  }
};
</script>

<style>
.result_root {
  text-align: center;
  background: rgba(0, 0, 0, 0.4) !important;
}
</style>
