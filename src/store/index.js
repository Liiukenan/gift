import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';


Vue.use(Vuex);
Vue.use(VueAxios, axios)


const store = new Vuex.Store({
    state: {
        rankingList: {}
    },
    getters: {
        first: state => {
            if (state.rankingList.hasOwnProperty("receiveGifts")) {
              return state.rankingList["receiveGifts"][0] == undefined? {} : state.rankingList["receiveGifts"][0]
            } else {
              return undefined
            }
        },
        second: state => {
          if (state.rankingList.hasOwnProperty("receiveGifts")) {
            return state.rankingList["receiveGifts"][1] == undefined? {} : state.rankingList["receiveGifts"][1]
          } else {
            return undefined
          }
        },
        third: state => {
          if (state.rankingList.hasOwnProperty("receiveGifts")) {
            return state.rankingList["receiveGifts"][2] == undefined? {} : state.rankingList["receiveGifts"][2]
          } else {
            return undefined
          }
        },
        others: state => {
          if (state.rankingList.hasOwnProperty("receiveGifts")) {
            var others = state.rankingList["receiveGifts"];
            return  others.slice(3)
          } else {
            return undefined
          }
        },
        // mySelf: (state, myJid) => {
        //     return state.rankingList.filter(item => {
        //         item.jid = myJid
        //     })
        // }
        mySelf:state => {
          if (state.hasOwnProperty("profile")){
            console.log(state.rankingList["profile"])
            return state.rankingList["profile"];
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
