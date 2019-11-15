import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'antd'

const ContextMenu = ({ onDuplicate }) => (
  <Menu>
    <Menu.Item key="1" onClick={onDuplicate}>
      <Icon type="copy" />
      Duplicate Item
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      Item
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Icon type="info-circle" />
      Item Info
    </Menu.Item>
  </Menu>
)

ContextMenu.propTypes = {
  onDuplicate: PropTypes.func,
}

export default ContextMenu
