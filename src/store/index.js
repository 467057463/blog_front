import { getSnapshot, types } from 'mobx-state-tree';
import { values } from 'mobx';

const Article = types
  .model({
    title: '',
    content: '',
    done: false,
  })
  .actions(self => ({
    toggle(){
      self.done = !self.done
    }
  }))

const User = types
  .model({
    name: ''
  })

const RootStore = types
  .model({
    users: types.map(User),
    articles: types.map(Article)
  })
  .views(self => ({
    get count(){
      return values(self.articles).length
    }
  }))
  .actions(self => ({
    addArticle(id, title){
      self.articles.set(id, Article.create({title}))
    }
  }))

export const store = RootStore.create({
  articles: {
    "1": {
      title: 'sssss'
    }
  }
})

console.log(getSnapshot(store))

