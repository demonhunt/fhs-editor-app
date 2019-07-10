'use strict'

import type { Action } from '../actions/types'
export type State = {
  bookInfor: ?any,
}

var initialState = {
  bookInfor: {},
  logscan: [{
    sku: '',
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
            flag: true
          }]
      }
      case 'SCAN_FAIL':
      return {
        ...state,
        logscan: [...state.logscan, 
          {
            sku: action.sku,
            flag: false
          }]
      }
      case 'SAVE_HISTORY':
      return {
        ...state,
        logscan: [...state.logscan, 
          {
            sku: action.sku,
            name: action.name,
            status: action.status
          }]
      }
    default:
      return state
  }
}

module.exports = book
