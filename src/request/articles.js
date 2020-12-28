import API from '@/constants/api';
// import axios from 'axios';
import request from '@/request';

export function getArticleList(){
  return request.get(API.ARTICLE_LIST)
}