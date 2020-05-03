<template>
  <section class="box">
    <h1>Log in</h1>
    <label for="username">Username</label>
    <input
      type="text"
      placeholder="  Your username"
      id="username"
      v-model="username"
    />
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
    <button type="button" @click="login" :disabled="isLoading">
      Log in
    </button>
    <p class="register">
      Don't have an account?
      <router-link to="/register" class="link">Sign up</router-link>
    </p>
  </section>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      showUserNotValidError: false,
      isLoading: false,
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
        .then((res) => {
          if (res.data.length > 0) {
            this.$router.push({ path: "/" });
          } else {
            this.showUserNotValidError = true;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.box {
  width: 450px;
  height: 550px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  color: black;
  padding-top: 80px;
  font-size: 20px;
  border-radius: 10px;
  font-family: "Open Sans", cursive;
}
.register {
  text-align: center;
  font-size: smaller;
}
.alert {
  font-size: small;
  color: #eb424f;
  margin-bottom: 15px;
  margin-left: 60px;
}
h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: bold;
}
input {
  display: block;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 330px;
  height: 40px;
  background-color: transparent;
  border: 2px solid #eaeced;
  border-radius: 5px;
  font-family: "Open Sans", cursive;
}
label {
  margin-top: 20px;
  display: block;
  margin-left: 60px;
  font-size: smaller;
}
button {
  height: 50px;
  width: 330px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  display: block;
  border-radius: 30px;
  text-align: center;
  font-weight: bold;
  font-size: large;
  color: white;
  background-color: #eb424f;
  border-color: transparent;
  transition-duration: 0.4s;
}
button:hover {
  background-color: #de434f;
  cursor: pointer;
}
.link {
  color: #eb424f;
  text-decoration: none;
}
</style>
