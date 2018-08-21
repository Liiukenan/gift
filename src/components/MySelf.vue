<template>
  <div id="my_self" class="mine_root">
    <div class="left">
      <span class="anchor_id">{{mySelf.id}}</span>
      <img class="list-item__thumbnail item_img" v-bind:src="`${mySelf.avatar}`" />
    </div>
    <div class="item_name" >
      <span class="list-item__title">{{mySelf.name}}</span>
    </div>
    <div class="right item_rank">{{mySelf.value}}</div>

  </div>

</template>

<script>
  import {mapGetters} from "vuex";

  export default {
        name: "MySelf",
      data:function () {
         return{
           count:0
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
    height: 7%;
  }

</style>
