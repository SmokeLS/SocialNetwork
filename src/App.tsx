import React from 'react';
import './App.css';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setInitializedSettings } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import withLazyLoading from './components/hoc/withLazyLoading';
import HeaderContainer from './components/Header/HeaderContainer';
import { Layout, Menu } from 'antd';

import 'antd/dist/antd.css';
import { AppStateType } from './redux/redux-store';

type PropsType = {
  setInitializedSettings: () => void;
  initialized: boolean;
};

const { Header, Content, Footer, Sider } = Layout;

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const NotFoundPage = React.lazy(() => import('./components/Pages/NotFoundPage'));

const DialogsContainerWithLazy = withLazyLoading(DialogsContainer);
const ProfileContainerWithLazy = withLazyLoading(ProfileContainer);
const UsersContainerWithLazy = withLazyLoading(UsersContainer);
const NotFoudPageWithLazy = withLazyLoading(NotFoundPage);

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.setInitializedSettings();
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      <Layout>
        <Header className="header">
          <HeaderContainer />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                <Menu.Item key="1">
                  <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/dialogs">Messages</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/users">Users</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/profile" />
                </Route>
                <Route path="/dialogs" render={() => <DialogsContainerWithLazy />} />
                <Route path="/profile/:userId?" render={() => <ProfileContainerWithLazy />} />
                <Route path="/users" render={() => <UsersContainerWithLazy />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="*" render={() => <NotFoudPageWithLazy />} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

export default compose(withRouter, connect(mapStateToProps, { setInitializedSettings }))(App) as React.ComponentType;
