import { getArticle } from "@/request/articles";
import { flow, types } from "mobx-state-tree";

export const Article = types
  .model('Article', {
    _id: '',
    title: '',
    content: '',
    createdAt: '',
    meta: types.frozen({
      view: 0,
      like: 0
    }),
    author: types.frozen({
      _id: '',
      username: ''
    }),
    comments: types.frozen(
      []
    )
  })
  .views(self => ({
    get commentCount(){
      return self.comments.length;
    }
  }))

export const ArticleStore = types
  .model('ArticleStore', {
    state: 'pending',
    detail: types.optional(Article, {})
  })
  .actions(self => ({
    fetchSource: flow(function* fetchSource(id){
      self.state = "pending";
      try{
        const res = yield getArticle(id);
        console.log(res)
        self.detail = res.data;
        self.state = "done";        
      } catch (error){
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    })
  }))