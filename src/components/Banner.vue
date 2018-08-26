<template>
  <div class="banner_root">
    <img class="banner_img" src="../resource/banner_bg.png"/>
    <v-layout column class="banner_content">
      <v-spacer/>
      <v-flex offset-xs9>
        <div class="text-xs-center">
          <v-dialog
            v-model="dialog"
            width="90%"
            height="80%">

            <v-btn
              fab right class="banner_float"
              slot="activator"
              dark>
              {{$t("ActivityPage.bt_regular")}}
            </v-btn>

            <v-card color="white" style="border-radius: 6px;padding: 30px 15px 40px 15px" v-if="showDialog">
              <button v-on:click="onCloseBtn" style="width: 20px; height: 20px; position: absolute; right: 10px; top: 10px">
                <img src="../assets/ic_closed.png" style="width: 20px; height: 20px">
              </button>
              <!-- Title -->
              <div style="text-align: center; width: 100%; margin-top: 10px; font-weight: bold;">
                {{$t("Ranking.dialog.title")}}
              </div>
              <v-spacer/>q

              <!-- first desc -->
              <div style="text-align: left; width: 100%; margin-top: 10px;">
                <p v-html="$t('Ranking.dialog.content1')"></p>
              </div>
              <v-spacer/>

              <div style="text-align: left; width: 100%;margin-top: 10px;">
                <p v-html="$t('Ranking.dialog.content2')"></p>
              </div>
              <v-spacer/>

              <div style="text-align: left; width: 100%; margin-top: 10px;">
                <p v-html="$t('Ranking.dialog.content3')"></p>
              </div>
              <v-spacer/>

              <div style="text-align: left; width: 100%; margin-top: 10px;">
                <p v-html="$t('Ranking.dialog.content4')"></p>
              </div>
              <v-spacer/>

            </v-card>
          </v-dialog>
        </div>

      </v-flex>
      <v-spacer/>
      <v-spacer/>
      <v-flex xs1 class="banner_des">
        <v-btn outline round small color="activity_time_color" class="banner_des_btn" style="margin-left: auto;margin-right: auto">
          {{getActivityDesc(myActivity != null && myActivity.hasOwnProperty("status")?myActivity["status"]:"")}}
        </v-btn>
      </v-flex>
      <v-spacer/>
    </v-layout>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name: "Banner",
     data () {
      return {
        dialog: false,
        showDialog: false
      }
    },
    methods: {
      getActivityDesc:function(status){
        var des = "";
        if (status === 0){
          des = this.$t("ActivityPage.time").replace("@@@",this.myActivity["time"]);
        } else if (status === 1){
          des = this.$t("ActivityPage.activity_finish")
        } else if (status === 2){
          des = ""
        }
        return des
      },
      onCloseBtn(event){
        console.log("close btn clicked")
        this.dialog = false
      }
    },
    created(){
      setTimeout(()=>{
        this.showDialog = true
      },0)
    },
    computed:{
      ...mapGetters({
        myActivity: "activity"
      })
    }
  }
</script>

<style scoped>

  .banner_root {
    width: 100%;
    padding: 0 auto;
    margin: 0 auto;
    position: relative;
  }

  .banner_content {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
  }

  .banner_des {
    bottom: 14%;
  }

  .banner_float {
    right: 0;
    font-size: 10px;
    color: white;
    margin-top: 0px;
    text-transform: Capitalize;
    background-image:  linear-gradient(-180deg, #CA8EFF 0%, #007EE9 100%);
    box-shadow: 0 3px 4px 0;
  }

  .banner_img {
    width: 100%;
  }

  .banner_des_btn {
    font-size: 5px;
    background-image:linear-gradient(90deg, #FFFFFF 0%,#FF6841 50%, #FFFFFF 100%) ;
    text-transform: Capitalize;
  }

</style>
