import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'

function savehistory(): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVE_HISTORY',
      sku: response.data.sku,
      name: response.data.name,
    })
    
  }
}

module.exports = { savehistory }
