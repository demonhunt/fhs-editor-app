import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'

function changeStatus(sku): ThunkAction {
  return (dispatch, getState) => {
    //console.log('action chagne staus', sku)
    dispatch({
        type: 'BOOK_SELECTED_HIGHLIGHT',
        sku : sku
      })
  }
}

function addListBook(list): ThunkAction {
  return (dispatch, getState) => {
    //console.log('action chagne staus', list)
    dispatch({
        type: 'BOOK_SELECTED_ADD',
        list : list
      })
  }
}

function resetListBook(): ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'BOOK_SELECTED_RESET'
    })
  }
}

module.exports = { changeStatus, addListBook, resetListBook}