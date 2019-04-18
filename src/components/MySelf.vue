<template>
    <v-layout v-if="$store.getters.mySelf" fill-height row justify-start  align-center class="mine_root" v-on:click="jumpOther(mySelf['role'])">
      <v-flex xs1>
        <div class="mine_ranking">{{mySelf.ranking}}</div>
      </v-flex>
      <v-flex xs3>
        <v-layout>
         <img class="mine_head" v-bind:src="`${mySelf.avatarUrl}`"/>
        </v-layout>
      </v-flex>
      <v-flex xs6 v-if="myActivity != undefined && myActivity['status'] == 0">
        <div class="mine_des text-xs-left">{{rankDes}}</div>
      </v-flex>
      <v-flex xs7 text-xs-left v-if="myActivity != undefined && myActivity['status'] == 1">
        <div class="list-item__title mine_nickname" >{{mySelf['nickname']}}</div>
      </v-flex>
       <v-flex xs5 v-if="myActivity != undefined && myActivity['status'] == 0">
          <v-btn class="mine_btn" round dark style="textTransform:none">
            <span v-show="mySelf['role']=='user'" >{{$t("ActivityPage.bt_help_punching")}}</span>
            <span v-show="mySelf['role']=='anchor'">{{$t("ActivityPage.bt_me_punching")}}</span>
          </v-btn>
      </v-flex>
      <v-flex xs4 class="right item_rank"  v-if="myActivity != undefined && myActivity['status'] == 1">{{mySelf['gifts']}}</v-flex>
      <v-spacer/>

    </v-layout>
</template>
<script>
import { jumpOnlineUser, jumpMain, logEvent } from "../common/jsInteractive";
import { mapGetters } from "vuex";
import {getCurrentJid} from '../store/ApiHelper'
export default {
  name: "MySelf",
  data: function() {
    return {
      count: 0,
      rankDes: "",
      anchor_btn: [
        require("../static/img/btn_hit_the_top/btn_hit_the_top_ar.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_de.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_en.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_es.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_fr.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_hi.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_in.png"),
        require("../static/img/btn_hit_the_top/btn_hit_the_top_tr.png"),
      ],
      user_btn:[
        require("../static/img/btn_help_my_girl/btn_help_my_girl_ar.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_de.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_en.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_es.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_fr.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_hi.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_in.png"),
        require("../static/img/btn_help_my_girl/btn_help_my_girl_tr.png"),
      ],
    };
  },
  methods: {
    jumpOther: function(role) {
      logEvent("event_activity_page_hittop_click", "");
      if (role == "user") {
        jumpMain();
      } else {
        jumpOnlineUser();
      }
    },
    getBtnBg: function() {
      var path;
      if(this.userShow){
        switch(window.lang){
          case 'ar':
          path = this.user_btn[0];
          break;
          case 'de':
          path = this.user_btn[1];
          break;
          case 'en':
          path = this.user_btn[2];
          break;
          case 'es':
          path = this.user_btn[3];
          break;
          case 'fr':
          path = this.user_btn[4];
          break;
          case 'hi':
          path = this.user_btn[5];
          break;
          case 'in':
          path = this.user_btn[6];
          break;
          case 'tr':
          path = this.user_btn[7];
          break;
        }
      }else{
        switch(window.lang){
          case 'ar':
          path = this.anchor_btn[0];
          break;
          case 'de':
          path = this.anchor_btn[1];
          break;
          case 'en':
          path = this.anchor_btn[2];
          break;
          case 'es':
          path = this.anchor_btn[3];
          break;
          case 'fr':
          path = this.anchor_btn[4];
          break;
          case 'hi':
          path = this.anchor_btn[5];
          break;
          case 'in':
          path = this.anchor_btn[6];
          break;
          case 'tr':
          path = this.anchor_btn[7];
          break;
        }
      }
      return path;
      
    }
  },
  computed: {
    ...mapGetters({
      myActivity: "activity"
    }),
    userShow(){
      // 判断是主播还是用户
      if(getCurrentJid().indexOf('user')==-1){
        //   主播
        return false;
      }else{
        //   用户
        return true;
      }
    },
    mySelf: function() {
      var data = this.$store.getters.mySelf;
      var rank = data.ranking;
      var dist = data.distance;
      var des = "";
      
      if (rank == "99+") {
        des = this.$t("ActivityPerson.distance_150").replace(
          "@@@",
          data.distance + 1
        );
        if (dist == 0) {
          des = this.$t("ActivityPerson.distance_150_1").replace(
            "@@@",
            data.distance + 1
          );
        }
      } else if (rank == "1") {
        des = this.$t("ActivityPerson.frist");
      } else if (rank <= 100) {
        
        des = this.$t("ActivityPerson.distance_100").replace(
          "@@@",
          data.distance + 1
        );
        if (dist == 0) {
          des = this.$t("ActivityPerson.distance_100_1").replace(
            "@@@",
            data.distance + 1
          );
        }
      } else if (rank == "--") {
        des = this.$t("ActivityPerson.distance_else");
      }
      this.rankDes = des;
      return data;
    }
  }
};
</script>

<style scoped>
.mine_root {
  width: 100%;
  box-shadow: -0 .166667rem .5rem black;
  background: white;
}

.mine_ranking {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.2);
}

.mine_des {
  font-size: 10px;
  color: rgba(0, 0, 0, 0.6);
}
.mine_btn {
  /* width: 2.222222rem; */
  height: 1rem;
  /* margin-right:28px; */
  margin:0px;
  background-image: linear-gradient(-180deg, #FFC900 0%, #FFDB00 40%, #EE920D 100%);
  box-shadow: 0 1px 4px 0 rgba(120,14,75,0.60);
  border-radius: 18px;
  border:1px solid rgba(115,7,83,1);
  
}
.mine_btn span{
  color: rgba(179,23,133,1);
  text-shadow: 0 1px 1px rgba(255,255,255,0.78);
  font-weight: bold;

}
.mine_head {
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
}
.item_rank {
  font-size: .4rem
}
.mine_nickname {
  font-size: .4rem;
}
.flex.xs5{
  max-width: 46%;
}
</style>
