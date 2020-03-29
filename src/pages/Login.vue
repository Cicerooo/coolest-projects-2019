<template>
	<section>
		<h1>Welcome to Lyte</h1>
		<section class="box">
			<section class="loginbox">
				<h2>Log in</h2>
				<label for="username">Username</label>
				<input
					type="text"
					placeholder="Username"
					id="username"
					v-model="username"
				/>
				<label for="password">Password</label>
				<input
					type="password"
					placeholder="Password"
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
					<router-link to="/register">Sign up</router-link>
				</p>
			</section>
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
<style scoped>
body {
	background-color: #f8feec;
}
h1 {
	font-family: "Merienda One", cursive;
	text-align: center;
	margin: 40px, auto, 0;
	font-size: 40px;
}
.box {
	width: 1120px;
	height: 450px;
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	background-color: #f0ffd7;
	color: #c2fa65;
	padding-top: 80px;
	font-size: 20px;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
	border-radius: 15px;
}
.loginbox {
	height: 450px;
	width: 320px;
	margin-left: 680px;
	padding-left: 80px;
	font-family: "Baloo Chettan 2", cursive;
}
.register {
	text-align: center;
	font-size: small;
}
.alert {
	font-size: small;
	color: #341212;
	margin-bottom: 15px;
}
h2 {
	text-align: center;
	margin-bottom: 40px;
	font-size: 30px;
	font-weight: bold;
}
input {
	display: block;
	margin-top: 15px;
	margin-bottom: 15px;
	margin-left: auto;
	margin-right: auto;
	width: 280px;
	height: 20px;
	background-color: transparent;
	border-color: transparent;
	border-bottom-color: #c2fa65;
	font-family: "Baloo Chettan 2", cursive;
}
label {
	margin-left: auto;
	display: block;
}
button {
	height: 40px;
	width: 180px;
	margin-top: 10px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 10px;
	display: block;
	border-radius: 10px;
	text-align: center;
	font-weight: bold;
	font-size: large;
	color: #f0ffd7;
	background-color: #c2fa65;
	border-color: transparent;
	transition-duration: 0.4s;
}
button:hover {
	background-color: #befe52;
	color: #e9fec4;
}
</style>
