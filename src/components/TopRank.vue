<template>
  <v-layout style="display:flex">
      <v-layout style="flex:1" v-ripple column justify-end align-center @click="personDetail(tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].jid:''):(sendTop != undefined?sendTop[1].jid:''))">
            <v-layout column align-center class="second_layout">
              <img class="anchor_crown" src="../resource/top_second.png"/>
              <img v-bind:class="{second_img:isLarge,small_second_img:!isLarge}"
                   v-bind:src="`${tabIndex == 0 ? (receiverTop != undefined?(receiverTop[1].avatarUrl):'') : (sendTop != undefined?sendTop[1].avatarUrl:'')}`"/>
              <img  class="anchor_rank_img" src="../resource/rank_second.png"/>
            </v-layout>
          <v-layout>
            <span class="anchor_name" v-bind:style="{width:nameSize+'px'}">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].nickname:''): (sendTop != undefined?sendTop[1].nickname:'')}}</span>
          </v-layout>
          <v-layout color="top_anchor_gift_color">
            <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[1].gifts:'') : (sendTop != undefined?sendTop[1].gifts:'')}}</span>
          </v-layout>
      </v-layout>

    <v-layout style="flex:1;" v-ripple column align-center @click="personDetail(tabIndex == 0 ?(receiverTop != undefined?receiverTop[0].jid:''):(sendTop != undefined?sendTop[0].jid:''))">
        <v-layout column align-center>
          <img class="anchor_crown" src="../resource/top_first.png"/>
          <img v-bind:class="{first_img:isLarge,small_first_img:!isLarge}"
               v-bind:src="`${tabIndex == 0 ?(receiverTop != undefined?(receiverTop[0].avatarUrl):'') : (sendTop != undefined?sendTop[0].avatarUrl:'')}`"/>
          <img  class="anchor_rank_img" src="../resource/rank_first.png"/>
        </v-layout>
      <v-layout>
        <div class="anchor_name" v-bind:style="{width:nameSize+'px'}">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[0].nickname:''): (sendTop != undefined?sendTop[0].nickname:'')}}</div>
      </v-layout>
      <v-layout>
        <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[0].gifts:'') : (sendTop != undefined?sendTop[0].gifts:'')}}</span>
      </v-layout>
    </v-layout>

    <v-layout  style="flex:1" v-ripple column justify-end align-center @click="personDetail(tabIndex == 0 ?receiverTop[2].jid : sendTop[2].jid)">
        <v-layout column align-center class="third_layout">
          <img class="anchor_crown" src="../resource/top_third.png"/>
          <img v-bind:class="{third_img:isLarge,small_third_img:!isLarge}"
            v-bind:src="`${tabIndex == 0 ?(receiverTop != undefined?(receiverTop[2].avatarUrl):'') : (sendTop != undefined?sendTop[2].avatarUrl:'')}`"/>
          <img class="anchor_rank_img" src="../resource/rank_third.png"/>
        </v-layout>
      <v-layout>
        <span class="anchor_name" v-bind:style="{width:nameSize+'px'}">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[2].nickname:''): (sendTop != undefined?sendTop[2].nickname:'')}}</span>
      </v-layout>
      <v-layout>
        <span class="rank_gift">{{tabIndex == 0 ?(receiverTop != undefined?receiverTop[2].gifts:'') : (sendTop != undefined?sendTop[2].gifts:'')}}</span>
      </v-layout>
    </v-layout>
  </v-layout>

</template>

<script>

  import {mapGetters,mapState} from "vuex";
  import {jumpPersonDetail} from "../common/jsInteractive"

  export default {
    name: "TopRank",
    data: function () {
      return {
        nameSize:0
      }
    },
    props:['tabIndex','isLarge'],
    methods: {
      personDetail:function (jid) {
        console.log("jid = " + jid);
        jumpPersonDetail(jid);
      },
      loadError:function (source) {
        // alert(source.src);
        source.target.src = "../resource/default_head.png";
        source.target.onerror = "";
        console.log('img load error ' );
        return true;
      }
    },
    created(){
      var screenWidth = window.screen.width;
      this.nameSize = (screenWidth * 0.75) / 3;
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

  .first_img {
    margin-top: -0.333333rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: thick solid rgba(248, 231, 28, 1);
    border-width: .066667rem;
  }

  .small_first_img {
    margin-top: -0.333333rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: thick solid rgba(248, 231, 28, 1);
    border-width: .066667rem;
  }

  .second_img {
    margin-top: -.333333rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: thick solid rgba(198, 198, 198, 1);
    border-width: .066667rem;
  }
  .small_second_img{
    margin-top: -.333333rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    border: thick solid rgba(198, 198, 198, 1);
    border-width: .066667rem;
  }

  .third_img {
    margin-top: -0.333333rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: thick solid rgba(177, 106, 10, 1);
    border-width: .066667rem;
  }

  .small_third_img {
    margin-top: -10px;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    border: thick solid rgba(177, 106, 10, 1);
    border-width: .066667rem;
  }

  .second_layout{
    margin-top: .433333rem;
  }
  .third_layout{
    margin-top: .433333rem;
  }

  .rank_gift{
    font-size: .333333rem;
    color: rgba(0, 0, 0, 0.4);
  }

  .anchor_name{
    font-size: .466667rem;
    color: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    display: block;
  }

  .anchor_crown{
      height: .666667rem;
      z-index: 0
  }

  .anchor_rank_img{
    width: .666667rem;
    margin-top: -0.4rem;
  }

</style>
