<template>
  <section>
    <section class="box">
      <h1>Join us!</h1>
      <label for="Username">Username</label>
      <input
        type="text"
        placeholder="Your username"
        id="Username"
        v-model="username"
      />
      <p v-if="showUsernameAlreadyRegisteredError" class="alert" id="username">
        Username is already registered
      </p>
      <label for="Your password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="Password"
        v-model="password"
      />
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
      <button type="button" @click="saveNewUser" :disabled="isLoading">
        {{ isLoading ? "Loading" : "Join us" }}
      </button>
      <p class="login">
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
<style scoped>
.box {
  width: 450px;
  height: 550px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding-top: 80px;
  font-size: 20px;
  border-radius: 10px;
  font-family: "Open Sans", cursive;
}
.login {
  text-align: center;
  font-size: smaller;
}
.alert {
  font-size: small;
  color: #eb424f;
  margin-left: 60px;
}
h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: bold;
}
label {
  display: block;
  margin-left: 60px;
  margin-top: 20px;
  font-size: smaller;
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
