import request from '../utils/request'

const auth = {
  username: 'FRDEMO',
  password: 'france01',
}

const BASE_URL = `/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV`

const planner = {
  getRecipes(menuKey) {
    const keys = `MenuKey=guid'${menuKey}',IsActiveEntity=true`
    return request({
      url: `${BASE_URL}/ZC_MenuPlanning(${keys})/to_Item`,
      baseUrl: BASE_URL,
      csrf: false,
      auth,
      requireAuth: true,
    })
  },
}

export { planner }
