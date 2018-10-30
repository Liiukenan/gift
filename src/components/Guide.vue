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
                    <th>{{$t("ActivityPage.numberPum")}}</th>
                    <th>{{$t("ActivityPage.prize")}}</th>
                    <th>{{$t("ActivityPage.value")}}</th>
                </tr>
                <tr>
                    <td>50</td>
                    <td><img src="../static/img/Halloween/love.png" alt="" class="small-icon">*1</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>100</td>
                    <td><img src="../static/img/Halloween/rose.png" alt="" class="small-icon">*1</td>
                    <td>499</td>
                </tr>
                <tr>
                    <td>500</td>
                    <td><img src="../static/img/Halloween/ring.png" alt="" class="small-icon">*1</td>
                    <td>1998</td>
                </tr>
                <tr>
                    <td>1000</td>
                    <td><img src="../static/img/Halloween/laser_ball.png" alt="" class="small-icon">*1</td>
                    <td>4999</td>
                </tr>
            </table>
            <table v-show="!rulesShow" class="userTable">
                <tr>
                    <th width="50%">{{$t("ActivityPage.usernumberPum")}}</th>
                    <th width="50%">{{$t("ActivityPage.prize")}}</th>
                </tr>
                <tr>
                    <td rowspan="5">10</td>
                    <td>
                        <span v-if="trang">50 {{$t("ActivityPage.conis")}}</span> 
                        <span v-if="!trang"> {{$t("ActivityPage.conis")}} 50</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span v-if="trang">100 {{$t("ActivityPage.conis")}}</span>
                        <span v-if="!trang">{{$t("ActivityPage.conis")}} 100</span>

                    </td>
                </tr>
                <tr>
                    <td>
                        <span v-if="trang">200 {{$t("ActivityPage.conis")}}</span>
                        <span v-if="!trang">{{$t("ActivityPage.conis")}} 200</span>
                    </td>
                    
                </tr>
                <tr>
                    <td>{{$t("ActivityPage.vip1")}}</td>
                   
                </tr>
                <tr>
                    <td>{{$t("ActivityPage.vip2")}}</td>
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
        rulesShow:true,
        trang:true
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
      if(window.lang == "ar"){
          this.trang=true;
      }else{
          this.trang=false;
      }
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
.small-icon{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: top;
    margin-top: .066667rem;
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