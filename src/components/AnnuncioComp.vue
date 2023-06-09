<template>
  <div @click="visualizzaAnnuncio">
      <div class="d-flex">
          <div class="mr-4">
              <img :src="require('@/assets/foto_annuncio.png')" alt="Annuncio" />
          </div>
          <v-card-text>
              <p><strong class="indigo--text">{{ annuncio.indirizzo }}</strong></p>
              <v-row>
                  <v-col cols="12">
                      <div class="info-row">
                          <v-icon left>mdi-currency-eur</v-icon>
                          <strong>Prezzo:</strong> €{{ annuncio.prezzo }}
                          <span class="separator"></span>
                          <v-icon left>mdi-home-group</v-icon>
                          <strong>Locali:</strong> {{ annuncio.numero_locali }}
                          <span class="separator"></span>
                          <v-icon left>mdi-checkbox-blank-outline</v-icon>
                          <strong>Superficie:</strong> {{ annuncio.superficie_tot }} m<sup>2</sup>
                          <span class="separator"></span>
                          <v-icon left>mdi-shower</v-icon>
                          <strong>Bagni:</strong> {{ annuncio.numero_bagni }}
                      </div>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                      <v-icon left>mdi-sofa</v-icon>
                      <strong>Arredato:</strong> {{ annuncio.arredato ? 'Sì' : 'No' }}
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                      <v-icon left>mdi-lightbulb-on-outline</v-icon>
                      <strong>Classe energetica:</strong> {{ annuncio.classe_energetica }}
                  </v-col>
              </v-row>
          </v-card-text>
      </div>
      <hr>
  </div>
</template>

<style scoped>
  .separator {
  border-left: 2px solid #ccc;
  height: 100%;
  margin: 0 5px;
}
</style>
  
<script>
  export default {
    props: {
      annuncio: Object
    },
    methods: {
      visualizzaAnnuncio() {
        // apri la pagina per visualizzare l'annuncio
        this.$router.push(`/annuncio/${this.annuncio._id}`);
      }
    }
  }
</script>