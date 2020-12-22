import { action, computed, makeObservable, observable } from 'mobx';

class Articles{
  list = [];

  constructor(list){
    makeObservable(this, {
      list: observable,
      count: computed,
      add: action
      // finished: observable,
    })
    this.list = list
  }

  get count(){
    return this.list.length
  }

  add(article){
    this.list.push(article)
  }
}



const articles = new Articles([
  {
    _id: 'dfasfdsafdsa',
    title: 'fdsafdsaf',
    content: 'dfafdsaf'
  },
  {
    _id: '123456',
    title: '123457',
    content: '32134578'
  }
]);


export default articles;