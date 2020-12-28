import { getArticleList } from "@/request/articles";
import { flow, types } from "mobx-state-tree";
import { Article } from './ArticleShowStore';

export const ArticlesStore = types
  .model('ArticlesStore', {
    state: 'pending',
    page: 1,
    quantity: 10,
    list: types.array(Article)
  })
  .views(self => ({
    get count(){
      return self.list.length;
    }
  }))
  .actions(self => ({
    fetchArticles: flow(function* fetchArticles() { 
      self.list = []
      self.state = "pending"
      try {
        const res = yield getArticleList();
        console.log(res)
        self.list = res.data;
        self.state = "done"
      } catch (error) {
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    })
  }))