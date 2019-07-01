import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'

function scan(sessionId,bookstoreId,sku): ThunkAction {
  return async (dispatch, getState) => {
    var data = {
        sessionId: sessionId,
        bookstoreId: bookstoreId,
        sku: sku,
        bundleId: 0,
    }
    var tamp = dispatch(ApiPost("bookshelf/product/scan", data));
    
    return new Promise ((resolve,reject) => {dispatch(ApiPost("bookshelf/product/scan", data)).then(function(response) {
      //console.log("o day ne ma"); 
      //console.log(response.data.sku);
      if (response.data.entity_id) {
        dispatch({
          type: "SCAN_SUCCESS",
          data: response.data,
          sku: response.data.sku
        });
        resolve("scansuccess")
        }
        else {
          dispatch({
            type: "SCAN_FAIL",
            sku: response.data.sku
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
