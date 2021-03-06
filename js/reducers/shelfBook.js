'use strict'

import type,
 { Action } from '../actions/types'
export type State = {
  bookSheflInfor: ?any,
}

var initialState = {
  bookSheflInfor: [],
  isSuccess : false,
  bookSelected : [],
}

function shelfBook(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SCAN_SHELF_SUCCESS':
      //console.log('dsdddddddddddddddddddddddddddd')
      //console.log(action.data)
      //console.log('reducer scan shelf 2222')
      return {
        ...state,
        bookSheflInfor: action.data,
        isSuccess : true,
      }
      case 'SCAN_SHELF_FAIL':
      return {
        ...state,
        isSuccess : false,
      }
      case 'BOOK_SELECTED_HIGHLIGHT':
      return{
        ...state,
        bookSheflInfor : state.bookSheflInfor.map(item =>{
          if(item.sku != action.sku) return item
          return {...item, isStatus: !item.isStatus}
        })
      }
      case 'BOOK_SELECTED_ADD' :
      //console.log(action.list)
      //console.log(booklist)
      let listFormat = action.list.filter(item =>{
          item.status = true
          return item.isStatus === true
      })
      //console.log(listFormat)
      return{
        ...state,
        bookSelected : listFormat
      }
      case 'BOOK_SELECTED_RESET' :
        return{
          ...state,
          bookSelected : [],
          bookSheflInfor: [],
        }
    default:
      return state
  }
}

module.exports = shelfBook
