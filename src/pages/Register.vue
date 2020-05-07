<template>
  <section>
    <section class="box">
      <h1>Join us!</h1>
      <div class="input-group">
        <label for="Username">Username</label>
        <input
          type="text"
          placeholder="Your username"
          id="Username"
          v-model="username"
        />
        <p
          v-if="showUsernameAlreadyRegisteredError"
          class="alert"
          id="username"
        >
          Username is already registered
        </p>
      </div>
      <div class="input-group">
        <label for="Your password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="Password"
          v-model="password"
        />
      </div>
      <div class="input-group">
        <label for="ConfirmPassword"> Confirm Password </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="ConfirmPassword"
          v-model="confirmedPassword"
        />
        <p v-if="showPasswordDoesntMatchError" class="alert" id="password">
          Password does not match
        </p>
      </div>
      <button type="button" @click="saveNewUser" :disabled="isLoading">
        {{ isLoading ? "Loading" : "Join us" }}
      </button>
      <p class="switchToRegisterOrLogin">
        Already have an account?
        <router-link to="/login" class="link">Log in</router-link>
      </p>
    </section>
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
      confirmedPassword: "",
      showUsernameAlreadyRegisteredError: false,
      showPasswordDoesntMatchError: false,
      isLoading: false
    };
  },
  methods: {
    saveNewUser() {
      this.clearErrors();
      if (
        this.username &&
        this.password &&
        this.confirmedPassword &&
        this.verifyIfPasswordsMatch()
      ) {
        const newUser = {
          name: this.username,
          password: this.password
        };
        this.isLoading = true;
        axios
          .get(`http://localhost:3000/users?name=${this.username}`)
          .then(res => {
            if (res.data.length == 0) {
              axios
                .post("http://localhost:3000/users", newUser)
                .then(res => {
                  this.clearUser();
                  this.clearErrors();
                  this.$router.push({ path: "/login" });
                })
                .catch(error => console.log(error))
                .then(() => {
                  this.isLoading = false;
                });
            } else {
              this.showUsernameAlreadyRegisteredError = true;
              this.isLoading = false;
            }
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
          });
      }
    },
    verifyIfPasswordsMatch() {
      if (this.password == this.confirmedPassword) {
        return true;
      }
      this.showPasswordDoesntMatchError = true;
      return false;
    },
    clearUser() {
      this.username = "";
      this.password = "";
      this.confirmedPassword = "";
    },
    clearErrors() {
      this.showUsernameAlreadyRegisteredError = false;
      this.showPasswordDoesntMatchError = false;
    }
  }
};
</script>
