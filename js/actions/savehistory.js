import type { ThunkAction } from './types'

function savehistory(array): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVE_HISTORY',
      arrayhistory: array
    })
  }
}

module.exports = { savehistory }
