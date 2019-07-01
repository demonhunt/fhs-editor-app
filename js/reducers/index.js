'use strict';

import {combineReducers} from 'redux';

 const appReducer = combineReducers({
  user: require('./user'),
  book: require('./book'),
  chooseDatabase: require('./chooseDatabase'),

})


const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    const {user,chooseDatabase,book} = state
    state = {user,chooseDatabase,book}
  }

  return appReducer(state, action)
}



export default rootReducer