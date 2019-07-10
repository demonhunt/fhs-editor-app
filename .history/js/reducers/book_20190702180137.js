'use strict'

import type { Action } from '../actions/types'

var initialState = {
  bookInfor: {},
  logscan: []
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
      console.log(state.logscan);
      return {
        logscan: state.logscan.concat(action.arrayhistory)
      }
    default:
      return state
  }
}

module.exports = book
