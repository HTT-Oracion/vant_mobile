import api from '@/utils/request'

export const getComments = params => {
  return api('get', '/app/v1_0/comments', { params })
}


export const addCommentLike = target => {
  return api('post', '/app/v1_0/comment/likings', {
    target
  })
}

export const deleteCommentLike = commentId => {
  return api('delete', `/app/v1_0/comment/likings/${commentId}`)
}

export const addComment = data => {
  return api('post', '/app/v1_0/comments', data)
}