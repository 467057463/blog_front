import { getArticle, createArticle, updateArticle, deleteArticle, likeArticle} from "@/request/articles";
import { flow, types } from "mobx-state-tree";
import history from '@/hook/history';
import { message } from 'antd';
import markMenu from '@/utils/markMenu';

// remark 相关
// import * as remark from 'remark';
// import * as slug from 'remark-slug';
// import * as extractToc from 'remark-extract-toc';


export const Article = types
  .model('Article', {
    _id: '',
    title: '',
    content: '',
    createdAt: '',
    describe: '',
    meta: types.frozen({
      view: 0,
      like: 0
    }),
    author: types.frozen({
      _id: '',
      username: ''
    }),
    comments: types.frozen(
      []
    )
  })
  .views(self => ({
    get commentCount(){
      return self.comments.length;
    },

    get menu(){
      // const processor = remark().use(slug).use(extractToc, {
      //   keys: ["data"]
      // });
      // const node = processor.parse(this.content);
      // const tree = processor.runSync(node);
      return markMenu(this.content)
    }
  }))

export const ArticleStore = types
  .model('ArticleStore', {
    state: 'pending',
    detail: types.optional(Article, {})
  })
  .actions(self => ({
    fetchSource: flow(function* fetchSource(id){
      self.state = "pending";
      try{
        const res = yield getArticle(id);
        console.log(res)
        self.detail = res.data;
        self.state = "done";        
        return res;
      } catch (error){
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    }),

    create: flow(function* create(data) {
      try{
        const res = yield createArticle(data);
        message.info('文章发布成功')
        history.replace(`/articles/${res.data._id}`)
      }catch(error){
        console.error("Failed to fetch projects", error)
      }
    }),

    update: flow(function* update(id, data){
      try{
        const res = yield updateArticle(id, data);
        message.info('文章更新成功')
        history.replace(`/articles/${res.data._id}`)
      }catch(error){
        console.error("Failed to fetch projects", error)
      }
    }),

    delete: flow(function* (id){
      try{
        const res = yield deleteArticle(id);
        message.info('文章已删除')
        history.replace('/')
      }catch(error){
        console.error("Failed to fetch projects", error)
      }
    }),

    like: flow(function* like(id){
      try{
        const res = yield likeArticle(id);
        message.info(res.message)     
      }catch(error){
        console.error("Failed to fetch projects", error)
      }
    })
  }))