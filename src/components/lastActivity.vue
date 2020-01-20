<!-- 上次活动 -->
<template>
  <div class="last-activity bg-white">
    <div class="banner">
      <button class="previous-btn fc-white fs-12 ongoing" @click="now">
          <span>{{$t("newList.ongoing")}}</span>
        </button>
       <img :src="getSrc()" alt="" srcset="">
    </div>
    <rankings :allList="allList"></rankings>
  </div>
</template>

<script>
import rankings from "./Rankings"
import {mapMutations } from "vuex";
import {logEvent} from "../common/jsInteractive"
export default {
  props:['allList'],
  data () {
    return {
    };
  },
  components:{
    rankings
  },
  methods: {
    ...mapMutations([
      "setLastActive"
    ]),
    now(){
      this.setLastActive(false);
    },
    getSrc(){
      return require("../static/img/last_"+window.lang+".jpg")
    }
  },
  mounted(){
    try{
          logEvent("event_previous_ranking_show","");
        }catch(err){
          // console.log(err)
        }
  }
}

</script>
<style lang='stylus' scoped>
  .last-activity{
    position absolute
    width 100%
    min-height 100%
    left 0
    top 0
    z-index 99
    background rgba(195,4,155,1)
    overflow-x:hidden;
    .ongoing{
      background-image: linear-gradient(180deg, #FB8080 0%, #C30C0C 100%);
      word-break break-word
    }
    .banner{
      width 100%
      position relative
      img{
        width 100%
      }
    }
    
  }
</style>