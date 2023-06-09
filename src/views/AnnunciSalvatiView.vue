<template>
    <v-card class="ma-7 px-6 py-8">
      <h1>Annunci salvati</h1>
      <br>
      <div v-if="!annunci || annunci.length <= 0">
          <h3>Nessun annuncio presente...</h3>
      </div>
      <div v-else>
          <ul>
              <AnnuncioSalvatoComp v-for="annuncio in annunci" :key="annuncio._id" :annuncio="annuncio" />
          </ul>
      </div>
    </v-card>
  </template>
    
  <script>
      import AnnuncioSalvatoComp from '@/components/AnnuncioSalvatoComp.vue';
      import { loggedUser } from "../states/loggedUser.js";
    
      export default {
        components: {
          AnnuncioSalvatoComp
        },
        data() {
          return {
            annunci: []
          };
        },
        methods: {
          getAnnunciSalvati() {
            fetch(process.env.VUE_APP_ROOT_API + "/utente/annunci-salvati", {
              method: "GET",
              headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token}
            })
            .then((resp) => resp.json()) // Transform the data into json
            .then((data) => {
              this.annunci = data.annunci_salvati;
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
          }
        },
        mounted() {
          this.getAnnunciSalvati();
        }
      }
  </script>