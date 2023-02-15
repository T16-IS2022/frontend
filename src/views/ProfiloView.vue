<script setup>
import ProfiloComp from '@/components/ProfiloComp.vue'
import { loggedUser } from '@/states/loggedUser';
</script>

<template>
  <main>
    <h1>Bentornato {{ loggedUser.nome + " " + loggedUser.cognome }}</h1>
    <ProfiloComp /> 
    </main>
</template>