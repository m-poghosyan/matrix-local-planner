import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Badge, Tabs, Tag, Tooltip } from 'antd'
import { NoImage } from '../../NoImage'
import EditForm from './EditForm'
import Actions from './Actions'
import { InfoItem } from './InfoItem'
import { QuantityButtons } from './QuantityButtons'

const { Meta } = Card
const { TabPane } = Tabs

const ItemCard = styled(Card)`
  width: 250px;
  display: relative;
  transition: all 400ms ease;

  .ant-card-actions > li > span:hover .deleteIcon {
    color: red;
  }

  .coverWrapper {
    position: relative;
    user-select: none;

    &:hover {
      img {
        transition: filter 0.4s cubic-bezier(0.43, 0.41, 0.22, 0.91);
        filter: saturate(10%);
      }
    }
  }

  img {
    width: 100%;
    height: 125px;
    object-fit: cover;
    user-select: none;
  }

  .meta {
    position: relative;

    .title {
      a {
        color: black;

        &:hover {
          color: #40a9ff;
        }
      }
    }
  }

  .info {
    margin: 2px -12px -6px -12px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  .isOrphan {
    color: #380406;
  }

  .orphanTag {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    background: #f15656db;
    padding: 2px 6px;
    border-radius: 0 2px 0 0;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 10;
  }

  .tabs {
    margin: -12px -12px -12px -12px;

    .ant-tabs-bar {
      margin-bottom: 0;
    }
  }
`

const TabContent = styled.div`
  padding: 12px;
`

const ContentWrapper = styled.div`
  .tags {
    margin-bottom: 0.75rem;
  }
`

const PlannerItem = ({
  loading = true,
  title,
  image,
  recipeUrl = '',
  showImage = true,
  isOrphan = false,
  isVegan,
  isFrozen,
  quantity,
  revenue,
  cost,
  grossProfit,
  onDeleteClick,
  onDuplicateClick,
  onQuantityIncrease,
  onQuantityDecrease,
}) => {
  const [editMode, setEditMode] = useState(false)

  const renderMetaContent = (
    <ContentWrapper>
      <div className="tags">
        {isVegan && <Tag color="green">Vegan</Tag>}
        {isFrozen && <Tag color="blue">Frozen</Tag>}
      </div>
    </ContentWrapper>
  )

  const renderTitle = isOrphan ? (
    <Badge
      status="error"
      text={
        <a
          className="isOrphan"
          href={recipeUrl}
          style={{ fontSize: '18px', fontWeight: '600' }}
        >
          {title}
        </a>
      }
    />
  ) : (
    <a href={recipeUrl} style={{ fontSize: '18px', fontWeight: '600' }}>
      {title}
    </a>
  )

  const renderImage = () => {
    if (showImage) {
      return image ? (
        <Fragment>
          <QuantityButtons
            onIncrease={onQuantityIncrease}
            onDecrease={onQuantityDecrease}
          />
          <img alt="" src={image} />
        </Fragment>
      ) : (
        <Fragment>
          <QuantityButtons
            onIncrease={onQuantityIncrease}
            onDecrease={onQuantityDecrease}
          />
          <NoImage />
        </Fragment>
      )
    }
    return null
  }

  const renderCover = !loading && (
    <div className="coverWrapper">
      {isOrphan && showImage && (
        <Tooltip placement="bottom" title="Item is Orphan">
          <div className="orphanTag">Orphan</div>
        </Tooltip>
      )}

      <div className="imageWrapper">{renderImage()}</div>
    </div>
  )

  const content = (
    <div className="info">
      <InfoItem label="Qnt" title="Quantity">
        {quantity}
      </InfoItem>
      <InfoItem label="Rev" unit="£" title="Revenue">
        {revenue}
      </InfoItem>
      <InfoItem label="Cost" unit="£" title="Cost">
        {cost}
      </InfoItem>
      <InfoItem
        label="GP"
        unit="%"
        title="Gross Profit"
        positive={grossProfit > 0}
        negative={grossProfit < 0}
      >
        {grossProfit}
      </InfoItem>
    </div>
  )

  return (
    <Fragment>
      {editMode ? (
        <EditForm
          title={renderTitle}
          quantity={quantity}
          onSave={() => setEditMode(false)}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <ItemCard
          loading={loading}
          size="small"
          actions={Actions({
            onEdit: () => setEditMode(true),
            onDelete: onDeleteClick,
            onDuplicate: onDuplicateClick,
          })}
          cover={renderCover}
        >
          <Tabs className="tabs" defaultActiveKey="info" size="small">
            <TabPane tab="Info" key="info">
              <TabContent>
                <Meta
                  className="meta"
                  title={<div className="title">{renderTitle}</div>}
                  description={renderMetaContent}
                />
                {content}
              </TabContent>
            </TabPane>
            <TabPane tab="Portions" key="portions">
              <TabContent>Portions Section if any...</TabContent>
            </TabPane>
          </Tabs>
        </ItemCard>
      )}
    </Fragment>
  )
}

PlannerItem.propTypes = {
  loading: PropTypes.bool,
  showImage: PropTypes.bool,
  isOrphan: PropTypes.bool,
  isFrozen: PropTypes.bool,
  isVegan: PropTypes.bool,
  title: PropTypes.string,
  image: PropTypes.string,
  recipeUrl: PropTypes.string,
  quantity: PropTypes.number || PropTypes.string,
  revenue: PropTypes.number || PropTypes.string,
  cost: PropTypes.number || PropTypes.string,
  grossProfit: PropTypes.number || PropTypes.string,
  onQuantityIncrease: PropTypes.func,
  onQuantityDecrease: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDuplicateClick: PropTypes.func,
}

export default PlannerItem
