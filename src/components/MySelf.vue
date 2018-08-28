<template>
    <v-layout fill-height row justify-start  align-center class="mine_root" v-on:click="jumpOther(mySelf['role'])">
      <v-flex xs1>
        <div class="mine_ranking" style="font-size: 10px">{{mySelf.ranking}}</div>
      </v-flex>
      <v-flex xs3>
        <v-avatar color="grey lighten-4">
          <img v-bind:src="`${mySelf.avatarUrl}`">
        </v-avatar>
      </v-flex>

      <v-flex xs7 v-if="myActivity != undefined && myActivity['status'] == 0">
        <div class="mine_des text-xs-left">{{rankDes}}</div>
      </v-flex>
      <v-flex xs4 v-if="myActivity != undefined && myActivity['status'] == 0">
          <v-btn class="mine_btn" round color="red" dark style="textTransform:none">
            <span v-show="mySelf['role']=='user'">{{$t("ActivityPage.bt_help_punching")}}</span>
            <span v-show="mySelf['role']=='anchor'">{{$t("ActivityPage.bt_me_punching")}}</span>
          </v-btn>
      </v-flex>
      <v-flex xs12 text-xs-left v-if="myActivity != undefined && myActivity['status'] == 1">
        <span class="list-item__title">{{mySelf['nickname']}}</span>
      </v-flex>
      <v-flex xs4 class="right item_rank" v-if="myActivity != undefined && myActivity['status'] == 1">{{mySelf['gifts']}}</v-flex>
    </v-layout>
</template>

<script>
  import {jumpOnlineUser, jumpMain, logEvent} from "../common/jsInteractive"
  import {mapGetters} from "vuex";

  export default {
        name: "MySelf",
      data:function () {
         return{
           count:0,
           rankDes:''
         }
      },
    methods:{
      jumpOther:function (role) {
        logEvent("event_activity_page_hittop_click","")
        if (role == "user"){
          jumpMain();
        } else {
          jumpOnlineUser();
        }
      }
    },
    computed:{
      ...mapGetters({
        myActivity: "activity"
      }),
      mySelf:function () {
        var data = this.$store.getters.mySelf;
        var rank = data.ranking;
        var des = "";
        if (rank == '99+') {
          des = this.$t('ActivityPerson.distance_150').replace("@@@", data.distance + 1);
        } else if (rank <= 100) {
          des = this.$t("ActivityPerson.distance_100").replace("@@@", data.distance + 1);
        } else if (rank == '--') {
          des = this.$t("ActivityPerson.distance_else");
        } else if (rank == 1) {
          des = this.$t("ActivityPerson.frist");
        }
        this.rankDes = des;
        return data;
      }
    }
    }
</script>

<style scoped>

  .mine_root{
    width: 100%;
    box-shadow:-0px 5px 15px black;
    background: white;
  }

  .mine_ranking{
    color: rgba(0,0,0,0.20);;
  }

  .mine_des{
    color: rgba(0,0,0,0.60);
  }
  .mine_btn{
    text-transform: capitalize;
  }

</style>
