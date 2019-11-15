import { createAction } from 'redux-actions'
import { message } from 'antd'

import { menus } from '../../api'

// ----- Actions --------------------

export const fetchMenusRequest = createAction('MENUS_FETCH_REQUEST')
export const fetchMenusResponse = createAction('MENUS_FETCH_RESPONSE')
export const fetchMenusFailed = createAction('MENUS_FETCH_FAILED')
export const createMenuResponse = createAction('MENUS_CREATE_RESPONSE')
export const deleteMenuResponse = createAction('MENUS_DELETE_RESPONSE')

// ----- Side Effects --------------------

export const fetchMenus = () => dispatch => {
  dispatch(fetchMenusRequest())
  return menus.get().then(response => {
    if (response) {
      const data = response.d.results
      if (data) {
        dispatch(fetchMenusResponse(data))
      } else {
        message.error('Network Error')
        dispatch(fetchMenusFailed())
      }
    }
  })
}

export const createMenuMEN = data => dispatch => {
  dispatch(fetchMenusRequest())
  return menus.postMEN(data).then(response => {
    if (response) {
      // Refresh Menu Data
      // dispatch(fetchMenus())
      dispatch(createMenuResponse())
    } else {
      message.error('Network Error')
      dispatch(fetchMenusFailed())
    }
  })
}

export const deleteMenu = menuId => dispatch => {
  dispatch(fetchMenusRequest())
  return menus.delete(menuId).then(response => {
    if (response) {
      dispatch(deleteMenuResponse(menuId))
    } else {
      message.error('Network Error')
      dispatch(fetchMenusFailed())
    }
  })
}
