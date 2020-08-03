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
    /*menuId：菜单id, menuName：模块名称, menuUrl: 模块地址（路由），pathname:路径名，menuImgClass:菜单对应class名称，
     menuState：菜单状态 0 有效，1无效，menuChilds：子菜单列表，数组类型*/

    var menuInfo = [
        {
            menuId: 2,
            menuName: "用户管理理",
            menuUrl: "/index/user",
            pathname: "userlist",
            componentPath: "user/UserManger",
            menuImgClass: 'TeamOutlined',
            menuState: "0",
            menuChilds: []
        },
        {
            menuId: 3,
            menuName: "角色管理理理",
            menuUrl: "/index/role",
            pathname: "role",
            componentPath: "user/RoleManger",
            menuImgClass: 'WhatsAppOutlined',
            menuState: "0",
            menuChilds: [
                {
                    menuId: 7,
                    menuName: "添加角色",
                    menuUrl: "/index/role/addrole",
                    pathname: "addrole",
                    componentPath: "user/AddRole",
                    menuImgClass: 'VideoCameraAddOutlined',
                    menuState: "0",
                    menuChilds: [
                        {
                            menuId: 8,
                            menuName: "角色详情",
                            menuUrl: "/index/role/addrole/roleInfo",
                            pathname: "roleInfo",
                            componentPath: "user/RoleInfo",
                            menuImgClass: 'TagOutlined',
                            menuState: "0",
                            menuChilds: []
                        }
                    ]
                },
                {
                    menuId: 9,
                    menuName: "角色列表",
                    menuUrl: "/index/role/rolelist",
                    pathname: "rolelist",
                    componentPath: "user/RoleList",
                    menuImgClass: 'StarOutlined',
                    menuState: "0",
                    menuChilds: []
                }
            ]
        }
    ];

    /*
     var menuInfo=[{menuId: 1, menuName: "菜品管理", menuUrl: "/Dish",pathname:"Dish",componentPath:"Dish",menuImgClass: 'el-icon-dish', menuState: "0",
     menuChilds: [{menuId: 9, menuName: "菜品设置", menuUrl: "/DishSetList",pathname:"DishSetList", componentPath:"DishSetList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 10, menuName: "菜品类型", menuUrl: "/DishTypeList",pathname:"DishTypeList", componentPath:"DishTypeList",menuImgClass: '', menuState: "0", menuChilds: []}
     ]},
     { menuId: 2, menuName: "运营管理", menuUrl: "/Business",pathname:"Business", componentPath:"Business",menuImgClass: 'el-icon-files', menuState: "0",
     menuChilds: [{menuId: 11, menuName: "营业管理", menuUrl: "/BusinessList",pathname:"BusinessList", componentPath:"BusinessList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 12, menuName: "餐桌管理",menuUrl:"/diningTableList",pathname:"diningTableList",componentPath:"diningTableList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 13, menuName: "会员管理", menuUrl: "/MemberList",pathname:"MemberList", componentPath:"MemberList",menuImgClass: '', menuState: "0", menuChilds: []}]},
     { menuId: 3, menuName: "库存管理", menuUrl: "/Consumables",pathname:"Consumables", componentPath:"Consumables",menuImgClass: 'el-icon-box', menuState: "0",
     menuChilds: [{menuId: 14, menuName: "消耗品管理", menuUrl: "/ConsumablesList",pathname:"ConsumablesList", componentPath:"ConsumablesList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 15, menuName: "消耗品类型", menuUrl: "/ConsumablesTypeList",pathname:"ConsumablesTypeList",componentPath:"ConsumablesTypeList",menuImgClass: '', menuState: "0", menuChilds: []}
     ]},
     { menuId: 4, menuName: "订单管理", menuUrl: "/OrderList",pathname:"OrderList", componentPath:"OrderList",menuImgClass: 'el-icon-tickets', menuState: "0",menuChilds: []},
     { menuId: 5, menuName: "基础信息管理", menuUrl: "/Staff",pathname:"Staff", componentPath:"",menuImgClass: 'el-icon-user', menuState: "0",
     menuChilds: [{menuId: 16, menuName: "员工管理", menuUrl: "/StaffList",pathname:"StaffList", componentPath:"StaffList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 17, menuName: "角色管理", menuUrl: "/RoleList",pathname:"RoleList", componentPath:"RoleList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 18, menuName: "权限管理", menuUrl: "/PowerList",pathname:"PowerList", componentPath:"PowerList",menuImgClass: '', menuState: "0", menuChilds: []},{menuId: 19, menuName: "模块管理", menuUrl: "/ModuleList",pathname:"ModuleList", componentPath:"ModuleList",menuImgClass: '', menuState: "0", menuChilds: []}]},
     { menuId: 6, menuName: "系统设置", menuUrl: "/System",pathname:"System", componentPath:"System",menuImgClass: 'el-icon-setting', menuState: "0",
     menuChilds: [{menuId: 20, menuName: "数据备份", menuUrl: "/DataBackupList",pathname:"DataBackupList", componentPath:"DataBackupList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 21, menuName: "操作日志",menuUrl:"/OplogList",pathname:"OplogList",componentPath:"OplogList",menuImgClass: '', menuState: "0", menuChilds: []}]},
     { menuId: 7, menuName: "财务分析", menuUrl: "/Financial",pathname:"Financial", componentPath:"Financial",menuImgClass: 'el-icon-bank-card', menuState: "0",
     menuChilds: [{menuId: 22, menuName: "财务管理", menuUrl: "/FinancialList",pathname:"FinancialList", componentPath:"FinancialList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 23, menuName: "成本管理",menuUrl:"/CostList",pathname:"CostList",componentPath:"CostList",menuImgClass: '', menuState: "0", menuChilds: []},
     {menuId: 24, menuName: "其他支出",menuUrl:"/OtherList",pathname:"OtherList",componentPath:"OtherList",menuImgClass: '', menuState: "0", menuChilds: []}]},
     { menuId: 8, menuName: "回收站", menuUrl: "/WasteList",pathname:"WasteList", componentPath:"WasteList",menuImgClass: 'el-icon-delete', menuState: "0",menuChilds: []}
     ]
     */
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

