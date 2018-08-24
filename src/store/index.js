import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';


Vue.use(Vuex);
Vue.use(VueAxios, axios);


const store = new Vuex.Store({
    state: {
        rankingList: {}
    },
    getters: {
        receiverTop:state=>{
          return [state.rankingList["receiveGifts"][0],state.rankingList["receiveGifts"][1],state.rankingList["receiveGifts"][2]];
        },
        sendTop:state=>{
          return [state.rankingList["sendGifts"][0],state.rankingList["sendGifts"][1],state.rankingList["sendGifts"][2]];
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
        }
    },
    actions: {
        FETCH_RANKING_LIST(context, options){
            //发布的时候换成服务端的域名
            console.log("request get options: ", options)
            console.log("jid:" + window.jid + " lang:" + window.lang + " plat:" + plat);
            return Vue.axios.post('http://54.222.148.146:46000/ranking_activity/rank',qs.stringify({"jid":"user_1007409@bj2.1-1.io"})).then((response) => {
                console.log("response", response.data)
                context.commit("loadRankingList", {rankingList: response.data})
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
