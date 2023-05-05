import $request from './request'
import $mockRequest from './mockAjax'

export const reqCategoryList = () => {
  return $request({
    url: 'product/getBaseCategoryList',
    method: 'get'
  })
}

export const reqGetBannerList = () => $mockRequest.get('/banner')
export const reqGetFloorList = () => $mockRequest.get('floor')
export const reqGetSearchList = (params) => $request({
  url: '/list',
  method: 'post',
  data: params
})
export const reqGetDetail = (id) => $request({
  url: `/item/${id}`,
  method: 'get',
})
export const reqAddOrUpdateShopping = (id, num) => $request({
  url: `/cart/addToCart/${id}/${num}`,
  method: 'post'
})
export const reqGetCartList = () => $request({
  url: `/cart/cartList`,
  method: 'get'
})

export const reqDeleteCartById = (id) => $request({
  url: `/cart/deleteCart/${id}`,
  method: 'delete'
})

export const reqUpdateCheckedById = (id, isChecked) => $request({
  url: `/cart/checkCart/${id}/${isChecked}`,
  method: 'get'
})

export const reqGetVerificationCode = (phone) => $request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

export const reqUserRegister = (data) => $request({
  url: `/user/passport/register`,
  method: 'post',
  data
})

export const reqUserLogin = (data) => $request({
  url: `/user/passport/login`,
  method: 'post',
  data
})

export const reqUserInfo = () => $request({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

export const reqUserExit = () => $request({
  url: `/user/passport/logout`,
  method: 'get'
})

export const reqGetAddress = () => $request({
  url: `/user/userAddress/auth/findUserAddressList`,
  method: 'get'
})

// order/auth/trade
export const reqGetOrderInfo = () => $request({
  url: `/order/auth/trade`,
  method: 'get'
})

export const reqSubmitOrder = (tradeNo, data) => $request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

export const reqPayInfo = (orderId) => $request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

export const reqPayStatus = (orderId) => $request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

export const reqGetMyOrder = (page, limit) => $request({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})
