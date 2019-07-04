'use strict'

import type { Action } from '../actions/types'

var initialState = {
  bookInfor: {},
  logscan: []
}

function book(state = initialState, action: Action): State {
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
        logscan: state.logscan.concat(action.arrayhistory)
      }
    case 'DELETE_ITEM':
      return {
        logscan: [
          ...state.logscan.slice(0, action.index),
          ...state.logscan.slice(action.index + 1)
      ]
      }
    default:
      return state
  }
}

module.exports = book
