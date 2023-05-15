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
            <button @click="salvaAnnuncio">Salva annuncio</button>
        </div>
        <hr>
    </div>
</template>

<script>
    import { loggedUser } from "@/states/loggedUser";

    export default {
        data() {
            return {
                annuncio: {}
            };
        },
        methods: {
            getAnnuncio() {
                fetch(process.env.VUE_APP_ROOT_API + "/annuncio/" + this.$route.params.id, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
                })
                .then((resp) => resp.json()) // Transform the data into json
                .then((data) => {
                    this.annuncio = data.annuncio;
                })
                .catch((error) => console.error(error)); // If there is any error you will catch them here
            },
            salvaAnnuncio() {
                fetch(process.env.VUE_APP_ROOT_API + "/annuncio/salva/" + this.$route.params.id, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token}
                })
                .then((resp) => resp.json()) // Transform the data into json
                .catch((error) => console.error(error)); // If there is any error you will catch them here
            }
        },
        mounted() {
            this.getAnnuncio();
        }
    }
</script>