import jwtDecoder from "jwt-decode";

const tokenKey = "token";

export function getItem(key) {
  return localStorage.getItem(key);
}

export function setItem(key, item) {
  localStorage.setItem(key, item);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function setToken(token) {
  setItem(tokenKey, token);
}

export function getToken() {
  return getItem(tokenKey);
}

export function removeToken() {
  removeItem(tokenKey);
}

export function getDecodedToken() {
  const token = getToken();
  if (!token) return false;
  const decode = jwtDecoder(token, { complete: true });

  if (new Date(decode.exp) * 1000 > new Date().getTime()) {
    return decode;
  }
  return false;
}

export function hasPermission(...permissions) {
  const decode = getDecodedToken();
  if (!decode) return false;
  return permissions.every((permission) =>
    decode.data.permissions.find(
      (rolePermission) => rolePermission === permission
    )
  );
}

export function getLoggedInUser() {
  const decode = getDecodedToken();
  if (!decode) return false;
  return decode.data;
}
