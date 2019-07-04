'use strict';

import {combineReducers} from 'redux';

 const appReducer = combineReducers({
  user: require('./user'),
  book: require('./book'),
  chooseDatabase: require('./chooseDatabase'),
  shelfBook : require('./shelfBook'),

})


const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    const {user,chooseDatabase} = state
    state = {user, chooseDatabase}
  }

  return appReducer(state, action)
}



export default rootReducer