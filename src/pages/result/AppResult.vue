<template>
<v-app class="result_root">
    <reward @closeDialog='closeDialog' v-if="resultData.status == 1"/>
    <result-list v-if='resultData.status == 0'/>
</v-app>
</template>

<script>
import {closePager, jumpMain,enterEventDetails} from "../../common/jsInteractive"
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
  mounted() {
    this.fetchData();
  },
  computed: {
      ...mapState({
        resultData: "hasRewardResult"
      }),
  },
  methods: {
    closeDialog(msg){
      console.log('app result close dialog')
      enterEventDetails('')
    },
    fetchData() {
      // this.$i18n.locale = "en"; // 切换语言
       this.$store
        .dispatch("FETCH_RANKING_LIST", { myJid: window.jid })
        .then(() => {
         
          this.$store
          .dispatch("FETCH_HAS_REWARD", { myJid: window.jid })
          .then(result => {});
        });
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
