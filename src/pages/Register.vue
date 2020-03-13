<template>
	<section>
		<link href="https://fonts.googleapis.com/css?family=Merienda+One&display=swap" rel="stylesheet"> 
		<section class="greeting">Welcome to Lyte</section>
		<section class="box">
			<link href="https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap" rel="stylesheet"> 
			<section class="registerbox">
				<h1>Join us!</h1>
				<p>Username</p>
				<input type="text" placeholder="Username" v-model="username"/>
				<p class="alert" id="user"></p>
				<p>Password</p>
				<input type="password" placeholder="Password" v-model="password"/>
				<p>Confirm Password</p>
				<input type="password" placeholder="Confirm Password" v-model="confirmedPassword"/>
				<p class="alert" id="pass"></p>
				<button type="button" @click="saveNewUser" >Join us</button>
				<p class="login">
					Already have an account?
				</p>
				<button type="button" @click="switchToLogin">Login</button>
			</section>
		</section>
	</section>
</template>
<script>
	var user=document.getElementById("user");
	var pass=document.getElementById("pass");
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
				document.getElementById("user").innerHTML="";
				document.getElementById("pass").innerHTML="";
				if(this.username && this.password && this.Confirmed()&&this.Verified()){
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
					document.getElementById("pass").innerHTML="Password does not match";
					return false;
				}
			},
			Verified(){	
				axios.get("http://localhost:3000/users")
					.then(res=>{
						for(var i=0;i<res.data.length;i++)
						{
							if(res.data[i].name==this.username){
								document.getElementById("user").innerHTML="user already registered";
								return false;
							}
							else
								 return true;
						}
					})
			},
			verifyUser(user){
				if(user==this.username)
					return true;
				else 
					return false;
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
<style scoped>
	*{
		margin:0;
		padding:0;
	}
	body{
		background-color:#f8feec;
	}
	.greeting{
		font-family:'Merienda One', cursive;
		text-align: center;
		margin-right: auto;
		margin-left: auto;
		margin-top:40px;
		font-size: 40px;

	}
	.box{
		width:1120px;
		height:450px;
		margin-top: 20px;
		margin-left:auto;
		margin-right: auto;
		background-color:#f0ffd7;
		color:#c2fa65;
		padding-top: 80px;
		font-size: 20px;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.5);
		border-radius:15px;
	}
	.registerbox{
		height:450px;
		width:320px;
		margin-right:680px;
		padding-left:80px;
		font-family: 'Baloo Chettan 2', cursive;
	}
	.login{
		margin-left:73px;
		font-size: small;
	}
	.alert{
		font-size:small;
		color:#341212;
	}
	h1{
		text-align: center;
		margin-right:50px;
		margin-bottom: 40px;
		font-size: 30px;
		font-weight: bold;
	}	
	input{
		margin-top:15px;
		margin-bottom:15px;
		width:280px;
		height:20px;
		background-color: transparent;
		border-color: transparent;
		border-bottom-color:#c2fa65 ;
		font-family: 'Baloo Chettan 2', cursive;
	}
	button{
		height:40px;
		width:180px;
		margin-left:50px;
		margin-top: 10px;
		margin-bottom:10px;
		border-radius:10px;
		text-align: center;
		font-weight: bold;
		font-size: large;
		color:#f0ffd7;
		background-color:#c2fa65;
		border-color:transparent;
		transition-duration: 0.4s;
	}
	button:hover{
		background-color: #befe52;
		color:#e9fec4;
	}

</style>