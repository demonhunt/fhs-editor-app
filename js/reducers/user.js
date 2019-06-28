'use strict'

import type { Action } from '../actions/types'
import Models from '../common/Models/Models'

export type State = {
  isLogin: boolean,
  userInfor: ?any,
}

var initialState = {
  success: false,
  isLogin: false,
  userInfor: {},
  message: '',
  useCamera:true
}

function user(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
        console.log("tui dung");
      return {
        ...state,
        success: true,
        isLogin: true,
        userInfor: action.data,
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        success: false,
        message: action.message,
        isLogin: false,
      }
    case 'LOGOUT_SUCCESS':
     
      return {
        ...state,
        isLogin: false,
      }
    case 'LOGIN_AGAIN_SUCCESS':
    
      return {
        ...state,
    
      }
   
    default:
      return state
  }
}

module.exports = user
