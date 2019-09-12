import http from '@/api/public'

/**
 * 用户登录
 */

//初始极验
export const startCaptcha = (params) => {
  return http.get('customer/auth/startCaptcha','' )
}

//登录
export const AuthLogin = (params) => {
  return http.post('customer/login', params)
}

//登出
export const AuthLogout = (params) => {
  return http.post('customer/auth/logout',params)
}
