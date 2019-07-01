'use strict'

import * as loginActions from './login'
import * as logoutActions from './logout'
import * as scanActions from './scan'
import * as common from './common'
module.exports = {
  ...loginActions,
  ...logoutActions,
  ...common,
  ...scanActions,
}
