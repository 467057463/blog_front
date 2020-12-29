import { flow, types } from "mobx-state-tree";
import { login } from '@/request/auth';

export const LoginStore = types
  .model('LoginStore', {
    isLoading: false,    
  })
  .actions(self => ({
    login: flow(function* logion(data){
      self.isLoading = true;
      try{
        const res = yield login(data);
        localStorage.setItem('token', res.data.access_token)
        self.isLoading = false;
        alert('登录成功')
      }catch(error){
        console.log(error)
        alert(error.message)
        self.isLoading = false;
      }
    })
  }))