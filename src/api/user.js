import api from '@/utils/request'

export const loginApi = data => {
  return api('post', '/app/v1_0/authorizations', data)
}
export const sendCodeApi = moblie => {
  return api('get', `/app/v1_0/sms/codes/${mobile}`)
}
export const getUserApi = () => {
  return api('get', '/app/v1_0/user')
}