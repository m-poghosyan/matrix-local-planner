import request from '../utils/request'

import { setConceptFilter } from '../helpers/filters'
// import { SERVER_URL } from '../utils/serverConfig'

const auth = {
  username: 'S4H_UX',
  password: 'compass00',
}

// const BASE_URL = `${SERVER_URL}/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV`
const BASE_URL = `/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV`

const concepts = {
  async get(conceptType = 'MEN') {
    let params = ''
    params = `$filter=${setConceptFilter(conceptType)}`

    return request({
      url: `${BASE_URL}/ZC_CONCEPT?${params}`,
      baseUrl: BASE_URL,
      auth,
      csrf: false,
      requireAuth: true,
    })
  },
}

export { concepts }
