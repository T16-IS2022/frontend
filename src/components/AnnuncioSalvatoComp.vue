<template>
    <div>
        <div class="d-flex">
            <div class="mr-4">
                <img :src="require('@/assets/foto_annuncio.png')" alt="Annuncio" />
            </div>
            <div>
                <v-btn class="ma-2" color="red" dark @click="rimuoviAnnuncioSalvato">
                        <v-icon left>mdi-heart</v-icon>
                        Salvato
                </v-btn>
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
  import { loggedUser } from '@/states/loggedUser';
  import router from "@/router";

  export default {
    props: {
      annuncio: Object
    },
    methods: {
        rimuoviAnnuncioSalvato() {
            fetch(process.env.VUE_APP_ROOT_API + "/annuncio/salva/" + this.annuncio._id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token}
            })
            .then((resp) => resp.json()) // Transform the data into json
            .catch((error) => console.error(error));
            router.push("/");
        }
    }
  }
</script>