<template>
    <v-layout class="ranking-list">
          <v-list style="width: 100%">
            <template v-for="(x, index) in others">
              <v-divider inset></v-divider>
              <v-list-tile ripple avatar class="item" @click="listItemClick(x)" >
                <v-flex xs3 class="anchor_id" >
                  <span >{{x.ranking}}</span>
                </v-flex>
                <v-flex xs5 >
                  <v-list-tile-avatar size="56" style="padding-top: 10px;padding-bottom: 10px">
                    <img v-bind:src="`${x.avatarUrl}`" />
                  </v-list-tile-avatar>
                </v-flex>
                <v-flex xs12 text-xs-left >
                  <span class="list-item__title">{{x.nickname}}</span>
                </v-flex>
                <v-flex xs4 class="right item_rank">{{x.gifts}}
                </v-flex>
              </v-list-tile>
              <v-divider inset v-if="index + 1 === others.length" :key="`divider-${index}`"></v-divider>
            </template>
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
  }

  .anchor_id{
    color: rgba(0,0,0,0.40);;
  }

  .item_rank{
    color: rgba(0,0,0,0.40);;
  }

</style>

