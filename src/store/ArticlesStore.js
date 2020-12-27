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
    fetchArticles(){
      getArticleList()
      self.state = "done";
      self.list = [
        {
          _id: '1111',
          title: 'dsafsda',
          content: 'aaaaaaaa'
        }
      ]
    },
    // fetchArticles: flow(function* fetchArticles() { 
    //   // self.list = []
    //   self.state = "pending"
    //   try {
    //     // self.list = yield getArticleList()
    //     self.state = "done"
    //   } catch (error) {
    //     console.error("Failed to fetch projects", error)
    //     self.state = "error"
    //   }
    // })
  }))