<template>
	<section>
		<input type="text" placeholder="Username" v-model="username"/>
		<input type="password" placeholder="Password" v-model="password"/>
		<button type="button" @click="Login">Log in</button>
		<p>
			Don't have an accound? Sign up here!
			<button type="button" @click="switchToRegister">Sign up</button>
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
				password:""
			}
		},
		methods:{
			Login(){
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
									console.log("Logged in");
									PassV=1;
									return 0;
								}
							}
						}
						if(UserV==0)
						console.log("user not registered");
						else if(PassV==0)
						console.log("password does not match the user");
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