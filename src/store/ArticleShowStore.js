// import { getArticleList } from "@/request/articles";
import { types } from "mobx-state-tree";

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
