import type { ThunkAction } from './types'

function savehistory(array): ThunkAction {
  return (dispatch, getState) => {
    var logscan = getState().book.logscan;
    var newarr = array;
    newarr.map((item,index) => {
      if (logscan.find(obj => obj.sku === item.sku)) {
        index = array.findIndex(obj => obj.sku === item.sku);
        array.splice(index, 1);
      }
      else {
      }
    })
    if (array.length != 0){
      dispatch({
        type: 'SAVE_HISTORY',
        arrayhistory: array
      })
    }
  }
}

module.exports = { savehistory }
