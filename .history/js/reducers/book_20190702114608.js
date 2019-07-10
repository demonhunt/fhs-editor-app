'use strict'

import typeimport { STATUS_CODES } from "http";
 { Action } from '../actions/types'
export type State = {
  bookInfor: ?any,
}

var initialState = {
  bookInfor: {},
  logscan: [{
    sku: '',
    name: '',
    flag: false,
  }]
}

function book(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SCAN_SUCCESS':
      return {
        ...state,
        bookInfor: action.data,
      }
      case 'SCAN_FAIL':
      return {
        ...state,
      }
      case 'SAVE_HISTORY':
      return {
        ...state,
        logscan: [...state.logscan, 
          {
            sku: action.sku,
            name: action.name,
            flag: true
          }]
      }
    default:
      return state
  }
}

module.exports = book
