import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Breadcrumb } from 'antd';
import {inject,observer} from 'mobx-react'
@inject("user")
@observer
class NewBreadcrumb extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            menuList:[],
            extraBreadcrumbItems: [],
        }
    }
    //以递归的方式展平react router数组
    changeMenuList(){
        const arr = this.props.user.user.menuInfo.reduce(function f(pre,item){
            // const callee = arguments.callee //将运行函数赋值给一个变量备用
            pre.push(item)
            if(item.menuChilds && item.menuChilds.length > 0) item.menuChilds.reduce(f,pre); //判断当前参数中是否存在children，有则递归处理
            return pre;
        },[]).map((item) => {
            item.menuChilds = []
            return item
        })
        this.setState({
            menuList:arr
        },function () {
            this.buildBread()
        })
    }

    buildBread = () => {
        //清空面包屑的项
        this.setState({
            extraBreadcrumbItems:[]
        },function(){
            //1. 获取路径 名
            let pathname = this.props.history.location.pathname;
            console.log(this.props)
            let currentMenu = this.state.menuList.find((item)=>{
                return item.menuUrl === pathname
            });
            if(currentMenu && currentMenu.menuId){
                this.buildBreadItemByMenuId(currentMenu.menuId);//生成面包屑的项
            }
        });

    }
    buildBreadItemByMenuId=(menuId)=>{
        let Menu = this.state.menuList.find((item)=>{
            return item.menuId === menuId
        })
        console.log(Menu)
        if(Menu) {
            this.setState({
                extraBreadcrumbItems: [
                    (<Breadcrumb.Item key={Menu.menuUrl}>
                        <Link to={Menu.menuUrl}>
                            {Menu.menuName}
                        </Link>
                    </Breadcrumb.Item>),...this.state.extraBreadcrumbItems]
            },function () {
                if (Menu.pId !== 0) {
                    this.buildBreadItemByMenuId(Menu.pId)
                }
            })
        }
    }
    componentDidMount(){
        this.changeMenuList();
    }
    componentWillReceiveProps(){
        this.buildBread()
    }
    render() {
        return <Breadcrumb>
            <Breadcrumb.Item><Link to="/index">首页</Link></Breadcrumb.Item>
            {this.state.extraBreadcrumbItems}
            </Breadcrumb>;
    }
}

export default withRouter(NewBreadcrumb)