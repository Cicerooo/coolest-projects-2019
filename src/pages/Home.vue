<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/habit">Habit</router-link>
      <router-link to="/login">Log in</router-link>
    </nav>
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
