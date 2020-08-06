import React from 'react'
import { Layout } from 'antd';
import { Form, Input,Checkbox, Button } from 'antd';
import {inject,observer} from 'mobx-react'
const { Header, Footer, Content } = Layout;

@inject('user')
@observer
class Login extends React.Component {
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        const onFinish = values => {
            //需要将值 ，提到服务器端进行判断
            this.props.user.login(values).then((data)=>{
                this.props.history.push("/index")
            }).catch(function(err){
                console.log(err)
            });//如果登录成功，我要跳转页面
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Layout>
            <Header>国信安w218班级系统</Header>
            <Content>
            <Form
        {...layout}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
            >
            <Form.Item
        label="Username"
        name="username"
        rules={[
            {
                required: true,
                message: '请输入用户名',
            },
    ]}
    >
    <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
            {
                required: true,
                message: '请输入密码',
            },
    ]}
    >
    <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
    <Button type="primary" htmlType="submit">
            登录
            </Button>
            </Form.Item>
            </Form>
            </Content>
            <Footer>备案号：doubleyong川xxx</Footer>
        </Layout>
    )
    }
}

export default Login