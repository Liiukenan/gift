<!-- 用户端 -->
<template>
<div class="user-box">
        <div class="user-gift">
            <div class="user-point">
                <img src="../resource/pumpkeen_un @3x.png" alt="" v-if="myGiftShow">
                <img src="../resource/Pumpkeen_small@3x.png" alt=""  v-if="!myGiftShow">
            </div>
            <div class="send">
                <div v-if="myGiftShow">你已送出南瓜礼物 {{userGiftData.gift_rate_score}}/{{userGiftData.gift_rate_require}}</div>
                <div v-if="myGiftShow" class="progress">  
                    <span class="bar" :style="{width: userGiftData.gift_rate_score/userGiftData.gift_rate_require*100+'%' }"></span>  
                </div>
                <button v-if="!myGiftShow" @click="receive">Receive</button>
            </div>
        </div>
        <div class="sendInfo">
            Guide to use Guide to useGuide to useGuide to use Guide to useGuide to use
        </div>
    <dialog-model :is-show="isShow" @cancelDialog="cancelDialog">
      <gift-content @comfrimGet="comfrimGet" :gift-data="giftData"/>
    </dialog-model/>
    </div>
    
</template>
<script>
import DialogModel from './Dialog'
import GiftContent from './GiftContent'
import { mapActions,mapState} from "vuex";
export default {
  data () {
    return {
        isShow:false,
        giftData:{}
    }
  },
  components:{
      DialogModel,
      GiftContent
  },
  methods:{
      ...mapActions({
        userGift: "FETCH_USER_GIFT",
        myGift :"FETCH_USER_LUCK_DRAW"
    }),
    receive(){
        this.myGift(window.jid).then(res=>{
            if(res){
                this.userGift(window.jid);
                this.isShow=true;
                this.giftData = {}
                setTimeout(() => {
                    this.giftData = res
                })
            }
        })
    },
    cancelDialog() {
        this.isShow = false
    },
    comfrimGet() {
        this.isShow = false
      }
  },
  computed:{
    ...mapState({
        userGiftData:"userGiftRate"
    }),
    myGiftShow(){
        if(this.userGiftData.gift_rate_score>=this.userGiftData.gift_rate_require || this.userGiftData.bonus>0){
          return false;
      }else{
          return true;
      }
    }
  },
  created(){
      
      this.userGift(window.jid);
  }
}
</script>
<style>
    .user-box{
        width: 7.633333rem;
        margin: 0 auto;
        font-size: .333333rem;
    }
    .user-gift{
        overflow: hidden;
    }
    .user-point,.user-point img{
        width: 1.866667rem;
        height: 1.866667rem;
        float: left;
    }
    .user-box .sendInfo{
        color: rgba(47,195,197,0.70);
        margin-top: .4rem;
    }
    .user-gift .send{
        float: left;
        width: 5.5rem;
        text-align: center;
        margin-left: .266667rem;
        overflow: hidden;
        padding-top: .333333rem;
         color: #FF4F18;
        
    }
    .user-gift .send button{
        color: #fff;
        width: 4.6rem;
        height: .933333rem;
        background-image: linear-gradient(0deg, #C826A8 0%, #EF3276 52%, #FC673F 100%); 
        font-size: .466667rem;
        border-radius: .633333rem;
        margin-top: .333333rem;
        outline: none;
    }
    .user-gift .progress {  
     
      overflow: hidden;  
      height: .4rem;  
      width: 100%;
      background: rgba(255,255,255,0.10);
      border-radius: .4rem;
      margin-top: .166667rem;
    }  
    .user-gift .progress .bar {  
      height: 100%;  
      color: #ffffff;  
      float: left;  
      text-align: center;  
      align-items: center;  
      display: flex;  
      justify-content: center;  
      background-image: -moz-linear-gradient(-90deg, #C826A8 0%, #FC673F 100%);  
      background-image: -webkit-gradient(-90deg, #C826A8 0%, #FC673F 100%);  
      background-image: -webkit-linear-gradient(-90deg, #C826A8 0%, #FC673F 100%);  
      background-image: -o-linear-gradient(-90deg, #C826A8 0%, #FC673F 100%);  
      background-image: linear-gradient(-90deg, #C826A8 0%, #FC673F 100%);
      -webkit-transition: width 0.6s ease;  
      -moz-transition: width 0.6s ease;  
      -o-transition: width 0.6s ease;  
      transition: width 0.6s ease;  
    }  

</style>