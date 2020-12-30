import { flow, types } from "mobx-state-tree";
import { login } from '@/request/auth';
import history from '@/hook/history';

export const AuthStore = types
  .model('LoginStore', {
    user: types.frozen(null),    
  })
  .actions(self => ({
    login: flow(function* logion(data){
      console.log(history)
      self.isLoading = true;
      try{
        const res = yield login(data);
        self.user = {
          _id: 'safaa',
          username: 'mm'
        }
        localStorage.setItem('token', res.data.access_token)
        self.isLoading = false;
        alert('登录成功')
        history.replace('/')
      }catch(error){
        console.log(error)
        alert(error.message)
        self.isLoading = false;
      }
    }),
    getCurrentUser: flow(function* getCurrentUser(){
      const token = localStorage.getItem('token');
      if(token){
        self.user = {
          _id: 'safaa',
          username: 'mm'
        }
      }
    })
  }))