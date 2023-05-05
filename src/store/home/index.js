import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
const actions = {
  async categoryList({ commit }) {
    const { data } = await reqCategoryList()
    commit('CATEGORYLIST', data)
  },
  async getBannerList({ commit }) {
    const { data } = await reqGetBannerList()
    commit('GETBANNERLIST', data)
  },
  async getFloorList({ commit }) {
    const { data, code } = await reqGetFloorList()
    if (code === 200) commit('GETFLOORLIST', data)
  }
}

const mutations = {
  CATEGORYLIST(state, value) {
    value.pop()
    state.CategoryList = value
  },
  GETBANNERLIST(state, value) {
    state.bannerList = value
  },
  GETFLOORLIST(state, value) {
    state.floorList = value
  }
}

const state = {
  CategoryList: [],
  bannerList: [],
  floorList: []
}

const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
