import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Empty = styled.div`
  min-height: 125px;
  background: rgba(0, 0, 0, 0.02);
  padding: 10px 0;
  color: rgba(0, 0, 0, 0.25);
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 0.5rem;
  }
`

const NoImage = () => (
  <Empty>
    <Icon type="file-image" />
    <span>No Image</span>
  </Empty>
)

export { NoImage }
