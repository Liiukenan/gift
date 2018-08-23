<template>
    <div class="banner_root">
      <img class="banner_img" src="../resource/banner_bg.png"/>
      <v-layout class="banner_content">
        <v-flex xs3 offset-xs9>
          <v-btn fab color="pink" right class="banner_float">
            Details
          </v-btn>
        </v-flex>
        <v-flex xs8 offset-xs3 class="banner_des">
          <v-btn outline round disabled small class="banner_des_btn">
            Activity time:2018.3.3 - 20184.3
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>

  .banner_root{
    width: 100%;
    padding: 0 auto;
    margin: 0 auto;
    position: relative;
  }
  .banner_content{
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
  }
  .banner_des{
    position: absolute;
    bottom: 14%;
  }

  .banner_float{
    right: 0;
    color: white;
    font-size: 10px;
    text-transform: Capitalize;
  }

  .banner_img{
    width: 100%;
  }

  .banner_des_btn{
    font-size: 5px;
    color: rgba(248,240,250,0.80);
    color: white;
    text-transform: Capitalize;
  }

</style>
