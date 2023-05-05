import {reqGetSearchList} from '@/api'
const actions = {
  async getSearchList({commit},params={}){
   const {data,code} = await reqGetSearchList(params)
   if(code === 200) commit('GETSEARCHLIST',data)
  }
}

const mutations = {
  GETSEARCHLIST(state,value){
    state.searchList = value
  }
}

const state = {
  searchList:{}
}

const getters = {
  goodsList(state) {
    return state.searchList.goodsList
  },
  attrsList(state){
    return state.searchList.attrsList

  },
  trademarkList(state){
    return state.searchList.trademarkList
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
