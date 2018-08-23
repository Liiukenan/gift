<template>
  <div class="banner_root">
    <img class="banner_img" src="../resource/banner_bg.png"/>
    <v-layout class="banner_content">
      <v-flex xs3 offset-xs9>
        <div class="text-xs-center">
          <v-dialog
            v-model="dialog"
            width="90%"
            height="80%">

            <v-btn
              fab right class="banner_float"
              slot="activator"
              dark>
              Details
            </v-btn>

            <v-card color="white" style="border-radius: 6px;padding: 30px 15px 40px 15px">
              <v-btn flat icon color="pink" style="position: absolute; right: 1%;">
                <v-icon></v-icon>
              </v-btn>
              <div style="text-align: center;">
                RULE DESCRIPTION
              </div>
              <spacer/>
              <div>
                Activity Time:
              </div>
              <spacer/>
              <div>
                Activity Result:
              </div>

            </v-card>
          </v-dialog>
        </div>

      </v-flex>
      <v-flex xs8 offset-xs3 class="banner_des">
        <v-btn outline round small color="activity_time_color" class="banner_des_btn">
          Activity time:2018.3.3 - 20184.3
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Banner",
     data () {
      return {
        dialog: true
      }
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
    position: absolute;
    bottom: 14%;
  }

  .banner_float {
    right: 0;
    font-size: 12px;
    color: white;
    margin-top: 8px;
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
