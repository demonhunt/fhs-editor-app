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
        //console.log("o day");
        //console.log(response.success);
        if (response.success === true ) {
          dispatch({
            type: "LOGIN_SUCCESS",
            data: response.data,
          });
          resolve("loginSuccess")
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
