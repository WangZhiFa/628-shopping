import { reqGetDetail, reqAddOrUpdateShopping } from '../../api'
import { getUUid } from '@/utils/uuid_token';

const actions = {
  async getDetail({ commit }, id) {
    const { code, data } = await reqGetDetail(id)
    if (code == 200) commit('GETDETAIL', data)
  },
  async addOrUpdateShopping(_, { id, num }) {
    const result = await reqAddOrUpdateShopping(id, num)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETDETAIL(state, value) {
    state.detail = value
  }
}

const state = {
  detail: {},
  uuid_token: getUUid()
}

const getters = {
  categoryView(state) {
    return state.detail.categoryView || {}
  },
  skuInfo(state) {
    return state.detail.skuInfo || {}
  }

}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}