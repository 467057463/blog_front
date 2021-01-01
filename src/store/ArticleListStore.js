import { getArticleList } from "@/request/articles";
import { flow, types } from "mobx-state-tree";
import { Article } from './ArticleShowStore';

export const ArticlesStore = types
  .model('ArticlesStore', {
    state: 'pending',
    page: 1,
    quantity: 10,
    list: types.array(Article),
    count: 0
  })
  .actions(self => ({
    fetchArticles: flow(function* fetchArticles() { 
      self.list = []
      self.state = "pending"
      try {
        const res = yield getArticleList();
        self.list = res.data.list;
        self.page = res.data.page;
        self.quantity = res.data.quantity;
        self.count = res.data.count;
        self.state = "done"
      } catch (error) {
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    })  
  }))