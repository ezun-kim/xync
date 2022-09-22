import { createStore, Module } from "vuex";
import { user, UserState } from "@/store/modules/user";
import http from "@/http-common";
import jwt from "../jwt";

export interface RootState {
  User: UserState;
}

export interface AuthState {
  count: 0;

  isAuthenticated: boolean;
  token: AccessToken;
}

export interface AccessToken {
  accessToken: string;
}

export const root = {
  state: () => ({
    count: 0,
    token: {
      accessToken: jwt.getToken(),
    },
    isAuthenticated: !!jwt.getToken(),
  }),
  mutations: {
    logout: function (state: AuthState, payload = {}) {
      state.token.accessToken = "";
      state.isAuthenticated = false;
      jwt.destroyToken();
    },
    saveToken: function (state: AuthState, payload: AccessToken) {
      console.log("Saving token : ", payload.accessToken);

      state.token.accessToken = payload.accessToken;
      state.isAuthenticated = true;
      jwt.saveToken(payload.accessToken);
    },
  },

  actions: {
    // logout: (context, payload) => {
    //     return new Promise(resolve => {
    //       setTimeout(function () {
    //         context.commit("logout", payload)
    //         resolve({})
    //       }, 1000)
    //     })
    //   },
    //   register: function (context, payload) {
    //     let params = {
    //       email: payload.email,
    //       password: payload.password,
    //       name: payload.name,
    //     }
    //     return new Promise((resolve, reject) => {
    //       http
    //         .post("/api/sample/register", params)
    //         .then(response => {
    //           const { data } = response
    //           context.commit("login", {
    //             accessToken: data.accessToken,
    //           })

    //           resolve(response)
    //         })
    //         .catch(error => {
    //           reject(error)
    //         })
    //     })
    //   },
    login: (context: any, payload: any) => {
      console.log("actions login");
    },
  },
  getters: {
    getAccessToken: (state: AuthState) => {
      return state.token.accessToken;
    },
    isAuthenticated: (state: AuthState) => {
      return state.isAuthenticated;
    },
  },
};

export default createStore({
  modules: {
    root,
    user,
  },
});
