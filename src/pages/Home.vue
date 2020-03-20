<template>
	<div>
		<h2>Home</h2>
		<HabitList />
	</div>
</template>
<script>
import Vue from "vue";
import HabitList from "../components/HabitList.vue";
export default {
	components: {
		HabitList
	}
};
</script>