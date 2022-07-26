import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../services/auth/slice";
import userReducer from "../services/user/slice";
import permissionReducer from "../services/permission/slice";
import roleReducer from "../services/role/slice";
import themeReducer from "../services/theme/slice";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  permissions: permissionReducer,
  roles: roleReducer,
  theme: themeReducer,
});
