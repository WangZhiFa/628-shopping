import { reqGetAddress, reqGetOrderInfo } from '../../api'
const state = {
  userAddress: [],
  orderInfo: {}
}
const actions = {
  async getAddress({ commit }) {
    const { code, data } = await reqGetAddress()
    if (code == 200) {
      commit('GETADDRESS', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getOrderInfo({ commit }) {
    const { code, data } = await reqGetOrderInfo()
    if (code == 200) {
      commit('ORDERINFO', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETADDRESS(state, value) {
    state.userAddress = value
  },
  ORDERINFO(state, value) {
    state.orderInfo = value
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}