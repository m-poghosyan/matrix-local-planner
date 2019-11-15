import React from 'react'
import { Icon, Dropdown, Popconfirm, Tooltip } from 'antd'
import ContextMenu from './ContextMenu'

const Actions = ({ onEdit, onDelete, onDuplicate }) => [
  <Tooltip placement="bottom" title="Edit Item">
    <Icon type="edit" onClick={onEdit} />
  </Tooltip>,
  <Tooltip placement="bottom" title="Delete Recipe">
    <Popconfirm
      placement="top"
      title="Are you sure to delete this item?"
      onConfirm={onDelete}
      okText="Yes"
      cancelText="No"
    >
      <Icon className="deleteIcon" type="delete" />
    </Popconfirm>
  </Tooltip>,
  <Dropdown overlay={ContextMenu({ onDuplicate })} trigger={['click']}>
    <Icon type="ellipsis" />
  </Dropdown>,
]
export default Actions
