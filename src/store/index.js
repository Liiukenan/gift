import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)


const store = new Vuex.Store({
    state: {
        rankingList: []
    },
    getters: {
        first: state => {
            return state.rankingList[0]
        },
        second: state => {
            return state.rankingList[1]
        },
        third: state => {
            return state.rankingList[2]
        },
        others: state => {
            return state.rankingList.slice(3)
        },
        mySelf: (state, myJid) => {
            return state.rankingList.filter(item => {
                item.jid = myJid
            })
        }
    },
    actions: {
        FETCH_RANKING_LIST(context, options){
            //发布的时候换成服务端的域名
            console.log("request get options: ", options)
            return Vue.axios.get('http://localhost:8445/ranking-list').then((response) => {
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
