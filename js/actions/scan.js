import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'
import langvi from '../common/langvi'

function dataFormat(data){
  let listValue = Object.values(data);
  let listKey = Object.keys(data);
  let temp = []
  for(let i in listValue){
    if(listValue[i]!= null && listKey[i] != "image"){
      temp[listKey[i]] = listValue[i]
    }
  }
  return Object.keys(temp).reduce((array, key) => {
      return [...array, { [key] : temp[key], vi : langvi['product'][key] }, ]
  }, [])
}
function scan(sessionId,sku): ThunkAction {
  return async (dispatch, getState) => {
    var data = {
        sessionId: sessionId,
        sku: sku,
    }
    return new Promise ((resolve,reject) => {dispatch(ApiPost("editor/scanbook", data)).then(function(response) {
      if (response.data.entity_id) { 
        let finalData = dataFormat(response.data)
        //console.log(finalData)
        //console.log(response.data)
        dispatch({
          type: "SCAN_SUCCESS",
          data: finalData,
        });
        dispatch({
          type: "IMAGE_SUCCESS",
          imageBook: response.data.image,
        });
        resolve("scansuccess")
        
        }
        else {
          dispatch({
            type: "SCAN_FAIL",
          });
          reject("scanfail")
        }
      })
    .catch(e=>reject(e))
    }
    )
      ;
  };
}

module.exports = { scan }
