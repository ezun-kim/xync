import { Module, createStore } from "vuex";
import { RootState } from "..";

export interface UserState {
    username: string
    password: string
  }

export const user: Module<UserState, RootState> = {
  modules: {
    user : {
      namespaced: true,
      state: () => ({
        user:<UserState> {
          username: "",
          password: ""
        },
      }),
      getters: {
        get: (state)=> state.user,
      },
      mutations: {
        set: (state, payload)=>{
          state.user = payload
          console.log("set state.username : ",state.username)
        }
      }
    }
  }
  };