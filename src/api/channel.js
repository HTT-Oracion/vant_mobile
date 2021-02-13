import api from '@/utils/request'

export const getChannelsApi = () => {
  return api('get', '/app/v1_0/channels')
}
export const addChannelApi = data => {
  return api('patch', '/app/v1_0/user/channels', data)
}
export const deleteChannelApi = channelId => {
  return api('delete', `/app/v1_0/user/channels/${channelId}`)
}