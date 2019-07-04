import type { ThunkAction } from './types'

function deleteItem(index): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'DELETE_ITEM',
      index: index
    })
  }
}

module.exports = { deleteItem }
