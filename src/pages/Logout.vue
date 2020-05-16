<template>
  <div class="logout"></div>
</template>
<script>
import Vue from "vue";
export default {
  created() {
    localStorage.removeItem("layt");
    this.$router.push({ path: "/login" });
  }
};
</script>
