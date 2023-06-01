<template>
  <div>
    <v-toolbar class="ma-7">
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
      <v-btn icon class="ma-5">
        <v-icon>mdi-filter-variant</v-icon>
        Filtri
      </v-btn>
    </v-toolbar>

    <v-card class="ma-7 px-6 py-8">
        <h2>Annunci nelle tue vicinanze</h2>
        <br/>
        <div v-if="!annunci || annunci.length <= 0">
          <h3>Nessun annuncio presente...</h3>
        </div>
        <div v-else>
          <ul>
              <Annuncio v-for="annuncio in annunci" :key="annuncio._id" :annuncio="annuncio" />
          </ul>
        </div>
    </v-card>
  </div>
</template>

<script>
import Annuncio from './AnnuncioComp.vue';

export default {
  name: 'HomePage',
  components: {
    Annuncio,
  },
  data() {
    return {
      query: '',
      annunci: [],
    };
  },
  methods: {
    getAnnunci() {
      fetch(process.env.VUE_APP_ROOT_API + "/annuncio/list", {
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