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
    
    return new Promise ((resolve,reject) => {dispatch(ApiPost("bookshelf/product/scan", data)).then(function(response) {
      if (response.data.entity_id) {
        dispatch({
          type: "SCAN_SUCCESS",
          data: response.data,
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
