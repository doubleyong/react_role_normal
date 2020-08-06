React 权限管理
使用create_react_app框架，antd UI 使用axios请求数据，mobx存储数据.实现路由、菜单的动态生成，及面包屑的动态生成

node_data:使用Nodejs 搭建的一个服务器，主要给react项目给数据的。只写了登录接口，有跨域处理

如有疑问，可以到bug收集上提问，网址：bugshouji.com

架构与环境搭建
安装create-react-app
1.Npm install create-react-app –g 全局安装
2.通过create-react-app命令 创建项目
3.Npm start 运行项目启动

配置mobx
参考：https://blog.csdn.net/yanwu9537/article/details/93224463
1. create-react-app myreact
2. cd myreact
3. npm run eject 解压配置
4. 安装mobx mobx-react
mobx 是状态管理工具
mobx-react 是做数据分片和数据获取
注意： 如果git冲突
解决： 我们要原文件先放到本地暂存盘
git add .
git commit -m ’
​ 然后 ： 安装mobx mobx-react’
​ 注意不要git push

5. 配置装饰器（ 修饰器 es6 ） babel
yarn add babel-plugin-transform-decorators-legacy -D
yarn add @babel/preset-env -D
yarn add babel-plugin-transform-class-properties -D
yarn add @babel/plugin-proposal-decorators -D

npm install babel-plugin-transform-decorators-legacy -D,
@babel/preset-env -D,
babel-plugin-transform-class-properties -D,
@babel/plugin-proposal-decorators -D
6.配置package.json
"babel": {
	    "plugins": [
	      [
	        "@babel/plugin-proposal-decorators",
	        {
	          "legacy": true
	        }
	      ],
      "transform-class-properties"
    ],
    "presets": [
      "react-app",
      "@babel/preset-env"
    ]
    },

  注意： 以下两个配置顺序不可更改
     [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "transform-class-properties"
