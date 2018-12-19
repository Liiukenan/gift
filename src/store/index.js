import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';
import {loadError} from "../common/jsInteractive";
import {requestApiUrl,getCurrentJid,buildUserGiftTestData,buildUserLuckDrawTestData,buildAnchorGiftTestData,buildAnchorLuckDrawTestData} from './ApiHelper'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const isDev = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: {
        rankingList: {},
        hasRewardResult:{},
        userGiftRate:{},
        anchorGiftRate:{},
        activityId:-1
    },
    getters: {
        receiverTop:state => {
          if (state.rankingList.hasOwnProperty("receiveGifts") && state.rankingList["receiveGifts"].length >=3) {
            return [state.rankingList["receiveGifts"][0],state.rankingList["receiveGifts"][1],state.rankingList["receiveGifts"][2]];
          } else {
            return undefined
          }
        },
        sendTop:state => {
          if (state.rankingList.hasOwnProperty("sendGifts") && state.rankingList["sendGifts"].length >=3) {
            return [state.rankingList["sendGifts"][0],state.rankingList["sendGifts"][1],state.rankingList["sendGifts"][2]];
          } else {
            return undefined
          }
        },
        receiverData: state => {
          if (state.rankingList.hasOwnProperty("receiveGifts")) {
            var others = state.rankingList["receiveGifts"];
            return  others.slice(3)
          } else {
            return undefined
          }
        },
        sendData: state => {
          if (state.rankingList.hasOwnProperty("sendGifts")) {
            var others = state.rankingList["sendGifts"];
            return  others.slice(3)
          } else {
            return undefined
          }
        },
        mySelf: state => {
          if (state.rankingList.hasOwnProperty("profile")){
            console.log("myprofile" + state.rankingList["profile"])
            return state.rankingList["profile"];
          } else {
            console.log("no profile")
            return undefined
          }
        },
        // activity:status 0：活动统计期（开启）; 1:活动结算; 2: 已下架
        activity: state => {
          if (state.rankingList.hasOwnProperty("activity")){
            return state.rankingList['activity'];
          } else {
            return undefined
          }
        },
    },
    actions: {
        FETCH_USER_GIFT(context,options){
          console.log('request user gift options : ', options)
          var currentJid = getCurrentJid()
          var api = requestApiUrl('/ranking_activity/user_gift_rate')
          var timestamp = (new Date()).valueOf();
          var activityId = context.state.activityId
          return Vue.axios.get(api,{params:{"jid":currentJid,'activity_id':activityId,'_t':timestamp}}).then((response) => {
            console.log("user gift response", response.data)
            context.commit("loadUserGiftRate", {result: response.data})
          }).catch(reason => {
            console.log("user gift error :",reason);
            let HOST = process.env.HOST;
            var data = {}
            if (HOST === 'dev' || HOST === 'prod'){
                  data = buildUserGiftTestData()
            }
            context.commit("loadUserGiftRate", {result: data})
          })
        },
        FETCH_USER_LUCK_DRAW(context,options){
          console.log('request user luck draw options : ', options)
          var currentJid = getCurrentJid()
          var api = requestApiUrl('/ranking_activity/user_get_gift')
          var timestamp = (new Date()).valueOf();
          var activityId = context.state.activityId
          return Vue.axios.get(api, {params:{"jid":currentJid,'activity_id':activityId,'_t':timestamp}}).then((response) => {
            console.log("user luck draw  response", response.data)
            return response.data 
          }).catch(reason => {
            console.log("user luck draw error :",reason);
            let HOST = process.env.HOST;
            var data = {}
            if (HOST === 'dev' || HOST === 'prod'){
                  data = buildUserLuckDrawTestData()
            }
            return data
          })
        },
        FETCH_ANCHOR_GIFT(context,options){
          console.log('request anchor gift options : ', options)
          
          var currentJid = getCurrentJid()
          var api = requestApiUrl('/ranking_activity/anchor_gift_rate')
          var timestamp = (new Date()).valueOf();
          var activityId = context.state.activityId
          return Vue.axios.get(api, {params:{"jid":currentJid,'activity_id':activityId,'_t':timestamp}}).then((response) => {
            console.log("anchor gift response", response.data)
            var data = response.data
            context.commit("loadanchorGiftRate", {result: data})
            return data
          }).catch(reason => {
            console.log("user gift error :",reason);
            let HOST = process.env.HOST;
            var data = {}
            if (HOST === 'dev' || HOST === 'prod'){
                  data = buildAnchorGiftTestData()
            }
            context.commit("loadanchorGiftRate", {result: data})
            return data
          })
        },
        FETCH_ANCHOR_LUCK_DRAW(context,options){
          console.log('request anchor luck draw options : ', options)
          var currentJid = getCurrentJid()
          var api = requestApiUrl('/ranking_activity/anchor_get_gift')
          var timestamp = (new Date()).valueOf();
          var giftId = options.giftId
          var activityId = context.state.activityId
          
          return Vue.axios.get(api, {params:{"jid":currentJid,'activity_id':activityId,'_t':timestamp,'gift_id':giftId}}).then((response) => {
            console.log("anchor luck draw  response", response.data)
            return response.data
          }).catch(reason => {
            console.log("anchor luck draw error :",reason);
            let HOST = process.env.HOST;
            var data = {}
            if (HOST === 'dev' || HOST === 'prod'){
                  data = buildAnchorLuckDrawTestData()
            }
            return data
          })
        },
        FETCH_HAS_REWARD(context,options){
          var currentJid = getCurrentJid();
          var api = requestApiUrl('/ranking_activity/has_reward');
          let activity=parseInt(localStorage.getItem('activity_id'));
          console.log(currentJid,'xuesong')

          return Vue.axios.post(api, qs.stringify({"jid":currentJid,"activity_id":activity})).then((response) => {
              var data = {}
              if(response.data == undefined || response.data == ""){
                data = {status:0}
              }else{
                data.status = response.data.status
                data.giftUrl = response.data.gift_url
                data.userType = response.data.user_type
                data.giftId = response.data.gift_id
                data.giftNum = response.data.gift_num
                data.jid = response.data.jid
                data.rank = response.data.rank
                data.rewardNum = response.data.reward_num
                data.rewardType = response.data.reward_type
                data.inviteTimes = response.data.invite_times
                data.inviteDays = response.data.invite_days
                data.activityId = response.data.activity_id
              }
              
              context.commit("loadHasRewardResult", {result: data})
              localStorage.setItem('giftStatus',response.data.status);
              return data;
            }).catch(reason => {
              console.log("has reward error :",reason);
              context.commit("loadHasRewardResult", {result: {status:0}})
            })
        },
        FETCH_REWARD(context,options){
            console.log('request reward options1 : ', options)
            console.log("jid:" + window.jid + " lang:" + window.lang + " plat:" + plat)
            console.log('kenan555')
            var currentJid = getCurrentJid()
            var api = requestApiUrl('/ranking_activity/get_reward')
            console.log('kenan6');
            var activityId = localStorage.getItem('activity_id');
            console.log(activityId,'kenan6')
            return Vue.axios.post(api, qs.stringify({"jid":currentJid,"activity_id":activityId})).then((response) => {
                console.log("reward response", response.data)
                if(response.data == undefined || response.data == ""){
                  return false
                }
                return response.data.status == 1
              }).catch(reason => {
                console.log("reward error :",reason);
                return false
              })
        },
        FETCH_RANKING_LIST(context, options){
            //发布的时候换成服务端的域名
            console.log("request get options: ", options)
            console.log("rank list jid:" + window.jid + " lang:" + window.lang + " plat:" + plat);
            console.log(context.stated,'kenan123')
            var currentJid = getCurrentJid()
            
            var api = requestApiUrl('/ranking_activity/rank')
            
            var list = {};
            if (window.localStorage){
               var localRankingList = window.localStorage.getItem("rankingList");
               if (localRankingList != null){
                list = JSON.parse(localRankingList);
               }
            }
            
            
          return Vue.axios.post(api, qs.stringify({"jid":currentJid})).then((response) => {
                
                if (response.data != null && window.localStorage){
                  var status = response.data["activity"]["status"];
                  var gift_id = response.data["activity"]["gift_id"];
                  localStorage.setItem('activity_id',response.data["activity"]["activity_id"]);
                  context.commit("loadActivityId", {result: response.data["activity"]["activity_id"]})
                  // 公布结果期间
                  window.localStorage.setItem("rankStatus",status);
                  window.localStorage.setItem("gift_id",gift_id);
                  if (status == 1){
                    
                    // 本地缓存结果
                    window.localStorage.setItem("rankingList",JSON.stringify(response.data));
                    // 活动期间
                  } else if (status == 0){
                    // 下架期间
                  } else if (status == 2){
                    // loadError()
                    // 上一次显示结果
                     if (list.hasOwnProperty("activity") && list["activity"]["status"] == 1){
                       console.log("show last:", list)
                       context.commit("loadRankingList", {rankingList: list})
                       return
                     }
                  }
                }
                context.commit("loadRankingList", {rankingList: response.data})
            }).catch(reason => {
              console.log("reason:",reason);
              // loadError()
              // 请求异常，显示公布结果期间内容
              if (list.hasOwnProperty("activity") && list["activity"]["status"] == 1){
                console.log("show last:", list)
                context.commit("loadRankingList", {rankingList: list})
                return
              }
            })
        }
    },
    mutations: {
        loadRankingList(state, payload){
            state.rankingList = payload.rankingList
        },
        loadHasRewardResult(state, data){
          state.hasRewardResult = data.result
        },
        loadUserGiftRate(state,data){
          console.log('user gift data ', data.result)
          state.userGiftRate = data.result
        },
        loadanchorGiftRate(state,data){
          console.log('anchor gift data ', data.result)
          state.anchorGiftRate = data.result
        },
        loadActivityId(state,data){
          state.activityId = data.result
        }
    }
});

export default store
