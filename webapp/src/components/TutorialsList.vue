<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial.id">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link
          :to="'/tutorials/' + currentTutorial.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";
import AuthService from "@/services/AuthService";
import store from "@/store";


export default defineComponent({
  name: "tutorials-list",
  // beforeRouteEnter(to, from, next) {
  //   // Login 컴포넌트가 화면에 표시되기 전에 수행될 로직
  //   // Login 컴포넌트는 아직 생성되지 않은 시점
  // },
  // beforeRouteUpdate(to, from, next) {
  //   // 화면에 표시된 컴포넌트가 변경될 때 수행될 로직
  //   // `this`로 Login 컴포넌트를 접근할 수 있음
  // },
  // beforeRouteLeave(to, from, next) {
  //   // Login 컴포넌트를 화면에 표시한 url 값이 변경되기 직전의 로직
  //   // `this`로 Login 컴포넌트를 접근할 수 있음
  // },
  
  // setup() {
  // },
  data() {
    return {
      tutorials: [] as Tutorial[],
      currentTutorial: {} as Tutorial,
      currentIndex: -1,
      title: "",
    };
  },

  methods: {

    retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response: ResponseData) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log("error", e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = {} as Tutorial;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial: Tutorial, index = -1) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.tutorials = response.data;
          this.setActiveTutorial({} as Tutorial);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
    // console.log("mounted")
    // if (store.getters["user/get"].username == '') {
    //   this.$router.push({ name: "login" });
    // }
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
