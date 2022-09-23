const ID_TOKEN_KEY = "xYnC1@3$";

export const getToken = (): string => {
  const saved = window.localStorage.getItem(ID_TOKEN_KEY);
  const token: string = saved && JSON.parse(saved);
  return token;
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(token));
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
};
