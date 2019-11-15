import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout, PageHeader } from 'antd'
import { withRouter } from 'react-router-dom'

import { RouterView } from '../components/RouterView'
import routes from '../routes'

const { Content } = Layout

const ContentWrapper = styled.div`
  .pageHeaderWrap {
    float: right;
  }
`

const InnerContent = styled.div`
  min-height: calc(100vh - 156px);
  padding: 24px;
`

const StyledContent = styled(Content)`
  margin: 16px;
  background: white;
`

const getTitle = ({ pathname }) => {
  const route = routes.find(r => r.path === pathname)
  return route ? route.title : 'Hi'
}

const DefaultLayout = withRouter(({ showMenu, location, history }) => {
  const [subtitle, setSubtitle] = useState(null)
  const [headerContent, setheaderContent] = useState(null)
  const [headerExtra, setHeaderExtra] = useState(null)

  const handleSubTitle = text => setSubtitle(text)
  const handleHeaderContent = content => setheaderContent(content)
  const handleHeaderExtra = content => setHeaderExtra(content)

  const title = getTitle(location)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {showMenu && <RouterView name="menu" title="Local Planner" />}
      <ContentWrapper
        style={{
          marginTop: 64,
        }}
      >
        <PageHeader
          onBack={() => {
            history.goBack()
          }}
          title={title}
          subTitle={subtitle}
          extra={headerExtra}
          style={{
            marginBottom: 16,
          }}
        >
          {headerContent}
        </PageHeader>

        <StyledContent>
          <InnerContent>
            <RouterView
              name="main"
              subTitle={handleSubTitle}
              headerContent={handleHeaderContent}
              headerExtra={handleHeaderExtra}
            />
          </InnerContent>
        </StyledContent>
      </ContentWrapper>
    </Layout>
  )
})

DefaultLayout.propTypes = {
  showMenu: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default DefaultLayout
