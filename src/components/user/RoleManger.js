import React from 'react'
class RoleManger extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>角色管理</h2>
                {this.props.children}
            </div>
        )
    }
}

export {RoleManger as default}