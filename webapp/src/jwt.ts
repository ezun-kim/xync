import { AccessToken } from "./store"

const ID_TOKEN_KEY = "xYnC1@3$"

export const getToken = ():AccessToken => {
  const string = window.localStorage.getItem(ID_TOKEN_KEY)
  const token:AccessToken = string && JSON.parse(string).accessToken
  console.log("getToken:", token)
  return token
}

export const saveToken = (token:AccessToken) => {
  console.log("saveToken:", JSON.stringify(token))
  window.localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(token))
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

export default {
  getToken,
  saveToken,
  destroyToken,
}