import React, { useState } from 'react'
import PropTypes from 'prop-types'
import startOfWeek from 'date-fns/start_of_week'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'

import { convertToJsonODataDate } from '../../utils/dates'

const { RangePicker, WeekPicker } = DatePicker
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const CreateMenuForm = ({
  conceptItems,
  isVisible,
  setVisible,
  createMenu,
  form,
}) => {
  const [conceptType, setConceptType] = useState(null)

  const submitForm = values => {
    if (conceptType === 'MEN') {
      const SITE = 'F000' // ? Don't hardcode this...
      const { concept, description, dates } = values
      const start = convertToJsonODataDate(dates[0])
      const end = convertToJsonODataDate(dates[1])

      const formData = {
        DateFrom: start,
        DateTo: end,
        Concept: concept,
        SiteID: SITE,
        Description: description,
        MenuType: conceptType,
        IsActiveEntity: true,
      }
      createMenu(conceptType, formData)
    } else if (conceptType === 'MEC') {
      const { concept, description, week } = values
      const monday = startOfWeek(week, { weekStartsOn: 1 })
      createMenu(conceptType, { concept, description, monday })
    }
    setVisible(false)
  }

  const handleConceptChange = value => {
    const concept = conceptItems.find(item => item.conceptoffer === value)
    setConceptType(concept.concepttype)
  }

  const handleSubmit = event => {
    event.preventDefault()
    form.validateFields((err, values) => {
      if (!err) submitForm(values)
    })
  }

  const { getFieldDecorator } = form

  return (
    <Modal
      title="Create New Menu"
      centered
      visible={isVisible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input your description!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Concept">
          {getFieldDecorator('concept', {
            initialValue: [''],
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please select the menu concept!',
              },
            ],
          })(
            <Select onChange={handleConceptChange}>
              {conceptItems.map(concept => (
                <Option value={concept.conceptoffer} key={concept.conceptoffer}>
                  {concept.short_description} - {concept.conceptoffer}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        {(conceptType === null || conceptType === 'MEN') && (
          <Form.Item label="Date Range">
            {getFieldDecorator('dates', {
              rules: [
                {
                  required: true,
                  message: 'Please select the date range!',
                },
              ],
            })(<RangePicker disabled={!conceptType} />)}
          </Form.Item>
        )}

        {conceptType === 'MEC' && (
          <Form.Item label="Week">
            {getFieldDecorator('week', {
              rules: [
                {
                  required: true,
                  message: 'Please select the desired week!',
                },
              ],
            })(<WeekPicker disabled={!conceptType} />)}
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

CreateMenuForm.propTypes = {
  conceptItems: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createMenu: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

const CreateMenuFormModal = Form.create({ name: 'createmenu' })(CreateMenuForm)

export { CreateMenuFormModal }
