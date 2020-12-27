import { types } from "mobx-state-tree";

export const Article = types
  .model('Article', {
    id: '',
    title: '',
    content: ''
  })

export const ArticlesStore = types
  .model('ArticlesStore', {
    list: types.array(Article)
  })
  .views(self => ({
    get count(){
      return self.list.length;
    }
  }))
  .actions(self => ({
    addArticle(id, title, content){
      self.list.push({
        id, 
        title,
        content
      })
    }
  }))