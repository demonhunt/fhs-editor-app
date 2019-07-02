'use strict'

import type { Action } from '../actions/types'
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
        logscan: [...state.logscan, 
          {
            sku: action.sku,
            name: action.name,
            flag: true
          }]
      }
      case 'SCAN_FAIL':
      return {
        ...state,
        logscan: [...state.logscan, 
          {
            sku: action.sku,
            name: '',
            flag: false
          }]
      }
    default:
      return state
  }
}

module.exports = book
