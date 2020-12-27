import { ArticlesStore } from './ArticlesStore';
import { getSnapshot, types } from 'mobx-state-tree';

const RootStore = types
  .model({
    // users: types.map(User),
    articles: types.optional(ArticlesStore, {})
  })

export const store = RootStore.create();
console.log(getSnapshot(store))
