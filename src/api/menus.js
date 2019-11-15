import request from '../utils/request'

// import { SERVER_URL } from '../utils/serverConfig'

// const auth = {
//   username: 'S4H_UX',
//   password: 'compass00',
// }

const auth = {
  username: 'FRDEMO',
  password: 'france01',
}

// const BASE_URL = `${SERVER_URL}/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV`
const BASE_URL = `/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV`

const menus = {
  get(isActive = true) {
    const params = `$filter=IsActiveEntity eq ${isActive}`
    return request({
      url: `${BASE_URL}/ZC_MenuPlanning?${params}`,
      baseUrl: BASE_URL,
      auth,
      requireAuth: true,
    })
  },

  postMEN(data) {
    return request({
      url: `${BASE_URL}/ZC_MenuPlanning`,
      method: 'POST',
      baseUrl: BASE_URL,
      csrf: true,
      auth,
      requireAuth: true,
      body: data,
    })
  },

  // postMEC(data) {},

  delete(menuId) {
    const keys = `MenuKey=guid'${menuId}',IsActiveEntity=true`
    return request({
      url: `${BASE_URL}/ZC_MenuPlanning(${keys})`,
      method: 'DELETE',
      baseUrl: BASE_URL,
      csrf: true,
      auth,
      requireAuth: true,
    })
  },
}

export { menus }
