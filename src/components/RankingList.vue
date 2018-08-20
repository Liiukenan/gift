<template>
    <div class="ranking-list">
        <h1>礼物之星</h1>
        <div>
            <md-list>
                <md-list-item v-for="x of anchorList" :key="x.id">
                <span>{{x.id}}</span>
                <md-avatar>
                    <img v-bind:src="`${x.avatar}`" width="200"/> 
                </md-avatar>
                <span class="md-list-item-text">{{x.name}}</span>
                <span class="value">{{x.value}}</span>
                </md-list-item>
            </md-list>
        </div>
    </div>

</template>

<script>
export default {
  name: "RankingList",
  data: function() {
    return {
      anchorList: [
        {
          id: 0,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        },
        {
          id: 1,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        }
      ]
    };
  },

created () {
    this.anchorList = [
        {
          id: 0,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        },
        {
          id: 1,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        }
      ]
  }
};
</script>


<style>

.value{
	color:#22c;
}

</style>

