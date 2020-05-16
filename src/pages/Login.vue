<template>
  <box title="Log In">
    <template #title>Nu merge</template>
    <div class="input-group">
      <label for="username">Username</label>
      <input
        type="text"
        placeholder="  Your username"
        id="username"
        v-model="username"
      />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="  Your password"
        id="password"
        v-model="password"
      />
      <p v-if="showUserNotValidError" class="alert">
        username or password not valid
      </p>
    </div>
    <button type="button" @click="login" :disabled="isLoading">
      Log in
    </button>
    <template #footer>
      Don't have an account?
      <router-link to="/register" class="link">Sign up</router-link>
    </template>
  </box>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue";
import axios from "axios";
import Box from "../components/Box.vue";
export default {
  components: { Box },
  data() {
    return {
      username: "",
      password: "",
      showUserNotValidError: false,
      isLoading: false
    };
  },
  methods: {
    login() {
      this.showUserNotValidError = false;
      this.isLoading = true;
      axios
        .get(
          `http://localhost:3000/users?name=${this.username}&password=${this.password}`
        )
        .then(res => {
          if (res.data.length > 0) {
            localStorage.setItem("layt", "jwttoken");
            this.$router.push({ path: "/" });
          } else {
            this.showUserNotValidError = true;
            this.isLoading = false;
          }
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    }
  }
};
</script>
