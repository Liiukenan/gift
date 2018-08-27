<template>
  <v-container text-xs-center class="top_rank">
    <v-layout v-ripple column justify-end align-center class="top_anchor" @click="personDetail(tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].jid:''):(sendTop != undefined?sendTop[1].jid:''))">
        <v-flex xs10>
          <v-layout column align-center justify-end>
            <img style="width: 35px;z-index: 0" src="../resource/top_second.png"/>
            <img class="second_img" style="margin-top: -10px;"
                 v-bind:src="`${tabIndex == 0 ? (receiverTop != undefined?(receiverTop[1].avatarUrl):'') : (sendTop != undefined?sendTop[1].avatarUrl:'')}`"/>
            <img style="width: 35px;margin-top: -20px" src="../resource/rank_second.png"/>
          </v-layout>
        </v-flex>
        <v-flex>
          <span class="anchor_name">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].nickname:''): (sendTop != undefined?sendTop[1].nickname:'')}}</span>
        </v-flex>
        <v-flex color="top_anchor_gift_color">
          <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].gifts:'') : (sendTop != undefined?sendTop[1].gifts:'')}}</span>
        </v-flex>
    </v-layout>

    <v-layout v-ripple column justify-end align-center class="top_anchor" @click="personDetail(tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].jid:''):(sendTop != undefined?sendTop[1].jid:''))">
      <v-flex xs10>
        <v-layout column align-center>
          <img style="width: 40px;z-index: 0" src="../resource/top_first.png"/>
          <img class="first_img"
               style="margin-top: -10px;"
               v-bind:src="`${tabIndex == 0 ?(receiverTop != undefined?(receiverTop[0].avatarUrl):'') : (sendTop != undefined?sendTop[0].avatarUrl:'')}}`"/>
          <img style="width: 35px;margin-top: -20px" src="../resource/rank_first.png"/>
        </v-layout>
      </v-flex>
      <v-flex >
        <div class="anchor_name" style="display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[0].nickname:''): (sendTop != undefined?sendTop[0].nickname:'')}}</div>
      </v-flex>
      <v-flex>
        <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[0].gifts:'') : (sendTop != undefined?sendTop[0].gifts:'')}}</span>
      </v-flex>
    </v-layout>

    <v-layout v-ripple column justify-end align-center class="top_anchor" @click="personDetail(tabIndex == 0 ?receiverTop[2].jid : sendTop[2].jid)">
      <v-flex xs10 column>
        <v-layout column align-center>
          <img style="width: 30px;z-index: 0" src="../resource/top_third.png"/>
          <img class="third_img" style="margin-top: -10px" 
            v-bind:src="`${tabIndex == 0 ?(receiverTop != undefined?(receiverTop[2].avatarUrl):'') : (sendTop != undefined?sendTop[2].avatarUrl:'')}`"/>
          <img style="width: 35px;margin-top: -20px" src="../resource/rank_third.png"/>
        </v-layout>
      </v-flex>
      <v-flex>
        <span class="anchor_name">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[2].nickname:''): (sendTop != undefined?sendTop[2].nickname:'')}}</span>
      </v-flex>
      <v-flex>
        <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[2].gifts:'') : (sendTop != undefined?sendTop[2].gifts:'')}}</span>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

  import {mapGetters,mapState} from "vuex";
  import {jumpPersonDetail} from "../common/jsInteractive"

  export default {
    name: "TopRank",
    data: function () {
      return {
        test: 0
      }
    },
    props:['tabIndex'],
    methods: {
      personDetail:function (jid) {
        console.log("jid = " + jid);
        jumpPersonDetail(jid);
      }
    },
    computed: {
      ...mapState({
        rankingList: "rankingList"
      }),
      ...mapGetters({
        receiverTop: "receiverTop",
        sendTop: "sendTop"
      })
    }
  }

</script>

<style>

  .top_rank {
    position: relative;
    display: flex;
  }

  .top_anchor {
    flex: 1;
    padding-top: 5%;
  }

  .first_img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border-color: rgba(248, 231, 28, 1) ;
    border-style: outset;
    border-width: 2px;
  }

  .second_img {
    width: 77px;
    height: 77px;
    border-radius: 50%;
    border-color: rgba(198, 198, 198, 1);
    border-style: outset;
    border-width: 2px;
  }

  .third_img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border-color: rgba(177, 106, 10, 1);
    border-style: outset;
    border-width: 2px;
  }

  .rank_gift{
    color: rgba(0, 0, 0, 0.4);
  }

  .anchor_name{
    color: rgba(0, 0, 0, 0.8);
  }

</style>
