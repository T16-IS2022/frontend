<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`;
const API_URL = HOST;

const nome = ref("Mario");
const cognome = ref("Rossi");
const data_nascita = ref("01/01/2000")
const numero_tel = ref("1234567890");
const email = ref("test@gmail.com");
const password = ref("1234#");

const emit = defineEmits(["signup"]);
let done = ref(false);

function signup() {
  fetch(API_URL + "/utente/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: nome.value, cognome: cognome.value, data_nascita: data_nascita.value, numero_tel: numero_tel.value, email: email.value, password: password.value}),
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function () {
      emit("signup", loggedUser);
      done.value = true;
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
</script>

<template>
  <form>
    <span v-if="!done">
      <input name="nome" v-model="nome"/>
      <input name="cognome" v-model="cognome"/>
      <input name="data_nascita" v-model="data_nascita"/>
      <input name="numero_tel" v-model="numero_tel"/>
      <input name="email" v-model="email" />
      <input name="password" type="password" v-model="password" />
      <button type="button" @click="signup">Sign Up</button>
    </span>
    <span v-else>
      <h3>Sign Up completed successfully</h3>
      <p> You can now login </p>
    </span>
  </form>
</template>
