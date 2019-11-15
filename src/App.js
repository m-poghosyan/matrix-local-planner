import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
// import frFR from 'antd/lib/locale-provider/fr_FR'
// import ptPT from 'antd/lib/locale-provider/pt_PT'
import Layout from './layouts/default'
import store from './store'

import './styles/global.less'

function App() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={enGB}>
        <Router>
          <Layout showMenu />
        </Router>
      </LocaleProvider>
    </Provider>
  )
}

export default App
