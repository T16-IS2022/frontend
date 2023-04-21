<template>
    <div @click="visualizzaAnnuncio">
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
        <hr>
    </div>
</template>
  
<script>
  export default {
    props: {
      annuncio: Object
    },
    data() {
      return {
          HOST: /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`,
          API_URL: `http://localhost:3000`
      };
    },
    methods: {
      visualizzaAnnuncio() {
        // apri la pagina per visualizzare l'annuncio
        this.$router.push(`/annuncio/${this.annuncio._id}`);
      }
    }
  }
</script>