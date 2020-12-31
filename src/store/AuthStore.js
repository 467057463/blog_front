import { flow, types } from "mobx-state-tree";
import { login, getCurrentUserInfo } from '@/request/auth';
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
        self.user = res.data.user;
        localStorage.setItem('access_token', res.data.access_token)
        self.isLoading = false;
        alert('登录成功')
        history.replace('/')
      }catch(error){
        console.log(error)
        alert(error.message)
        self.isLoading = false;
      }
    }),
    logout: flow(function* logout(){
      alert('退出登录成功')
      self.user = null;
      localStorage.removeItem('access_token')
      history.replace('/')
    }),
    getCurrentUser: flow(function* getCurrentUser(){
      const token = localStorage.getItem('access_token');
      if(!token) return;
      try{
        const res = yield getCurrentUserInfo();
        self.user = res.data.user;
      }catch(error){
        console.log(error)
      }
    })
  }))