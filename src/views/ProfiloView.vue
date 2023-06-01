<script setup>
import ProfiloComp from '@/components/ProfiloComp.vue'
import { loggedUser } from '@/states/loggedUser';
</script>

<template>
  <v-card class="mx-auto px-6 py-8" max-width="500">
    <main>
      <h1 v-if="loggedUser.nome">Bentornato {{ loggedUser.nome + " " + loggedUser.cognome }}</h1>
      <h1 v-else>Bentornato anonimo</h1>
      <ProfiloComp /> 
    </main>
  </v-card>
</template>

<style>
  main{text-align: center;}
</style>