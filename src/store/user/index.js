import { reqGetVerificationCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserExit } from '../../api'

const actions = {
  async getVerificationCode({ commit }, phone) {
    const { code, data } = await reqGetVerificationCode(phone)
    if (code == 200) {
      commit('GETVERIFICATIONCODE', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  async userRegister(_, data) {
    const { code } = await reqUserRegister(data)
    if (code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },

  async userLogin(_, data) {
    const { code, data: res } = await reqUserLogin(data)
    if (code == 200) {
      localStorage.setItem('TOKEN', res.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code == 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userExit({ commit }) {
    const result = await reqUserExit()
    if (result.code == 200) {
      commit('USEREXIT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}

const mutations = {
  GETVERIFICATIONCODE(state, value) {
    state.verificationCode = value
  },
  USERINFO(state, value) {
    state.userInfo = value
  },
  USEREXIT(state) {
    state.userInfo = {}
    localStorage.removeItem('TOKEN')
  }
}

const state = {
  verificationCode: '',
  userInfo: {}
}

const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}