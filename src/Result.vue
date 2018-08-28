<template>
<v-app light class="scroll-y result_root">

    <v-layout class="result_content" column>

        <v-card class="result_card">

            <div class="title">
                <img class="title_bg" src="./resource/receiver_bg.png">
                <span class="receiver_title">
                    Receiving Gifts
                </span>
            </div>

            <top-rank tabIndex="0"/>

            <div class="title">
                <img class="title_bg" src="./resource/send_bg.png">
                <span class="send_title">
                    Send Gifts
                </span>
            </div>

            <top-rank tabIndex="1"/>

            <v-btn align-center round dark class="result_btn">Enter</v-btn>

        </v-card>

        <div class="result_top">
            <img src="./resource/pop_bg.png" style="width:100%"/>
        </div>

    </v-layout>

</v-app>
</template>

<script>
    import TopRank from './components/TopRank';
    export default {
      name:'Result',
      components: {
        TopRank
      },
      created() {
        this.fetchData()
      },
      methods:{
        fetchData() {
          // this.$i18n.locale = "en"; // 切换语言
          console.log("fetchData");
          this.$store.dispatch("FETCH_RANKING_LIST", {myJid: window.jid}).then(() => {
          });
        }
      }
    }
</script>

<style>
.result_root{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.result_content{
    position:relative;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-left: 10%;
    margin-right: 10%;
}
.title_bg{
    margin-left:20px;
    margin-right:20px;
    width : 280px;
}
.receiver_title{
    position:absolute;
    margin:0 auto;
    top:10px;
    left:0;
    right:0;
    text-align:center;
    font-size:15px;
}
.send_title{
    position:absolute;
    margin:0 auto;
    top:10px;
    left:0;
    right:0;
    text-align:center;
    font-size:15px;
    display:block;
}
.title{
    position:relative;
    color: white;
    width: 100%;
    height:40px;
}
.result_btn{
    background-image:  linear-gradient(-180deg, #FC673F 0%,#EF3276 50%, #C826A8 100%);
    min-width:250px;
}
.result_card{
    margin:auto;
    position:absolute;
    left:0;
    right:0;
    padding-top:20px;
    top:100px;
    border-bottom-left-radius:15px;
    border-bottom-right-radius:15px;
}
.result_top{
    z-index:1;
}
</style>

