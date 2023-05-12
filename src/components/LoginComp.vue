<template>
  <form>
    <span v-if="!loggedUser.token">
      <input name="email" v-model="email" placeholder="email"/>
      <br/>
      <input name="password" type="password" v-model="password" placeholder="password"/>
      <br/>
      <button id="btnLogin" type="button" @click="login">LogIn</button>
      <p>Non sei ancora registrato? <router-link to="/registrazione">Crea un account</router-link></p>
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

const email = ref("e-mail");
const password = ref("password");

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
      setLoggedUser(data);
      emit("login", loggedUser);
      router.push("/"); // reindirizza alla home
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
</script>