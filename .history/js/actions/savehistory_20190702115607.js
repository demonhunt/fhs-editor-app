import type { ThunkAction } from './types'

function savehistory(sku,name,status): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVE_HISTORY',
      sku: sku,
      name: name,
      status: status
    })
    
  }
}

module.exports = { savehistory }
