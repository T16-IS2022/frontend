<template>
    <div>
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
            <button @click="deleteAnnuncio">Elimina</button>
        </div>
        <hr>
    </div>
</template>
  
<script>
  export default {
    props: {
      annuncio: Object
    },
    methods: {
        deleteAnnuncio() {
            
        }
    }
  }
</script>