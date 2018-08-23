<template>
    <div class="ranking-list">
        <div>
          <v-ons-list>
            <v-ons-list-item class="item" v-for="x of others" :key="x.ranking" modifier="longdivider" v-on:click="personDetail(x.jid)">
              <div class="left">
                <span class="anchor_id">{{x.ranking}}</span>
                <img class="list-item__thumbnail item_img" v-bind:src="`${x.avatarUrl}`" />
              </div>
              <div class="item_name" >
                <span class="list-item__title">{{x.nickname}}</span>
              </div>
              <div class="right item_rank">{{x.gifts}}</div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
    </div>

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
      console.log("fetchData");
      this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
      });
    },
    personDetail:function (jid) {
      jumpPersonDetail(jid)
    }
  }
};
</script>

<style>

  .item{
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .anchor_id{
    margin-left: 10px;
    color: rgba(0,0,0,0.40);;
  }

  .item_img{
    width: 50px;
    height: 50px;
    margin-left: 20px;
  }

  .item_name{
    margin-left: 10px;

  }
  .item_rank{
    margin-right: 16px;
    color: rgba(0,0,0,0.40);;
  }

</style>

