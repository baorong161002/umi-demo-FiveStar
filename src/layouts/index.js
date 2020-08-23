import { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Menus from './siderMenu'
import BreadcrumbCustom from './breadcrumb'
import BreadcrumbContext from '../components/breadContext/index'
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadName: ''
        }
    }
    componentDidMount() {
        this.setState({
            breadName: '京东商品管理 -> 品牌确认'
        })
    }

    changeBreadName(value) {
        this.setState({
            breadName: value
        })
    }
    render() {

        return (
            <Layout>
                <Header style={{ background: '#108ee9', textAlign: 'left' }}>

                    <h1 style={{padding:"10 10 10 10"}} >五星电器 合作方协同平台</h1>

                </Header>
                <Layout >
                    <Sider width={200} style={{ minHeight: '100vh', color: 'white', background: '#fff' }}>
                        <Menus changeBreadName={this.changeBreadName.bind(this)} />
                    </Sider>

                    <Content style={{ margin: '0 0 0 16px' }}>
                        <div style={{ padding: 10, background: '#fff', minHeight: '100%' }}>
                            <div>
                                <BreadcrumbContext.Provider value={this.state.breadName}>
                                    {this.props.children}
                                </BreadcrumbContext.Provider>
                            </div>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout;