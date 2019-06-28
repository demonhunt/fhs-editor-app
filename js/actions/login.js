import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'
var md5Hex = require('md5-hex')

function login(username, password): ThunkAction {
  return async (dispatch, getState) => {
    var data = {
      username: username,
      password: md5Hex(password + "fhs")
    };
      
    
    return new Promise ((resolve,reject)=>{dispatch(ApiPost("bookshelf/login", data))
      .then(response => {
        if (response.success === true ) {
          dispatch({
            type: "LOGIN_SUCCESS",
            data: response.data,
          });
          resolve()
        }
        else {
          dispatch({
            type: "LOGIN_FAIL",
            message: response.error,
          })
          reject("loginFail")
        }
      })
    .catch(e=>reject(e))
    })
      ;
  };
}

module.exports = { login }
