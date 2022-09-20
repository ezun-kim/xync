<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">XYNC</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li class="nav-item">
          <!-- <router-link class="nav-link">{{}}</router-link> -->
          <p @click="logout()">{{ user && user.username }}</p>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import AuthService from "@/services/AuthService";
import ResponseData from "@/types/ResponseData";
import store from "@/store";

export default defineComponent({
  name: "App",

  setup() {
    const store = useStore()
    const user = computed(() => store.getters["user/get"])

    return {
      user,
      store
    }
  },

  methods: {
    logout() {
      AuthService.logout()
        .then((response: ResponseData) => {
          if (response.data.user == undefined) {
            store.commit("user/set", null)
            this.$router.push({ name: "login" });
          }
          else {
            alert(response.data.message)
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },

  computed: {
    // name() {
    // return useStore().state.user;
    // }
  },

  data() {
    return {
      n: "dd",
    }
  }
});

</script>
