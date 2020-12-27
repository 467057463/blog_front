import API from '@/constants/api';
import axios from 'axios';

export function getArticleList(){
  return axios.get(API.ARTICLE_LIST)
}