import http from "@/http-common";

/* eslint-disable */
class AuthService {
  login(username : String, password : String): Promise<any> {
    return http.post("/auth/", {username, password});
  }
}

export default new AuthService();
