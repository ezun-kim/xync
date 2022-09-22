import http from "@/http-common";
import store from "@/store";

/* eslint-disable */
class AuthService {
  login(username: String, password: String): Promise<any> {
    // Start login process.
    return new Promise((resolve, reject) => {

      // 1. Request JWT from server
      http
        .post("/auth/requestToken", {username,password})
        .then((res) => {
          // 2. Save JWT
          if (res.status == 200) {
            store.commit("saveToken", {accessToken: res.data})
            resolve(res);
          }
          else {
            reject(res.status)
          }
        })

        // 서버로 부터 JWT받는데 실패
        .catch((error) => {
          console.log("Retrive JWT failed! ", error);
          reject(error);
        })
    })
  }

  logout() {
    store.commit("logout")
    // return new Promise((resolve, reject) => {
    //   http.post("/auth/logout").then((res)=>{
    //     if (res.status == 200) {
    //       store.commit("logout")
    //       resolve(res);
    //     }
    //     else {
    //       reject(res.status)
    //     }
    //   })
    //   .catch((error)=>{
    //     console.log("Logout failed! ", error);
    //     reject(error);
    //   })
    // })
  }

  user(): Promise<any> {
    return http.get("/auth/");
  }
}

export default new AuthService();
