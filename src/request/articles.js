import API from '@/constants/api';
import request from '@/request';

export function getArticleList(page){
  return request.get(API.ARTICLE_LIST, {params: {page, quantity: 10}})
}

export function getArticle(id){
  return request.get(API.ARTICLE_SHOW.replace(':id', id))
}

export function createArticle(data){
  return request.post(API.ARTICLE_CREATE, data)
}

export function updateArticle(id, data){
  return request.put(API.ARTICLE_UPDATE.replace(':id', id), data)
}

export function deleteArticle(id){
  return request.delete(API.ARTICLE_DELETE.replace(':id', id))
}

export function likeArticle(id){
  return request.post(API.ARTICLE_LIKE.replace(':id', id))
}