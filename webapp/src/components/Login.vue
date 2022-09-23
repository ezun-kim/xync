<template>
  <h1>XYNC.</h1>
  <h1>환영합니다</h1>
  <div class="account-select-box" @click="setMode(1)">아티스트 계정으로 로그인</div>
  <div class="account-select-box" @click="setMode(1)">협력사 계정으로 로그인</div>
  <div class="account-select-box" @click="setMode(2)">회원가입</div>
  <div v-if="mode==1">
    <section>
      <!-- <label for="username">Username</label> -->
      <input placeholder="아이디" v-model="currentAuth.username" id="username" name="username" type="text" autocomplete="username" required autofocus>
    </section>
    <section>
      <!-- <label for="current-password">Password</label> -->
      <input placeholder="비밀번호" v-model="currentAuth.password" id="current-password" name="password" type="password" autocomplete="current-password" required>
    </section>
    <button type="submit" @click="login">Sign in</button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

import AuthService from "@/services/AuthService";
// import Auth from "@/types/Auth";
import ResponseData from "@/types/ResponseData";
import store from "@/store";

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore()
  },
  data() {
    return {
      currentAuth: {
        username : "",
        password : ""
      },
      mode: 0,
    };
  },
  methods: {
    setMode(mode:number) {
      this.mode = mode
    },
    login() {
      store.dispatch
      AuthService.login(this.currentAuth.username, this.currentAuth.password)
        .then((response: ResponseData) => {
          if (response.status == 200) {
            console.log("Login success")
            this.$router.push({
              name: "tutorials",
            })
          }
        })
        .catch((e: Error) => {
          alert(e);
          console.log(e);
        });
    },
  },
});
</script>
  
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.account-select-box {
  cursor: pointer;
  border: solid;
  border-color: black;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  /* border */
}
input {
  border: solid;
  border-color: black;
  margin-bottom: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
}
</style>
  