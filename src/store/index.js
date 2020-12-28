import { getSnapshot, types } from 'mobx-state-tree';
import { ArticlesStore } from './ArticleListStore';
import { ArticleStore } from './ArticleShowStore';

const RootStore = types
  .model({
    // users: types.map(User),
    article: types.optional(ArticleStore, {}),
    articles: types.optional(ArticlesStore, {})
  })

export const store = RootStore.create();
console.log(getSnapshot(store))


