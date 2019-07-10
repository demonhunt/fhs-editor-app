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
        bookInfor: action.data,
      }
      case 'SCAN_FAIL':
      return {
      }
      case 'SAVE_HISTORY':
      return {
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
