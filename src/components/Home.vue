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
    <ul>
        <h3 v-if="!Array.isArray(annunci) || !annunci.length">Nessun annuncio presente...</h3>
        <div v-for="annuncio in annunci" :key="annuncio.id">
          <hr/>
          <br/>
          <div>
            <img :src="require('@/assets/foto_annuncio.png')" alt="Annuncio" />
          </div>
          <div>
            <p> Via: {{ annuncio.indirizzo }}</p>
            <p> Prezzo: €{{ annuncio.prezzo }}</p>
            <p> Locali: {{ annuncio.numero_locali }}</p>
            <p> Superficie: {{ annuncio.superficie_tot }} m<sup>2</sup></p>
            <p> Bagni: {{ annuncio.numero_bagni }}</p>
            <p v-if="annuncio.arredato"> Arredato: Sì</p>
            <p v-else> Arredato: No</p>
            <p> Classe energetica: {{ annuncio.classe_energetica }}</p>
          </div>
        </div>
    </ul>
  </v-container>
</template>

<script>
import SearchBar from './SearchBar.vue'

  export default {
    name: 'HomePage',
    components: {
      SearchBar
    },
    data() {
      return {
        query: '',
        annunci: [],
        HOST: /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`,
        API_URL: `http://localhost:3000`
      };
    },
    methods: {
      getAnnunci() {
        fetch(this.API_URL + "/annuncio/list", {
          method: "GET",
          headers: { "Content-Type": "application/json"},
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then((data) => {
          console.log(data.annunci);
          this.annunci = data.annunci;
          console.log(this.annunci);
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
      }
    },
    mounted() {
      this.getAnnunci();
    }
  }
</script>