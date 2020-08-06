import React from 'react'
class UserManger extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>用户管理</h2>
            </div>
        )
    }
}

export {UserManger as default}

export class RoleManger extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>角色管理管理</h2>
            </div>
        )
    }
}

export class AddRole extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>添加角色</h2>
            </div>
        )
    }
}


export class RoleList extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>角色列表 </h2>
            </div>
        )
    }
}

export class RoleInfo extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>角色详情</h2>
            </div>
        )
    }
}