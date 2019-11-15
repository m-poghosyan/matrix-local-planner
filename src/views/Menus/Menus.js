import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import pluralize from 'pluralize'
import { Button, DatePicker, Input, Popconfirm, Table, Tooltip } from 'antd'

import { CreateMenuFormModal } from '../../components/Menus/CreateMenuFormModal'
import { capitalize } from '../../utils/strings'
import { dateRange } from '../../helpers/formatters'
import * as menusActions from '../../store/actions/MenusActions'
import * as conceptsActions from '../../store/actions/ConceptsActions'

const { Search } = Input
const { RangePicker } = DatePicker

const MenuBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 16px;

  .menubar-item {
    width: 100%;
    display: flex;

    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }

  .menubar-left {
    justify-content: flex-start;
  }

  .menubar-right {
    justify-content: flex-end;
  }
`

function searchItem(item, prop, query) {
  return (
    item[prop] &&
    String(item[prop])
      .toLowerCase()
      .indexOf(query) > -1
  )
}

const Menus = ({ actions, loading, menuItems, conceptItems }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [sorted, setSorted] = useState({})

  useEffect(() => {
    actions.fetchMenus()
    actions.fetchConcepts(['MEN', 'MEC'])
  }, [actions])

  const [filteredMenuItems, setFilteredMenuItems] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setFilteredMenuItems(
      menuItems.filter(
        menu =>
          searchItem(menu, ['Description'], searchQuery) ||
          searchItem(menu, ['Concept'], searchQuery)
      )
    )
  }, [menuItems, searchQuery])

  const handleTableChange = (_pagination, _filters, sorter) => {
    setSorted(sorter)
  }

  const handleRowDelete = id => {
    actions.deleteMenu(id)
  }

  const handleCreateMenu = (menuType, data) => {
    if (menuType === 'MEN') {
      actions.createMenuMEN(data)
    } else if (menuType === 'MEC') {
      console.log(menuType, data)
    }
  }

  const handleSetVisible = isVisible => setIsFormVisible(isVisible)

  const columns = [
    {
      title: 'Menu Description',
      dataIndex: 'Description',
      key: 'description',
      sorter: (a, b) => a.Description < b.Description,
      sortOrder: sorted.columnKey === 'description' && sorted.order,
      render: (text, record) => (
        <Link to={`/planner/${record.MenuKey}`}>{capitalize(text)}</Link>
      ),
    },
    {
      title: 'Menu ID',
      dataIndex: 'MenuID',
      key: 'menuid',
      align: 'right',
      sorter: (a, b) => Number(a.MenuID) - Number(b.MenuID),
      sortOrder: sorted.columnKey === 'menuid' && sorted.order,
    },
    {
      title: 'Concept',
      dataIndex: 'Concept',
      key: 'concept',
      sorter: (a, b) => a.Concept.length - b.Concept.length,
      sortOrder: sorted.columnKey === 'concept' && sorted.order,
    },
    {
      title: 'Menu Type',
      dataIndex: 'MenuType',
      key: 'menutype',
      sorter: (a, b) => a.MenuType.length - b.MenuType.length,
      sortOrder: sorted.columnKey === 'menutype' && sorted.order,
    },
    {
      title: 'Date Range',
      key: 'dateRange',
      render: (_text, record) => {
        const { DateFrom, DateTo } = record
        return <span>{dateRange(DateFrom, DateTo, true, 'Do MMM')}</span>
      },
    },

    {
      title: 'Actions',
      align: 'center',
      width: 125,
      render: (_text, record) =>
        filteredMenuItems.length >= 1 ? (
          <Tooltip placement="right" title="Delete Item">
            <Popconfirm
              title="Confirm delete?"
              onConfirm={() => handleRowDelete(record.MenuID)}
            >
              <Button type="danger" icon="delete" />
            </Popconfirm>
          </Tooltip>
        ) : null,
    },
  ]

  return (
    <div>
      <MenuBar>
        <div className="menubar-item menubar-left">
          <Search
            enterButton
            allowClear
            disabled={loading}
            placeholder="Search menus..."
            onChange={event => setSearchQuery(event.target.value.toLowerCase())}
            style={{ width: 400 }}
          />
        </div>
        <div className="menubar-item menubar-right">
          <RangePicker disabled={loading} onChange={null} />
          <Button
            type="primary"
            icon="plus"
            disabled={loading}
            onClick={() => setIsFormVisible(true)}
          >
            Add Menu
          </Button>
        </div>
      </MenuBar>
      <Table
        bordered
        size="middle"
        rowKey="MenuKey"
        columns={columns}
        dataSource={filteredMenuItems}
        onChange={handleTableChange}
        pagination={false}
        loading={loading}
        footer={() => (
          <span>
            <strong>{menuItems.length}</strong>{' '}
            {pluralize('menu', menuItems.length)}
          </span>
        )}
      />
      <CreateMenuFormModal
        isVisible={isFormVisible}
        setVisible={handleSetVisible}
        conceptItems={conceptItems}
        createMenu={handleCreateMenu}
      />
    </div>
  )
}

Menus.propTypes = {
  actions: PropTypes.object,
  loading: PropTypes.bool,
  menuItems: PropTypes.array.isRequired,
  conceptItems: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  loading: state.Menus.loading,
  menuItems: state.Menus.items,
  conceptItems: state.Concepts.items,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...menusActions, ...conceptsActions },
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menus)
