import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Button, Form, InputNumber } from 'antd'

const EditFormCard = styled(Card)`
  width: 250px;
  display: relative;
  transition: all 400ms ease;

  .title {
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;

    a {
      color: black;

      &:hover {
        color: #40a9ff;
      }
    }
  }
`

function EditForm({ title, quantity, style, onSave, onCancel }) {
  return (
    <EditFormCard
      hoverable
      size="small"
      style={style}
      actions={[
        <Button type="default" onClick={onSave}>
          Save
        </Button>,
        <Button type="danger" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <div className="title">{title}</div>

      <Form layout="inline" onSubmit={null}>
        <Form.Item label="Quantity">
          <InputNumber
            style={{ width: '58px' }}
            size="small"
            min={1}
            defaultValue={quantity}
            // onChange={onQuantityChange}
          />
        </Form.Item>
      </Form>
    </EditFormCard>
  )
}

EditForm.propTypes = {
  title: PropTypes.object || PropTypes.string,
  quantity: PropTypes.number || PropTypes.string,
  style: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default EditForm
