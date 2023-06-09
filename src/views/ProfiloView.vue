<script setup>
import { loggedUser } from '@/states/loggedUser';
</script>

<template>
  <v-card class="mx-auto px-6 py-8 text-center" max-width="500">
    <main>
      <h1 v-if="loggedUser.nome">Bentornato {{ loggedUser.nome + " " + loggedUser.cognome }}</h1>
      <h1 v-else>Bentornato anonimo</h1>
      <div>
        <router-link to="/annunci-salvati">
          <v-btn class="ma-3" outlined color="indigo">
          Annunci salvati
          </v-btn>
        </router-link>
        <br/>
        <router-link to="/ricerche-salvate">
          <v-btn class="ma-3" outlined color="indigo">
          Ricerche salvate
          </v-btn>
        </router-link>
        <br/>
      </div>
      <div v-if="loggedUser.id">
        <router-link to="/messaggi">
          <v-btn class="ma-3" outlined color="indigo">
          Messaggi
          </v-btn>
        </router-link>
        <br/>
        <router-link to="/annunci-pubblicati">
          <v-btn class="ma-3" outlined color="indigo">
          Annunci pubblicati
          </v-btn>
        </router-link>
        <br/>
        <router-link to="/modifica-dati">
          <v-btn class="ma-3" outlined color="indigo">
          Modifica dati
          </v-btn>
        </router-link>
        <br/>
        <router-link to="/logout">
          <v-btn class="ma-3" outlined color="indigo">
          Logout
          </v-btn>
        </router-link>
        <br/>
        <router-link to="/cancella-account">
          <v-btn class="ma-3" outlined color="indigo">
          Cancella account
          </v-btn>
        </router-link>
      </div>
    </main>
  </v-card>
</template>