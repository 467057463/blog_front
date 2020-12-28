import { getArticleList } from "@/request/articles";
import { flow, types } from "mobx-state-tree";
import { Article } from './ArticleShowStore';

// export const Article = types
//   .model('Article', {
//     _id: '',
//     title: '',
//     content: '',
//     createdAt: '',
//     meta: types.frozen({
//       view: 0,
//       like: 0
//     }),
//     author: types.frozen({
//       _id: '',
//       username: ''
//     }),
//     comments: types.frozen(
//       []
//     )
//   })
//   .views(self => ({
//     get commentCount(){
//       return self.comments.length;
//     }
//   }))

export const ArticlesStore = types
  .model('ArticlesStore', {
    state: 'pending',
    page: 1,
    pageSize: 10,
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