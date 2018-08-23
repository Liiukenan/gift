<template>
  <div class="top_rank">

    <div class="top_anchor">
      <div class="head_root">
        <div class="head_border">
          <div class="anchor_head" v-on:click="personDetail(secondAnchor.jid)">
            <img style="width: 35%" src="../resource/top_second.png"/>
            <div class="second_img_wrap" style="margin-top: -10%">
              <div class="img_box">
                <img class="list-item__thumbnail img_content" v-bind:src="`${secondAnchor.avatarUrl}`"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="anchor_name second_anchor">
        <span class="name">{{secondAnchor.nickname}}</span>
      </div>
      <div class="anchor_rank">
        <span class="value">{{secondAnchor.gifts}}</span>
      </div>
    </div>

    <div class="top_anchor">
      <div class="head_root">
        <div class="head_border">
          <div class="anchor_head" v-on:click="personDetail(firstAnchor.jid)">
            <img style="width: 40%" src="../resource/top_first.png"/>
            <div class="first_img_wrap" style="margin-top: -10%">
              <div class="img_box">
                <img class="list-item__thumbnail img_content" v-bind:src="`${firstAnchor.avatarUrl}`"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="anchor_name first_name">
        <span class="name">{{firstAnchor.nickname}}</span>
      </div>
      <div class="anchor_rank">
        <span class="value">{{firstAnchor.gifts}}</span>
      </div>
    </div>

    <div class="top_anchor">
      <div class="head_root">
        <div class="head_borde">
          <div class="anchor_head" v-on:click="personDetail(thirdAnchor.jid)">
            <img style="width: 30%" src="../resource/top_third.png"/>
            <div class="third_img_wrap" style="margin-top: -10%">
              <div class="img_box">
                <img class="list-item__thumbnail img_content" v-bind:src="`${thirdAnchor.avatarUrl}`"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="anchor_name">
        <span class="name">{{thirdAnchor.nickname}}</span>
      </div>
      <div class="anchor_rank">
        <span class="value">{{thirdAnchor.ranking}}</span>
      </div>
    </div>

  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import {jumpPersonDetail} from "../common/jsInteractive"

  export default {
    name: "TopRank",
    data: function () {
      return {
        test: 0
      }
    },
    methods: {
      personDetail:function (jid) {
        jumpPersonDetail(jid)
      }
    },
    computed: {
      ...mapGetters({
        firstAnchor: "first",
        secondAnchor: "second",
        thirdAnchor: "third"
      })
    }
  }

</script>

<style>

  .top_rank {
    position: relative;
    display: flex;
  }

  .top_anchor {
    flex: 1;
    padding-top: 5%;
    padding-bottom: 5%;
  }

  .head_root {
    width: 80%;
    height: 75%;
    position: relative;
    margin: 0 auto;
  }

  .head_border {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .anchor_head {
    width: 100%;
    margin: 0 auto;
  }

  .first_img_wrap {
    width: 90%;
    border-radius: 50%;
    margin: 0 auto;
    border-color: rgba(248, 231, 28, 1);
    border-style: outset;
    border-width: 2px;
  }

  .second_img_wrap {
    width: 80%;
    margin: 0 auto;
    border-radius: 50%;
    border-color: rgba(198, 198, 198, 1);
    border-style: outset;
    border-width: 2px;
  }

  .third_img_wrap {
    width: 70%;
    margin: 0 auto;
    border-radius: 50%;
    border-color: rgba(177, 106, 10, 1);
    border-style: outset;
    border-width: 2px;
  }

  .img_box {
    width: 100%;
    height: 0px;
    margin: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
  }

  .img_content {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .list-item__thumbnail {
    border-radius: 50%;
    margin: auto;
  }

  .anchor_name {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.8);
  }

  .anchor_rank {
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.4);
  }

</style>
