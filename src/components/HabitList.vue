
<template>
	<section class="habits">
		<aside class="filters">
			<h2>Filters</h2>
			<article @click="getAllHabits" :class="{selected: selected==0}" class="item">
				<p>All</p>
			</article>
			<article
				v-for="subject in subjects"
				:key="subject.id"
				@click="getFilteredHabits(subject.id)"
				class="item"
				:class="{selected: selected==subject.id}"
			>
				<p>{{subject.name}}</p>
			</article>
		</aside>
		<main class="list">
			<h2>Habits</h2>
			<div v-for="habit in habits" :key="habit.id" class="item">
				<p>{{habit.name}}</p>
			</div>
		</main>
	</section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
	data() {
		return {
			habits: [],
			subjects: [],
			selected: 0
		};
	},
	created() {
		this.getHabits();
		this.getSubjects();
	},
	methods: {
		getAllHabits() {
			axios
				.get("http://localhost:3000/habits")
				.then(res => {
					this.habits = res.data || [];
				})
				.catch(error => console.log(error));
			this.selected = 0;
		},
		getSubjects() {
			axios
				.get("http://localhost:3000/subjects")
				.then(res => {
					this.subjects = res.data || [];
				})
				.catch(error => console.log(error));
		},
		getFilteredHabits(subjectId) {
			axios
				.get(`http://localhost:3000/habits?subjectId=${subjectId}`)
				.then(res => {
					this.habits = res.data || [];
				})
				.catch(error => console.log(error));
			this.selected = subjectId;
		}
	}
};
</script>

<style lang="less" scoped>
.habits {
	font-family: sans-serif;
	display: flex;
	width: 800px;
	margin: 0px auto;
	flex-direction: row;
	justify-content: space-evenly;
	font-size: 18px;
	h2:after {
		height: 2px;
		width: 55px;
		display: block;
		background-color: #ccc;
		content: "";
		margin: 10px 0px;
	}
	.item {
		border: 1px solid #ccc;
		border-radius: 0px;
		margin-bottom: 8px;
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.199);
		user-select: none;
		padding: 15px 10px;
		&:hover {
			box-shadow: 0px 4px 20px 1px rgba(0, 0, 0, 0.116);
		}
		&:active {
			box-shadow: 0px 5px 15px 3px rgba(0, 0, 0, 0.166);
			color: #1d1d1d;
			background-color: #ececec;
		}
		transition: all 100ms;
		transition: "margin" 200ms;
		box-sizing: initial;
		&.selected {
			background-color: #09a5ff;
			color: #fff;
		}
	}

	.filters {
		flex-direction: column;
		width: 200px;
		padding: 0px 10px;
	}
	.list {
		flex-grow: 1;
	}
}
</style>