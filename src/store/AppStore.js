import { flow, types } from "mobx-state-tree";

export const AppStore = types
  .model('AppStore', {
    progress: types.frozen({
      show: false,
      percent: 0,
    }),
    title: types.frozen({
      name: '',
      icon: '',
      actions: ''
    })
  })
  .actions(self => ({
    progressStart(){
      self.progress = { 
        show: true,       
        percent: 0
      };
    },
    progressDone(){
      self.progress = { 
        show: false,       
        percent: 1
      };
    },
    setPercent(value){
      self.progress = { 
        show: true,       
        percent: value
      };
    }
  }))