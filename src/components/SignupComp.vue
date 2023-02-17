<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`;
const API_URL = HOST;

const nome = ref("nome");
const cognome = ref("cognome");
const data_nascita = ref("data di nascita")
const numero_tel = ref("numero di telefono");
const email = ref("e-mail");
const password = ref("password");

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
      <br/>
      <input name="cognome" v-model="cognome"/>
      <br/>
      <input type="date" name="data_nascita" v-model="data_nascita"/>
      <br/>
      <input name="numero_tel" v-model="numero_tel"/>
      <br/>
      <input type="email" name="email" v-model="email" />
      <br/>
      <input name="password" type="password" v-model="password" />
      <br/>
      <button id="btnSignup" type="button" @click="signup">Sign Up</button>
      <p>Sei già registrato? <router-link to="/login">Accedi</router-link></p>
    </span>
    <span v-else>
      <h3>Grazie per esserti registrato!</h3>
      <p> Puoi ora effettuare il login </p>
    </span>
  </form>
</template>