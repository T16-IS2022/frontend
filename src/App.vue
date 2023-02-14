<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { loggedUser } from './states/loggedUser';

</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link :to="{ name: 'home' }">
          <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="75"
          />
        </router-link>
      </div>
      <nav v-if="loggedUser.token">
        <v-btn plain @click="$router.push('/pubblica')">
          <span class="mr-2">Pubblica annuncio</span>
        </v-btn>
      </nav>
      <v-spacer></v-spacer>
      <nav v-if="!loggedUser.token">
        <v-btn plain @click="$router.push('/signup')">
          <span class="mr-2">Registrati</span>
        </v-btn>
        <v-btn plain @click="$router.push('/login')">
          <span class="mr-2">Accedi</span>
        </v-btn>
      </nav>
      <nav v-if="loggedUser.token">
        <v-btn plain @click="$router.push('/profilo')">
          <span class="mr-2">Profilo</span>
        </v-btn>
      </nav>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer>
      House finder 0.1
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
