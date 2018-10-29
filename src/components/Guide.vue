<!-- 领奖规则 -->
<template>
<transition name="slider" mode="out-in">
    <div class="guideInfo">
        <div class="guideMain">
            <div class="userRules" v-show="rulesShow">
                {{$t("ActivityPage.zbRules")}}
            </div>
            <div class="userRules" v-show="!rulesShow">
                {{$t("ActivityPage.userRules")}}
            </div>
            <div class="guideTable">
            <table v-show="rulesShow" class="zbTable">
                <tr>
                    <th>Number of Pumpkin Sent</th>
                    <th>Prize</th>
                    <th>Value (coins)</th>
                </tr>
                <tr>
                    <td>50</td>
                    <td>Love*1</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>100</td>
                    <td>Rose*1</td>
                    <td>499</td>
                </tr>
                <tr>
                    <td>500</td>
                    <td>Ring*2</td>
                    <td>1998</td>
                </tr>
                <tr>
                    <td>1000</td>
                    <td>Laser ball*1</td>
                    <td>4999</td>
                </tr>
            </table>
            <table v-show="!rulesShow" class="userTable">
                <tr>
                    <th width="50%">Number of Pumpkin Received </th>
                    <th width="50%">Prize</th>
                </tr>
                <tr>
                    <td rowspan="5">10</td>
                    <td>50 Coins</td>
                </tr>
                <tr>
                    <td>100 Coins</td>
                   
                </tr>
                <tr>
                    <td>200 Coins</td>
                    
                </tr>
                <tr>
                    <td>VIP 3 days</td>
                   
                </tr>
                <tr>
                    <td>VIP 7 days</td>
                </tr>
            </table>
        </div>
        </div>
        
    </div>
</transition>
</template>

<script>
import {getCurrentJid} from '../store/ApiHelper'
export default {
  data () {
    return {
        rulesShow:true
    };
  },
  methods:{
      chooseContent(){
      
      // 判断是主播还是用户
      if(getCurrentJid().indexOf('user')==-1){
        //   主播
        this.rulesShow=true;
      }else{
        //   用户
        this.rulesShow=false;
      }
    },
  },
  created(){
      this.chooseContent();
  }
}
</script>
<style>
.slider-enter-active, .slider-leave-active{
    opacity: 1;
    transition: all 0.3s
  }
.slider-enter, .slider-leave-to{
  opacity: 0;
  transform : translate3d(-100%, 0, 0);
}
/* .slide-right-leave-active {
  opacity:0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
} */
.guideInfo{
    font-size: .466667rem;
    color: rgba(0,0,0,0.80);
    padding: 0 .333333rem;
    margin-bottom: 1rem;
    position:absolute;
    left: 0;
    top: 0;
    width: 100%;
}
.guideMain{
    background: rgba(255,255,255,0.70);
    border-radius: .533333rem;
    padding:.733333rem;
    /* word-wrap: break-word; */
    text-align: left;
}
.guideTable{
    margin-top: .5rem;
}
.guideTable table{
    background: rgba(0,0,0,0.07);
    border-radius: 6px;
    text-align: center;
    color: #000;
    border-collapse: collapse;
    
    margin:0 auto;
}
.guideTable td{
    /* font-weight: bold; */
    font-size: .466667rem;
}
.guideTable th{
    font-weight:300;
}
.guideTable td,.guideTable th{
    border: 1px solid rgba(0,0,0,0.1);
    padding:.2rem 0;
}
.userTable{
    width: 70%;
}
.userTable th{
    padding:.3rem .933333rem;
    font-size: .466667rem;
}
.userTable td{
    padding:.166667rem 0;
}
.zbTable th{
    width: 33.3%;
    padding:
}

</style>