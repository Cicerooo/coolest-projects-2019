<template>
	<section>
		<section class="greeting">Welcome to Lyte</section>
		<section class="box">
			<link href="https://fonts.googleapis.com/css?family=Merienda+One&display=swap" rel="stylesheet"> 
			<link href="https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap" rel="stylesheet"> 
			<section class="loginbox">
				<h1>Log in</h1>
				<p>Username</p>
				<input type="text" placeholder="Username" v-model="username"/>
				<p class="alert" id="user"></p>
				<p>Password</p>
				<input type="password" placeholder="Password" v-model="password"/>
				<p class="alert" id="pass"></p>
				<button type="button" @click="Login">Log in</button>
				<p class="register">
					Don't have an account?
				</p>
				<button type="button" @click="switchToRegister">Sign up</button>
			</section> 
		</section>
	</section>
</template>
<script>
	import Vue from "vue";
	import axios from "axios";
	export default{
		data(){
			return{
				username:"",
				password:""
			}
		},
		methods:{
			Login(){
				document.getElementById("user").innerHTML="";
				document.getElementById("pass").innerHTML="";
				var UserV=0;
				var PassV=0;
				axios.get("http://localhost:3000/users")
					.then(res=>{
						for(var i=0;i<res.data.length;i++)
						{
							if(this.VerifyUser(res.data[i].name)){
								UserV=1;
								if(this.verifyPass(res.data[i].password)){
									window.location.href='/';
									PassV=1;
									return 0;
								}
							}
						}
						if(UserV==0)
							document.getElementById("user").innerHTML="User not registered";
						else if(PassV==0)
							document.getElementById("pass").innerHTML="Incorrect Password";
					})
					.catch(error=>console.log(error))
			},
		VerifyUser(usern){
			if(usern==this.username){
				return true;
			}
			else{
				 return false;
			}
		},
		verifyPass(pass){
			if(pass==this.password)
			return true;
			else{
				return false;
			}
		},
		switchToRegister(){
			window.location.href='/register';
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
	.loginbox{
		height:450px;
		width:320px;
		margin-left:680px;
		padding-left:80px;
		font-family: 'Baloo Chettan 2', cursive;
	}
	.register{
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