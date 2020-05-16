import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Habit from "./pages/Habit.vue";
import Login from "./pages/Login.vue";
import Logout from "./pages/Logout.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/habit:/id", component: Habit },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (!isPublicRoute(to.path) && !isAuthenticated()) {
    next("/login");
  } else if (isAuthenticated() && isPublicRoute(to.path)) {
    next("/");
  } else {
    next();
  }
});

function isAuthenticated() {
  if (localStorage.layt) return true;
  return false;
}
function isPublicRoute(path) {
  return path == "/login" || path == "/register";
}
export default router;
