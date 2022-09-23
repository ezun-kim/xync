import { Module, createStore } from "vuex";
import { RootState } from "..";

export interface UserState {
    username: string
    password: string
    name: string
    company_name: string
    role: string
    email_auth: boolean
    email: string
  }

const savedUser = window.localStorage.getItem("User")

export const user: Module<UserState, RootState> = {
  modules: {
    user : {
      namespaced: true,
      state: () => ({
        user:<UserState> {...savedUser ? JSON.parse(savedUser) : null},
      }),
      getters: {
        get: (state)=> state.user,
      },
      mutations: {
        set: (state, payload)=>{
          state.user = payload
          state.user && console.log("set state.username : ", state.user.username)
          window.localStorage.setItem("User", JSON.stringify(payload))
        }
      }
    }
  }
  };