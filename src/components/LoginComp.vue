<template>
  <form>
    <span v-if="loggedUser.token">
      Welcome {{ loggedUser.email }}
    </span>
    <span v-if="!loggedUser.token">
      <input name="email" v-model="email" placeholder="email"/>
      <input name="password" type="password" v-model="password" placeholder="password"/>
      <button type="button" @click="login">LogIn</button>
    </span>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { loggedUser, setLoggedUser } from "../states/loggedUser.js";
import { defineEmits } from "vue";
import router from "@/router"; // importa il tuo router

const HOST = /*import.meta.env.VITE_API_HOST ||*/ 'http://localhost:3000';
const API_URL = HOST;

const email = ref("test");
const password = ref("1234");

const emit = defineEmits(["login"]);

function login() {
  fetch(API_URL + "/utente/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.email = email.value;
      // Here you get the data to modify as you please
      console.log(data);
      setLoggedUser(data);

      emit("login", loggedUser);
      router.push("/"); // reindirizza alla home
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
</script>