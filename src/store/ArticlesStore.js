import { getArticleList } from "@/request/articles";
import { flow, types } from "mobx-state-tree";

export const Article = types
  .model('Article', {
    _id: '',
    title: '',
    content: ''
  })

export const ArticlesStore = types
  .model('ArticlesStore', {
    state: 'pending',
    list: types.array(Article)
  })
  .views(self => ({
    get count(){
      return self.list.length;
    }
  }))
  .actions(self => ({
    fetchArticles: flow(function* fetchArticles() { 
      // self.list = []
      self.state = "pending"
      try {
        const res = yield getArticleList();
        console.log(res)
        self.list = res.data.data;
        self.state = "done"
      } catch (error) {
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    })
  }))