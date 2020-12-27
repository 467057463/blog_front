import { ArticlesStore } from './ArticlesStore';
import { getSnapshot, onPatch, onSnapshot, types, onAction } from 'mobx-state-tree';
import { autorun, values } from 'mobx';

// const Article = types
//   .model({
//     title: '',
//     content: '',
//     done: false,
//     user: types.maybe(types.reference(types.late(() => User)))
//   })
//   .actions(self => ({
//     toggle(){
//       self.done = !self.done
//     },

//     setUser(user){
//       if(user === ''){
//         self.user = undefined
//       }else{
//         self.user = user
//       }
//     }
//   }))

// const Articles = types
//   .model('Articles', {
//     list: types.map(Article)
//   })
//   .views(self => ({
//     get count(){
//       return values(self.list).length
//     }
//   }))
//   .actions(self => ({
//     addArticle(id, title){
//       self.list.set(id, Article.create({title}))
//     }
//   }))

// const User = types
//   .model({
//     id: types.identifier,
//     name: ''
//   })

const RootStore = types
  .model({
    // users: types.map(User),
    articles: types.optional(ArticlesStore, {
      articles: []
    })
  })

export const store = RootStore.create();
console.log(getSnapshot(store))

// export const store = RootStore.create({
//   users: {
//     "1": {
//       id:　"1",
//       name: 'mm'
//     }
//   },
//   articles: {
//     list: {
//       "1": {
//         title: 'sssss'
//       }
//     }
//   }
// })
// // store.articles.get("1").setUser("1")
// console.log(getSnapshot(store))

// // autorun(() => {
// //   console.log('autoRun', store.articles.list)
// // })

// onPatch(store, newSnapshot => {
//   console.log('got new state', newSnapshot)
// })

// onAction(store, call => {
//   console.log('actions called', call)
// })