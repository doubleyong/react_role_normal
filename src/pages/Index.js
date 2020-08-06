import React from 'react'
import { Layout } from 'antd';
import LeftMenu from '../components/LeftMenu'
import NewBreadcrumb from '../components/NewBreadcrumb'
const { Header, Content, Sider } = Layout;
class Index extends React.Component
{
    render()
    {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <h1 className="logo_title">bug收集后台管理系统</h1>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        {/*这里写一个组件，根据数据生成Menu*/}
                        <LeftMenu />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <NewBreadcrumb style={{ margin: '15px ' }}/>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export {Index as default}