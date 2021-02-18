import api from '@/utils/request'
export const getArticleListApi = params => {
  return api('get', '/app/v1_1/articles', { params })
}
export const getArticleById = articleId => {
  return api('get', `/app/v1_0/articles/${articleId}`)
}

export const addCollect = articleId => {
  return api('post', '/app/v1_0/article/collections', {
    target: articleId
  })
}

export const deleteCollect = articleId => {
  return api('delete', `/app/v1_0/article/collections/${articleId}`)
}

export const addLike = articleId => {
  return api('post', '/app/v1_0/article/likings', { target: articleId })
}
export const deleteLike = articleId => {
  return api('delete', `/app/v1_0/article/likings/${articleId}`)
}