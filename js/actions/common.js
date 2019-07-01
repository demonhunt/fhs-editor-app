import Toast from 'react-native-root-toast'
import type { ThunkAction } from './types'

function showToast(
  message = 'Đã có lỗi xảy ra, vui lòng thử lại!',
  background = 'red',
  textcolor = 'white',
  position = 300,
): ThunkAction {
  return async (dispatch, getState) => {
    {
      Toast.show(message, {
        style: { zIndex: 1000 },
        duration: Toast.durations.SHORT,
        position: position,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: background,
        textColor: textcolor,
        textStyle: { fontSize: 20, fontWeight: 'bold' },
      })
    }
  }
}

module.exports= {showToast}