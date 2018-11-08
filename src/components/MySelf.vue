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
export default {
  name: "MySelf",
  data: function() {
    return {
      count: 0,
      rankDes: ""
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
    }
  },
  computed: {
    ...mapGetters({
      myActivity: "activity"
    }),
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
  height: 1.066667rem;
  background-image: linear-gradient(
    -180deg,
    #fc673f 0%,
    #ef3276 50%,
    #c826a8 100%
  );
  font-size: .4rem;
  margin-top:-0.033333rem;
  text-transform: capitalize;
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

</style>
