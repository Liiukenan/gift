<template>
  <v-container class="mine_root" v-on:click="jumpOther('user')">
    <v-layout fill-height row justify-start  align-center>
      <v-flex xs3>
        <div class="mine_ranking">{{mySelf.ranking}}</div>
      </v-flex>
      <v-flex xs2>
        <v-avatar color="grey lighten-4">
          <img v-bind:src="`${mySelf.avatarUrl}`">
        </v-avatar>
      </v-flex>
      <v-flex offset-xs1>
        <div class="mine_des text-xs-left">gifts are needed to move up one place </div>
      </v-flex>

      <v-flex>
        <div class="mine_to">
          <v-btn round color="red" dark>To Be Top 1</v-btn>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import {mapGetters} from "vuex";
  import {jumpOnlineUser,jumpMain} from "../common/jsInteractive"

  export default {
        name: "MySelf",
      data:function () {
         return{
           count:0
         }
      },
    methods:{
      jumpOther:function (role) {
        if (role === "user"){
          jumpMain();
        } else {
          jumpOnlineUser();
        }
      }
    },
    computed:{
      ...mapGetters({
        mySelf: "mySelf"
      })
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

  .mine_to{
    color: white;
  }

</style>
