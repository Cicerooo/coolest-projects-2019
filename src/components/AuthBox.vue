<template>
	<section>
		<h1 class="greeting">Welcome to Lyte</h1>
		<section class="box">
			<section class="loginbox">
				<h1>{{ title }}</h1>

				<slot />
			</section>
		</section>
	</section>
</template>
<script>
import Vue from "vue";
export default {
	name: "AuthBox",
	props: {
		title: {
			type: String,
			default: "Title"
		}
	}
};
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
}
body {
	background-color: #f8feec;
}
.greeting {
	font-family: "Merienda One", cursive;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	margin-top: 40px;
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
	margin-left: 73px;
	font-size: small;
}
.alert {
	font-size: small;
	color: #341212;
	background-color: red;
	padding: 20px;
}
h1 {
	text-align: center;
	margin-right: 50px;
	margin-bottom: 40px;
	font-size: 30px;
	font-weight: bold;
}
input {
	margin-top: 15px;
	margin-bottom: 15px;
	width: 280px;
	height: 20px;
	background-color: transparent;
	border-color: transparent;
	border-bottom-color: #c2fa65;
	font-family: "Baloo Chettan 2", cursive;
}
button {
	height: 40px;
	width: 180px;
	margin-left: 50px;
	margin-top: 10px;
	margin-bottom: 10px;
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
