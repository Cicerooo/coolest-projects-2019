<template>
  <section class="box">
    <h1 class="box-title">{{ title }}</h1>
    <div>
      <slot />
    </div>
    <p class="box-footer">
      <slot name="footer">
    </p>
  </section>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue";
import axios from "axios";
export default {
  name: "Box",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="less">
.box {
  width: 450px;
  padding: 40px;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  color: black;
  font-size: 20px;
  border-radius: 10px;
  font-family: "Open Sans", cursive;
  box-sizing: border-box;
}
.box-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: bold;
}
.box-footer {
  text-align: center;
  font-size: 15px;
  margin-top: 15px;
}
.alert {
  font-size: 15px;
  color: var(--redirect-color);
  margin-top: 5px;
  text-align: center;
}
input {
  display: block;
  margin-top: 15px;
  width: 100%;
  background-color: transparent;
  border: 2px solid #eaeced;
  border-radius: 5px;
  font-family: "Open Sans", cursive;
  padding: 20px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: #d9dada;
  }
}
.input-group {
  margin-bottom: 30px;
}
label {
  display: block;
  font-size: 18px;
}
button {
  padding: 20px;
  width: 100%;
  display: block;
  border-radius: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: var(--redirect-color);
  border: none;
  transition-duration: 0.4s;
  &:hover {
    background-color: var(--redirect-highlight);
    cursor: pointer;
  }
}
.link {
  color: var(--redirect-color);
  text-decoration: none;
  &:hover {
    color: var(--redirect-highlight);
    cursor: pointer;
  }
}
</style>
