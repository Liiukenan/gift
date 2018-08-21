<template>
    <div class="ranking-list">
        <h1>礼物之星</h1>
        <div>
            <md-list>
                <md-list-item v-for="x of others" :key="x.id">
                <span>{{x.id}}</span>
                <md-avatar>
                    <img v-bind:src="`${x.avatar}`" width="200"/> 
                </md-avatar>
                <span class="md-list-item-text">{{x.name}}</span>
                <span class="value">{{x.value}}</span>
                </md-list-item>
            </md-list>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "RankingList",
  data: function() {
    return {
      anchorList: []
    };
  },

  computed:{
    ...mapState({
        rankingList: "rankingList"
    }),
    ...mapGetters({
        first: "first",
        second: "second",
        third: "third",
        others: "others",
        mySelf: "mySelf"
    })
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      console.log("fetchData");
      this.$store.dispatch("FETCH_RANKING_LIST", {myJid: "test"}).then(() => {
      });
    }
  }
};
</script>


<style>
.value {
  color: #22c;
}
</style>

