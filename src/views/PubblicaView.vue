<template>
  <v-card class="ma-15 px-6 py-8">
    <div>
      <h1>Pubblica Annuncio</h1>
      <br>
      <PubblicaComp />
    </div>
  </v-card>
</template>
  
<script>
  import PubblicaComp from "@/components/PubblicaComp.vue";
  
  export default {
    components: {
      PubblicaComp,
    },
  };
</script>
  