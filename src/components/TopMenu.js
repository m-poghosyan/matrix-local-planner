import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Layout } from 'antd'

const { Header } = Layout

const LogoWrapper = styled.div`
  width: 240px;
  height: 64px;
  margin: 0 128px 0 0;
  line-height: 64px;
  transition: all 0.3s;
  float: left;

  .image {
    height: 28px;
    vertical-align: middle;
  }

  .text {
    display: inline-block;
    margin: 0 0 0 16px;
    color: #e9eff5;
    font-weight: 600;
    font-size: 22px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
`

const Logo = ({ text }) => (
  <LogoWrapper>
    <Link to="/">
      <img className="image" src="/images/logo.svg" alt="Matrix Project" />
      <h1 className="text">{text}</h1>
    </Link>
  </LogoWrapper>
)

Logo.propTypes = {
  text: PropTypes.string,
}

const TopMenu = withRouter(({ title, location }) => (
  <Header
    style={{
      position: 'fixed',
      zIndex: 100,
      width: '100%',
      padding: '0 24px',
    }}
  >
    <Logo alt="Logo" text={title || 'Matrix Project'} />
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[location.pathname]}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="/">
        <Link to="/">Menus</Link>
      </Menu.Item>

      <Menu.Item key="/planner" disabled>
        <Link to="/planner">Planner</Link>
      </Menu.Item>

      <Menu.Item key="/recipes">
        <Link to="/recipes">Recipes</Link>
      </Menu.Item>

      <Menu.Item key="/dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
    </Menu>
  </Header>
))

TopMenu.propTypes = {
  location: PropTypes.object,
}

export default TopMenu
