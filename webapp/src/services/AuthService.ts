import http from "@/http-common";

/* eslint-disable */
class AuthService {
  login(username : String, password : String): Promise<any> {
    return http.post("/auth/", {username, password});
  }

  logout(): Promise<any> {
    return http.post("/auth/logout")
  }
}

export default new AuthService();
