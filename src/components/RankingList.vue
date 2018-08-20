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
const axios = require('axios');

export default {
  name: "RankingList",
  data: function() {
    return {
      anchorList: []
    };
  },

created () {
   axios.get('http://localhost:8445/ranking-list', {
	headers: {'Access-Control-Allow-Origin': '*'}
    }).then((response) => {
        console.log(response);
        this.anchorList = response.data
    }).catch(function (error) {
        console.log(error);
    });
  }
};

</script>


<style>

.value{
	color:#22c;
}

</style>

