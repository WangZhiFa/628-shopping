import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api/index';
const actions = {
  async getCartList({ commit }) {
    const { code, data } = await reqGetCartList()
    if (code === 200) commit('GETCARTLIST', data)
  },
  async deleteCartById(_, id) {
    const { code } = await reqDeleteCartById(id);
    if (code == 200) return 'ok'
    else return Promise.reject(new Error('faile'))
  },
  async updateCheckedById(_, { id, isChecked }) {
    const { code } = await reqUpdateCheckedById(id, isChecked);
    if (code == 200) return 'ok'
    else return Promise.reject(new Error('faole'))
  },
  deleteAllCheckedCart(context) {
    let promiseAll = []
    const isChecked = context.getters.shopCartList.cartInfoList.filter(item => item.isChecked == 1)

    if (isChecked.length <= 0) return
    isChecked.forEach(item => {
      const promise = context.dispatch('deleteCartById', item.skuId)
      promiseAll.push(promise)
    });
    return Promise.all(promiseAll)
  },
  selectAllChecked({ getters, dispatch }, isChecked) {
    let promiseAll = []
    const result = getters.shopCartList.cartInfoList.filter(item => item.isChecked != isChecked)
    result.forEach(item => {
      const promise = dispatch('updateCheckedById', { id: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETCARTLIST(state, value) {
    state.shopCartList = value
  }
}
const state = {
  shopCartList: []
}
const getters = {
  shopCartList(state) {
    return state.shopCartList[0] || []
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
} 