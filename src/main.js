import Vue from 'vue'
import store from '@/store'
import App from './App.vue'
import router from '@/router'
import { MessageBox } from 'element-ui';

import TypeNav from '@/components/TypeNva'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import myPlugin from '@/plugins/myPlugin'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
Vue.use(myPlugin, { name: 'test' })

Vue.config.productionTip = false

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages, is: (field) => `${field}必须与密码相同`
  },
  attributes: { phone: '手机号', code: '验证码', password: '密码', password1: '确认密码', agree: '协议' }
})
VeeValidate.Validator.extend('agree', { validate: value => { return value }, getMessage: field => field + '必须同意' })


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
