import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../services/Auth/slice";
import userReducer from "../services/User/slice";
import permissionReducer from "../services/Permission/slice";
import roleReducer from "../services/Role/slice";
import themeReducer from "../services/Theme/slice";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  permissions: permissionReducer,
  roles: roleReducer,
  theme: themeReducer,
});
