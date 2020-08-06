/**
 * Created by doubleyong on 2020/7/1.
 */
import {observable,action,computed} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class UserStore{
    user
    token
    @observable isLogin = false;

    @computed get user() {
        if(sessionStorage.getItem("user")){
            return  JSON.parse(sessionStorage.getItem("user"))
        }
        return {};
    }
    set user(data) {
        sessionStorage.setItem("user",JSON.stringify(data))
    }
    @computed get token() {
        if(sessionStorage.getItem("token")){
            return sessionStorage.getItem("token")
        }
        return "";
    }
    set token(data) {
        sessionStorage.setItem("token",JSON.stringify(data));
    }
    @action
    login=(values)=>{
        return new Promise((resolve,reject)=>{
            Axios.post(Api.user.userLogin, {userName:values.username,userPwd:values.password}
            ).then((res)=>{
                    // console.log(res)
                    if(res.data.returnCode===200){
                        this.user = res.data.data;
                        this.token = res.data.token;
                        resolve('登录成功')
                    }else{
                        reject('登录失败')
                    }
                })
        })
    }
}