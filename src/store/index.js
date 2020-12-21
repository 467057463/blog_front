import { action, makeObservable, observable } from 'mobx';


class Store{
  id = Math.random();
  title = '';
  finished = false;

  constructor(title){
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action
    })
    this.title = title
  }

  toggle(){
    this.finished = !this.finished
  }
  // @observable price = 0;
}

export default Store;