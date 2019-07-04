'use strict'

import * as loginActions from './login'
import * as logoutActions from './logout'
import * as scanActions from './scan'
import * as common from './common'
import * as scanShelf from './scanShelf'
import * as changeStatus from './changeStatus';
import * as addListBook from './changeStatus';

module.exports = {
  ...loginActions,
  ...logoutActions,
  ...common,
  ...scanActions,
  ...scanShelf,
  ...changeStatus,
  ...addListBook,
}
