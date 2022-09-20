<template>
  <h1>Sign in</h1>
  <div>
    <section>
      <label for="username">Username</label>
      <input v-model="currentAuth.username" id="username" name="username" type="text" autocomplete="username" required autofocus>
    </section>
    <section>
      <label for="current-password">Password</label>
      <input v-model="currentAuth.password" id="current-password" name="password" type="password" autocomplete="current-password" required>
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
        username : "admin",
        password : "1234"
      },
    };
  },
  methods: {
    login() {
      AuthService.login(this.currentAuth.username, this.currentAuth.password)
        .then((response: ResponseData) => {
          // console.log(response);
          if (response.data.user != undefined) {
            store.commit("user/set", response.data.user)
            this.$router.push({ name: "tutorials" });
          }
          else {
            alert(response.data.message)
          }
          
          // this.$router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
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
</style>
  