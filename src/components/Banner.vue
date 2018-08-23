<template>
  <div class="banner_root">
    <img class="banner_img" src="../resource/banner_bg.png"/>
    <v-layout class="banner_content">
      <v-flex xs3 offset-xs9>
        <div class="text-xs-center">
          <v-dialog
            v-model="dialog"
            width="600">
            <v-btn
              fab color="pink" right class="banner_float"
              slot="activator"
              dark>
              Details
            </v-btn>

            <v-card color="white">
              <v-card-title
                class="headline grey lighten-2"
                primary-title>
                Privacy Policy
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

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
    name: "Banner",
     data () {
      return {
        dialog: false
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
    color: white;
    font-size: 10px;
    margin-top: 15px;
    text-transform: Capitalize;
  }

  .banner_img {
    width: 100%;
  }

  .banner_des_btn {
    font-size: 5px;
    color: rgba(248, 240, 250, 0.80);
    color: white;
    text-transform: Capitalize;
  }

</style>
