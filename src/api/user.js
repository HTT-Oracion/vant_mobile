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
export const getUserInfoApi = () => {
  return api('get', '/app/v1_0/user/profile')
}
export const updateUserApi = data => {
  return api('patch', '/app/v1_0/user/profile', data)
}
export const updatePhotoApi = data => {
  return api('patch', '/app/v1_0/user/photo', data)
}