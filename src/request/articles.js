import API from '@/constants/api';
import request from '@/request';

export function getArticleList(){
  return request.get(API.ARTICLE_LIST)
}

export function getArticle(id){
  return request.get(API.ARTICLE_SHOW.replace(':id', id))
}