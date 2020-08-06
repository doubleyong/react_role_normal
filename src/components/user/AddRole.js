import React from 'react'
class AddRole extends React.Component
{
    render()
    {
        return (
            <div>
                <h2>添加角色</h2>
                {this.props.children}
            </div>
        )
    }
}

export {AddRole as default}