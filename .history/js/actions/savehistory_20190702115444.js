import type { ThunkAction } from './types'

function savehistory(sku,name): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVE_HISTORY',
      sku: sku,
      name: name,
    })
    
  }
}

module.exports = { savehistory }
