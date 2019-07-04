import type { ThunkAction } from './types'
import { ApiPost } from './apiFetcher'

function scanShelf(sessionId,bookstoreId,bookshelfId): ThunkAction {
  return async (dispatch, getState) => {
    var data = {
        sessionId: sessionId,
        bookstoreId: bookstoreId,
        bookshelfId: bookshelfId,
    }
    //console.log("action scan shelf")
    return new Promise ((resolve,reject) => {dispatch(ApiPost("bookshelf/listproduct", data))
    .then(function(response) { 
      //console.log(response.data);
      if (response.bookshelfEntityId) {
        response.data = response.data.map(item=>{
          item.isStatus = false 
          return item
        })
        //console.log(response.data);
        dispatch({
          type: "SCAN_SHELF_SUCCESS",
          data: response.data,
        });
        resolve("scanShelfSuccess")
        }
        else {
          dispatch({
            type: "SCAN_SHELF_FAIL",
          });
          reject("scanShelfFail")
        }
      })
    .catch(e=>reject(e))
    }
    )
  };
}



module.exports = { scanShelf}
