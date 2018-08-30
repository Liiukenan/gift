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
                    <v-list-tile-avatar size="48px" >
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
    height: 56px;
  }

  .anchor_id{
    margin-left: 12px;
    min-width: 25px;
    font-size: 14px;
    color: rgba(0,0,0,0.40);;
  }
  .anchor_head{
    margin-left: 15px;
  }

  .item_rank{
    margin-right: 10px;
    font-size: 10px;
    color: rgba(0,0,0,0.40);;
  }
  .item_name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    float: left;
    min-width: 160px;
    margin-left: 15px;
    font-size: 14px;
  }

  .item_divider{
    height:1px;
    border:none;
    border-top:1px solid #f1f1f1;
    margin-right: 10px
  }

  .full_divider{
    margin-left: 10px;
  }
  .head_divider{
    margin-left: 60px;
  }

</style>

