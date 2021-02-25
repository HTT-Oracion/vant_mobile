import api from '@/utils/request'
export const getSearchSuggestions = q => {
  return api('get', '/app/v1_0/suggestion', { params: { q } })
}
export const getSearchResult = params => {
  return api('get', '/app/v1_0/search', { params })
}
export const getSearchHistories = () => {
  return api('get', '/app/v1_0/search/histories')
}