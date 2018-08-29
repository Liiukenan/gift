import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';


Vue.use(Vuex);
Vue.use(VueAxios, axios);

const isDev = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: {
        rankingList: {}
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
        }
    },
    actions: {
        FETCH_RANKING_LIST(context, options){
            //发布的时候换成服务端的域名
            console.log("request get options: ", options)
            console.log("jid:" + window.jid + " lang:" + window.lang + " plat:" + plat);
            var list = {};
            if (window.localStorage){
               var localRankingList = window.localStorage.getItem("rankingList");
               if (localRankingList != null){
                list = JSON.parse(localRankingList);
               }
            }
            var currentJid = "user_1007409@bj2.1-1.io";
            if (window.plat == "android" || window.plat == "ios"){
              currentJid = window.jid;
            }
            //http://54.222.148.146:46000/
          
          var api = 'ranking_activity/rank'
          /*
          部署在nginx后面的话，用proxy解决跨域问题。nginx配置如下：
          location /ranking_activity/ {
            # proxy_set_header X-Real-IP $remote_addr;
            # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # proxy_set_header X-NginX-Proxy true;
            proxy_pass http://54.222.148.146:46000/ranking_activity/;
            # proxy_ssl_session_reuse off;
            # proxy_set_header Host $http_host;
            # proxy_redirect off;
          }*/
          if(isDev){
            //如果部署在CDN，也要用这个地址，服务端处理跨域问题
            api = 'http://54.222.148.146:46000/ranking_activity/rank'
          }  
          return Vue.axios.post(api, qs.stringify({"jid":currentJid})).then((response) => {
                console.log("response", response.data)
                if (response.data != null && window.localStorage){
                  var status = response.data["activity"]["status"];
                  // 公布结果期间
                  if (status == 1){
                    // 本地缓存结果
                    window.localStorage.setItem("rankingList",JSON.stringify(response.data));
                    // 活动期间
                  } else if (status == 0){
                    // 下架期间
                  } else if (status == 2){
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
              loadError()
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
        }
    }
});

export default store
