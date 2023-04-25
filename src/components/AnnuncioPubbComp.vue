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
  import { loggedUser } from '@/states/loggedUser';
  import router from "@/router";

  export default {
    props: {
      annuncio: Object
    },
    methods: {
        data() {
            return {
                HOST: /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`,
                API_URL: `http://localhost:3000`
            };
        },
        deleteAnnuncio() {
            fetch('http://localhost:3000' + "/annuncio/" + this.annuncio._id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token}
            })
            .then((resp) => resp.json()) // Transform the data into json
            .catch((error) => console.error(error)); // If there is any error you will catch them here
            router.push("/");
        }
    }
  }
</script>