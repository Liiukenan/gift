<template>
    <v-layout class="ranking-list">
          <v-list style="width: 100%">
            <v-list-tile avatar class="item" v-for="x of others" :key="x.ranking" @click="listItemClick(x)" >
              <v-flex xs3 class="anchor_id" >
                <span >{{x.ranking}}</span>
              </v-flex>
              <v-flex xs5 >
                <v-list-tile-avatar size="56">
                  <img v-bind:src="`${x.avatarUrl}`" />
                </v-list-tile-avatar>
              </v-flex>
              <v-flex xs12 text-xs-left class="item_name" >
                <span class="list-item__title">{{x.nickname}}</span>
              </v-flex>
              <v-flex xs4 class="right item_rank">{{x.gifts}}
              </v-flex>
            </v-list-tile>
          </v-list>
    </v-layout>

</template>

<script>
import { mapGetters, mapState } from "vuex";
import {jumpPersonDetail} from "../common/jsInteractive"

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
        others: "others"
    })
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.$i18n.locale = "en"; // 切换语言
      console.log("fetchData");
      this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
      });
    },
    listItemClick(anchor){
      jumpPersonDetail(anchor.jid);
    }
  }
};
</script>

<style>

  .item{
    width: 100%;
    height: 90px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .anchor_id{
    color: rgba(0,0,0,0.40);;
  }

  .item_name{
  }
  .item_rank{
    color: rgba(0,0,0,0.40);;
  }

</style>

