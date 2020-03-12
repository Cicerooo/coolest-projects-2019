<template>
	<section>
		<input type="text" placeholder="Username" v-model="username"/>
		<input type="password" placeholder="Password" v-model="password"/>
		<input type="password" placeholder="Confirm Password" v-model="confirmedPassword"/>
		<button type="button" @click="saveNewUser" >Join us</button>
		<p>
			Already have an account? Log in here! 
			<button type="button" @click="switchToLogin">Log in</button>
		</p>
	</section>
</template>
<script>
	import Vue from "vue";
	import axios from "axios";
	export default{
		data(){
			return{
				username:"",
				password:"",
				confirmedPassword:""
			}
		},
		methods:{
			saveNewUser(){
				if(this.username && this.password && this.Confirmed()){
					const newUser={
						name:this.username,
						password:this.password
					}
					axios.post("http://localhost:3000/users",newUser)
						.then( res =>{
							this.clearUser()
							window.location.href='/';
						})
						.catch(error=>console.log(error))
						
				}
			},
			Confirmed(){
				if(this.password==this.confirmedPassword)
					return true;
				else{
					return false;
				}
			},
			clearUser()
			{
				this.username="";
				this.password="";
				this.confirmedPassword="";
			},
			switchToLogin(){
				window.location.href='/login';
			}
		}
	}
</script>