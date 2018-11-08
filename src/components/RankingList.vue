<template>
    <v-layout class="ranking-list">
          <v-list style="width: 100%">
            <div v-for="(x, index) in  tab_index == 0 ? receiverData:sendData"
              v-bind:item="x"
              v-bind:index="index"
              v-bind:key="x.id">
              <hr class="item_divider" v-bind:class="{full_divider: index===0 , head_divider:index !== 0}"/>
              <v-layout v-ripple fill-height align-center class="item" @click="listItemClick(x)">
                  <div class="anchor_id">
                    {{x.ranking}}
                  </div>
                  <div class="anchor_head" >
                    <v-list-tile-avatar size="1.5rem" >
                    <img v-lazy="`${x.avatarUrl}`" />
                    </v-list-tile-avatar>
                  </div>
                  <div class="item_name">
                    {{x.nickname}}
                  </div>
                  <v-card-text class="item_rank">
                    <span class="right">
                      {{x.gifts}}
                    </span>
                  </v-card-text>
              </v-layout>
            </div>
          </v-list>
    </v-layout>

</template>

<script>
import { mapGetters, mapState } from "vuex";
import {jumpPersonDetail, logEvent} from "../common/jsInteractive"
export default {
  name: "RankingList",
  data: function() {
    return {
      anchorList: [],
    };
  },
  props:[
    "tab_index"
  ],
  computed:{
    ...mapState({
        rankingList: "rankingList"
    }),
    ...mapGetters({
      receiverData: "receiverData",
      sendData: "sendData"
    })
  },


  methods: {
    listItemClick(anchor){
      jumpPersonDetail(anchor.jid);
    }
  }
};
</script>

<style>

  .item{
    width: 100%;
    height: 1.866667rem;
  }

  .anchor_id{
    margin-left: .4rem;
    min-width: .833333rem;
    font-size: .466667rem;
    color: rgba(0,0,0,0.40);;
  }


  .item_rank{
    margin-right: .333333rem;
    font-size: .333333rem;
    color: rgba(0,0,0,0.40);
    padding:0;
  }
  .item_name{
    text-align: left;
    float: left;
    width: 20rem;
    margin-left: .5rem;
    font-size: .466667rem;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item_divider{
    height:1px;
    border:none;
    border-top:1px solid #f1f1f1;
    margin-right: .333333rem;
  }

  .full_divider{
    margin-left: .333333rem;
  }
  .head_divider{
    margin-left: 2rem;
  }

</style>
