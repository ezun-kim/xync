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
          <p @click="logout()">
          {{ isAuthenticated ? "로그인됨" : "로그인 안됨" }}</p>

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
import { useStore,mapGetters } from "vuex";
import AuthService from "@/services/AuthService";

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

  computed: {
      ...mapGetters(["isAuthenticated"]),
    },

  methods: {
    logout() {
      AuthService.logout()
      this.$router.push({name:"login"})
    }
  },

  data() {
    return {
    }
  }
});

</script>
