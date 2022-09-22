import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import store from "@/store";

const needAuth = (flag: boolean) => (from: any, to: any, next: any) => {
  const isAuthenticated = store.getters["isAuthenticated"];
  console.log("isAuthenticated", isAuthenticated)
  if ((isAuthenticated && flag) || (!isAuthenticated && !flag)) {
    return next();
  } else {
    next("/login");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList.vue"),
    beforeEnter: needAuth(true),
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/TutorialDetails.vue"),
    beforeEnter: needAuth(true),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial.vue"),
    beforeEnter: needAuth(true),

    // // 특정 라우팅에 가드가 필요한 경우
    // beforeEnter: function (to, from, next) {
    //   // 인증 값 검증 로직 추가
    // },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
    beforeEnter: needAuth(false),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach");

  if (to.matched.some((routeInfo) => routeInfo.meta.authRequired)) {
    // 인증이 필요한 페이지일 경우 인증 체크
    if (store.getters["isAuthenticated"]) {
      next(); // 페이지 전환
    } else {
      alert("로그인 필요");
    }
  } else {
    next(); // 페이지 전환
  }

  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (localStorage.getItem("userToken") == null) {
  //     next({
  //       path: "/login",
  //       params: { nextUrl: to.fullPath },
  //     });
  //   } else {
  //     if (!store.state.isAuthenticated) {
  //       next({
  //         path: "/login",
  //         params: { nextUrl: to.fullPath },
  //       });
  //     } else {
  //       next();
  //     }
  //   }
  // } else {
  //   next();
  // }
});

export default router;
