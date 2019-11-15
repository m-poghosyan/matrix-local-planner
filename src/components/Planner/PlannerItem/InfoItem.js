import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Tooltip } from 'antd'

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .label {
    color: #a9a9a9;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
  }

  .value {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: 'inherit';

    ${props =>
      props.positive &&
      css`
        color: #389e0d;
      `}

    ${props =>
      props.negative &&
      css`
        color: #f5222d;
      `}
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content {
    display: flex;
    justify-content: center;

    .unit {
      margin-left: 1px;
      margin-top: 5px;
      color: #a9a9a9;
      font-size: 11px;
      font-weight: 700;
    }
  }
`

const InfoItem = ({ label, title, unit, positive, negative, children }) => (
  <InfoWrapper positive={positive} negative={negative}>
    <Tooltip placement="top" title={title}>
      <div className="content-wrapper">
        <div className="content">
          <div className="value">{children}</div>
          {unit && <div className="unit">{unit}</div>}
        </div>
        <div className="label">{label}</div>
      </div>
    </Tooltip>
  </InfoWrapper>
)

InfoItem.propTypes = {
  label: PropTypes.string,
  unit: PropTypes.string,
  title: PropTypes.string,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  children: PropTypes.node,
}

export { InfoItem }
