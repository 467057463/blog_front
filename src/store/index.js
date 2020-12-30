import { getSnapshot, types } from 'mobx-state-tree';
import { ArticlesStore } from './ArticleListStore';
import { ArticleStore } from './ArticleShowStore';
import { AuthStore } from './AuthStore';

const RootStore = types
  .model({
    // users: types.map(User),
    article: types.optional(ArticleStore, {}),
    articles: types.optional(ArticlesStore, {}),
    auth: types.optional(AuthStore, {})
  })

export const store = RootStore.create();
console.log(getSnapshot(store))


