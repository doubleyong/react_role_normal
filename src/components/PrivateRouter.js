import React from 'react'
import {Route} from 'react-router-dom'
import {inject,observer} from 'mobx-react'
import loadable from '@loadable/component'//动态加载组件
@inject("user")
@observer
class PrivateRouter extends React.Component
{
    constructor(){
        super();
        this.state={
            routerList:[]
        }
    }
    //生成路由
    bindRouter(list){
      let routerList= list.map((item)=>{
          ////判断是否有子判断
            if(item.menuChilds.length===0){//无子菜单
                return  <Route key={item.menuId} path={item.menuUrl} component={ loadable(() => import(`./${item.componentPath}`))}/>
            }else{
                //有子菜单
                //判断是否包含子组件
                 if(item.isContainChildren){ //嵌套在父级中，记得在在父组件中，添加 {this.props.children}在要嵌套的位置
                     return  <Route key={item.menuId} path={item.menuUrl} render={() =>{
                         let ComponentName =loadable(() => import(`./${item.componentPath}`));
                         return <ComponentName {...this.props}>
                             {this.bindRouter(item.menuChilds)}
                         </ComponentName>
                     }}>
                     </Route>
                 }else{ //不嵌套显示
                     return [...this.bindRouter(item.menuChilds),<Route key={item.menuId} path={item.menuUrl} component={ loadable(() => import(`./${item.componentPath}`))}/>]
                 }


            }
        })
      return routerList;
    }
    componentDidMount(){
        let menuList =this.bindRouter(this.props.user.user.menuInfo);
        this.setState({
            routerList :menuList
        })
    }
    render()
    {
        return (
            <div>
                {
                    this.state.routerList
                }
            </div>
        )
    }
}

export default PrivateRouter