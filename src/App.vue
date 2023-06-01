<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { loggedUser } from './states/loggedUser';

</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="white"
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
        <v-btn id="whiteBtn" plain @click="$router.push('/pubblica')">
          <span class="mr-2">Pubblica annuncio</span>
        </v-btn>
      </nav>
      <v-spacer></v-spacer>
      <nav v-if="!loggedUser.token">
        <v-btn id="whiteBtn" plain @click="$router.push('/registrazione')">
          <span class="mr-2">Registrati</span>
        </v-btn>
        <v-btn id="purpleBtn" plain @click="$router.push('/login')">
          <span class="mr-2">Accedi</span>
        </v-btn>
      </nav>
      <nav>
        <v-btn id="whiteBtn" plain @click="$router.push('/profilo')">
          <span class="mr-2">Profilo</span>
        </v-btn>
      </nav>
    </v-app-bar>
    <div id="mid">
      <v-main>
        <router-view/>
      </v-main>
    </div>
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

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap%27');

* {
  font-family: 'Roboto'
}

#purpleBtn {
  background-color: #7934ea;
  color: white;
  font-weight: bold;
  border: solid #4b5ae2;
  margin: 15px;
  border-radius: 10px;
}

#whiteBtn {
  background-color: white;
  color: black;
  font-weight: bold;
  border: solid #4b5ae2;
  margin: 15px;
  border-radius: 10px;
}

#mid {
  width: 100%;
  height: 100%;
  background: rgb(83,56,160);
  background: linear-gradient(90deg, rgba(83,56,160,1) 10%, rgba(31,34,36,1) 100%);
  margin: 0 auto;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*.v-main{
  background-color: white;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 0%;
  height: 80%;
  border-radius: 50px;
}*/
</style>