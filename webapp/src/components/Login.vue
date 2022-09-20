<template>
    <h1>Sign in</h1>
<form action="/login/password" method="post">
    <section>
        <label for="username">Username</label>
        <input id="username" name="username" type="text" autocomplete="username" required autofocus>
    </section>
    <section>
        <label for="current-password">Password</label>
        <input id="current-password" name="password" type="password" autocomplete="current-password" required>
    </section>
    <button type="submit">Sign in</button>
</form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import TutorialDataService from "@/services/TutorialDataService";
  import Tutorial from "@/types/Tutorial";
  import ResponseData from "@/types/ResponseData";
  
  export default defineComponent({
    name: "login",
    data() {
      return {

      };
    },
    methods: {
    
    },
  });
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  