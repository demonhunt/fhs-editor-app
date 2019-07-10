import type { ThunkAction } from "./types";
import Setting from "../common/setting";
const axios = require("axios");
URL = "http://192.168.1.157:88/"
function ApiPost(url,data) : ThunkAction {
  return (dispatch,getState) =>{
    return new Promise((resolve,reject)=>{
      fetch(URL+url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
  }).then(res => {
    resolve(res.json())}
    )
  .catch(e=> {
    reject(e)
  })
  ;
  }
)
}
}

module.exports = { ApiPost };
