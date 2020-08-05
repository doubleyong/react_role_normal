/**
 * Created by doubleyong on 2020/7/31.
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); //返回一个服务

// cors 跨域

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,token,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//用户登录接口
app.post("/user/login", (request, response) => {
    var userName = request.body.userName;
    var userPwd = request.body.userPwd;
    console.log(userName);
    console.log(userPwd);
    // 判断用户名，密码是否正确,登录成功，获取用户数据,这里不操作数据库了，直接模拟返回的数据
    var userInfo = {id: 7, userName: "sunshine", userHeader: "Cat.png", RoleId: 1} // 用户相关的数据
//根据用户的角色id，去检查菜单数据(树形结构) -- 注：菜单==模块
    /*
     menuId: 2,//菜单id
     menuName: "用户管理理",//菜单名称
     menuUrl: "/index/user",//菜单的路径，注如果子菜单要显示在父菜单中，那路径一定要有父级的路径
     pathname: "userlist",//菜单路径名称，暂时没用
     componentPath: "user/UserManger",//对应组件的路径
     menuImgClass: 'TeamOutlined',//菜单对应的class名称,主要用于设置菜单的ICON
     menuState: "0",//菜单的状态，0 有效，1无效
     isContainChildren:false,//是否包含子组件中
     menuChilds: []	//子菜单列表，必须是数组类型
     */

    var menuInfo = [
        {
            menuId: 2,
            menuName: "用户管理理",
            menuUrl: "/index/user",
            pathname: "userlist",
            componentPath: "user/UserManger",
            menuImgClass: 'TeamOutlined',
            pId:0,
            menuState: "0",
            isContainChildren:false,
            menuChilds: [{
                menuId: 10,
                menuName: "添加用户",
                menuUrl: "/index/adduser",
                pathname: "adduser",
                componentPath: "user/AddUser",
                menuImgClass: 'VideoCameraAddOutlined',
                pId:2,
                menuState: "0",
                isContainChildren:false,
                menuChilds: []
            },{
                menuId: 11,
                menuName: "修改用户",
                menuUrl: "/index/modifyUser",
                pathname: "modifyUser",
                componentPath: "user/ModifyUser",
                menuImgClass: 'VideoCameraAddOutlined',
                pId:2,
                menuState: "0",
                isContainChildren:false,
                menuChilds: []
            }]
        },
        {
            menuId: 3,
            menuName: "角色管理理理",
            menuUrl: "/index/role",
            pathname: "role",
            componentPath: "user/RoleManger",
            menuImgClass: 'WhatsAppOutlined',
            pId:0,
            menuState: "0",
            isContainChildren:true,
            menuChilds: [
                {
                    menuId: 7,
                    menuName: "添加角色",
                    menuUrl: "/index/role/addrole",
                    pathname: "addrole",
                    componentPath: "user/AddRole",
                    menuImgClass: 'VideoCameraAddOutlined',
                    pId:3,
                    menuState: "0",
                    isContainChildren:false,
                    menuChilds: []
                },
                {
                    menuId: 8,
                    menuName: "角色详情",
                    menuUrl: "/index/role/roleInfo",
                    pathname: "roleInfo",
                    componentPath: "user/RoleInfo",
                    menuImgClass: 'TagOutlined',
                    isContainChildren:false,
                    pId:3,
                    menuState: "0",
                    menuChilds: []
                },
                {
                    menuId: 9,
                    menuName: "角色列表",
                    menuUrl: "/index/role/rolelist",
                    pathname: "rolelist",
                    componentPath: "user/RoleList",
                    menuImgClass: 'StarOutlined',
                    pId:3,
                    menuState: "0",
                    isContainChildren:false,
                    menuChilds: []
                }
            ]
        }
    ];

//返回用户数据格式， data:登录用户数据，与权限菜单数据
// token:登录成功后，返回给用户的token值
// returnCode: 返回登录的状态码，200表示登录成功
    var returnData = {
        data: {
            menuInfo: menuInfo,
            userInfo: userInfo,
        },
        token: "111",
        returnCode: 200
    }
    response.send(returnData);
})

app.listen(8888, () => {
    console.log("服务已经启动");
});

