<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <SearchBar v-model="query"></SearchBar>
      </v-col>
      <br/><br/><br/><br/><br/>
      <h2>Annunci nelle tue vicinanze</h2>

    </v-row>
  </v-container>
</template>

<script>
import SearchBar from './SearchBar.vue'

  export default {
    name: 'HomePage',
    components: {
      SearchBar
    },
    data: () => ({
      query: '',
      annunci: []
    }),
    getAnnunci() {
      fetch(API_URL + "/utente/annunci", {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
      })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        console.log(data);
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
    },
    mounted() {
      getAnnunci();
    }
  }
</script>
