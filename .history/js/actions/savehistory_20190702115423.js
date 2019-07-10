import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'

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
