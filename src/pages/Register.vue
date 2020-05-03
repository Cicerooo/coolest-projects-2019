<template>
	<section>
		<h1>Welcome to Lyte</h1>
		<section class="box">
			<section class="registerbox">
				<h2>Join us!</h2>
				<label for="Username">Username</label>
				<input type="text" placeholder="Username" id="Username" v-model="username" />
				<p v-if="showUsernameAlreadyRegisteredError" class="alert" id="username"> Username is already registered</p>
				<label for="Password">Password</label>
				<input type="password" placeholder="Password" id="Password" v-model="password" />
				<p>Confirm Password</p>
				<input
					type="password"
					placeholder="Confirm Password"
					v-model="confirmedPassword"
				/>
				<p v-if="showPasswordDoesntMatchError" class="alert" id="password"> Password does not match</p>
				<button type="button" @click="saveNewUser" :disabled="isLoading">{{isLoading?"Loading":"Join us"}}</button>
				<p class="login">
					Already have an account?
					<router-link to"/login">Log in</router-link>
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
			confirmedPassword: "",
			showUsernameAlreadyRegisteredError: false,
			showPasswordDoesntMatchError: false,
			isLoading:false
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
				this.isLoading=true;
				axios.get(`http://localhost:3000/users?name=${this.username}`)
					.then(res=>{
						if(res.data.length==0) {
							axios
								.post("http://localhost:3000/users", newUser)
								.then(res => {
									this.clearUser();
									this.clearErrors();
								})
								.catch(error => console.log(error))
								.then(()=>{
									this.isLoading=false;
								})
						}
						else{
							this.showUsernameAlreadyRegisteredError=true;
							this.isLoading=false;
						}
					})
					.catch(error=>{
						this.isLoading=false;
						console.log(error);
					})
			}
		},
		verifyIfPasswordsMatch() {
			if (this.password == this.confirmedPassword) {
				return true;
			}
			this.showPasswordDoesntMatchError=true;
			return false;
		},
		clearUser() {
			this.username = "";
			this.password = "";
			this.confirmedPassword = "";
		},
		clearErrors(){
			this.showUsernameAlreadyRegisteredError=false;
			this.showPasswordDoesntMatchError=false;
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
	margin: 20px, auto, 0;
	background-color: #f0ffd7;
	color: #c2fa65;
	padding-top: 80px;
	font-size: 20px;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
	border-radius: 15px;
}
.registerbox {
	height: 450px;
	width: 320px;
	margin-right: 680px;
	padding-left: 80px;
	font-family: "Baloo Chettan 2", cursive;
}
.login {
	text-align: center;
	font-size: small;
}
.alert {
	font-size: small;
	color: #341212;
}
h2 {
	text-align: center;
	margin-bottom: 40px;
	font-size: 30px;
	font-weight: bold;
}
input {
	margin-top:15x;
	margin-bottom:15px;
	width: 280px;
	height: 20px;
	background-color: transparent;
	border-color: transparent;
	border-bottom-color: #c2fa65;
	font-family: "Baloo Chettan 2", cursive;
}
button {
	cursor:pointer;
	height: 40px;
	width: 180px;
	margin: 10px , auto, 10px;
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
