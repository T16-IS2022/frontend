<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <SearchBar v-model="query"></SearchBar>
      </v-col>
      <br/><br/><br/><br/><br/>
      <h2>Annunci nelle tue vicinanze</h2>
      <br/><br/><br/>
    </v-row>
    <div v-if="!annunci || annunci.length <= 0">
      <h3>Nessun annuncio presente...</h3>
    </div>
    <div v-else>
      <ul>
          <Annuncio v-for="annuncio in annunci" :key="annuncio._id" :annuncio="annuncio" />
      </ul>
    </div>
  </v-container>
</template>

<script>
import SearchBar from './SearchBar.vue'
import Annuncio from './AnnuncioComp.vue';

  export default {
    name: 'HomePage',
    components: {
      SearchBar,
      Annuncio
    },
    data() {
      return {
        query: '',
        annunci: [],
        //API_URL: import.meta.env.VITE_LOCALHOST || import.meta.env.VITE_API_HOST
      };
    },
    methods: {
      getAnnunci() {
        fetch("http://localhost:3000" + "/annuncio/list", {
          method: "GET",
          headers: { "Content-Type": "application/json"},
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then((data) => {
          this.annunci = data.annunci;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
      }
    },
    mounted() {
      this.getAnnunci();
    }
  }
</script>