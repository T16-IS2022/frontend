<template>
  <div v-if="!done">
    <form @submit.prevent="pubblicaAnnuncio">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="superficie_tot" label="Superficie" type="number" min="0" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="numBagni" label="Numero dei bagni" type="number" min="0" required></v-text-field>
        </v-col>
      </v-row>
      <br/>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="prezzo" label="Prezzo" type="number" min="0" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="numLocali" label="Numero dei locali" type="number" min="0" required></v-text-field>
        </v-col>
      </v-row>
      <br/>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="via" label="Via" required></v-text-field>
        </v-col>
      </v-row>
      <br/>
      <v-text-field v-model="classe_energetica" label="Classe energetica" required></v-text-field>
      <br/>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="arredato" row>
            <v-radio label="Arredato" value="true"></v-radio>
            <v-radio label="Non arredato" value="false"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <br/>
      <v-row>
        <v-col cols="12">
          <v-file-input v-model="foto" label="Carica foto" multiple></v-file-input>
        </v-col>
      </v-row>
      <br/>
      <hr/>
      <h2>Aggiungi i vari locali:</h2>
      <br/>
      <h3>Inserisci il nome dei locali e i mobili al loro interno</h3>
      <v-card v-for="(locale, index) in locali" :key="locale.id" class="my-4">
        <v-card-text>
          <v-text-field v-model="locale.nome" label="Nome del locale" type="text"></v-text-field>
          <v-btn @click="rimuoviLocale(index)">Rimuovi Locale</v-btn>
          <br/>
          <div v-for="(info, i) in locale.informazioni" :key="i">
            <v-text-field v-model="info.testo" label="Mobili al suo interno" type="text"></v-text-field>
            <v-btn @click="rimuoviInformazione(index, i)">Rimuovi</v-btn>
            <br/>
          </div>
          <v-btn @click="addInformazione(index)">Aggiungi mobile</v-btn>
        </v-card-text>
      </v-card>
      <v-btn @click="addLocale">Aggiungi locale</v-btn>
      <br/><br/>
      <hr/>
      <div>
          <h2>Annuncio in vetrina</h2>
          <h4>Se si vuole mettere l'annuncio in vetrina,</h4>
          <h4>scegliere per quanto attivare il servizio:</h4>
          <v-radio-group v-model="durata_vetrina">
            <v-radio label="1 Giorno - €0,99" value="1"></v-radio>
            <v-radio label="7 Giorni - €4,99" value="7"></v-radio>
            <v-radio label="1 Mese - €19,99" value="31"></v-radio>
            <v-radio label="2 Mesi - €29,99" value="62"></v-radio>
          </v-radio-group>
          <v-btn @click="effettuaPagamento">Effettua Pagamento</v-btn>
        </div>
        <br/>
        <v-btn color="indigo" class="white--text" type="submit">Pubblica annuncio</v-btn>
      </form>
    </div>
    <div v-else>
      <p>Il tuo annuncio è stato pubblicato!</p>
    </div>
</template>
  
<script>
  import { loggedUser } from "@/states/loggedUser";

  export default {
    data() {
      return {
        locali: [],
        superficie_tot: "",
        numBagni: "",
        prezzo: "",
        numLocali: "",
        via: "",
        arredato: "",
        classe_energetica: "",
        durata_vetrina: "",
        done: false,
        files: [],
      };
    },
    methods: {
      addLocale() {
        this.locali.push({
          id: this.locali.length,
          nome: "",
          informazioni: [],
        });
      },
      rimuoviLocale(index) {
        this.locali.splice(index, 1);
      },
      addInformazione(index) {
        this.locali[index].informazioni.push({
          testo: "",
        });
      },
      rimuoviInformazione(localeIndex, informazioneIndex) {
        this.locali[localeIndex].informazioni.splice(informazioneIndex, 1);
      },
      effettuaPagamento() {
        // Qui va il codice per effettuare il pagamento con Stripe...
      },
      handleFileUpload(e) {
        this.files.value = e.target.files;
      },
      pubblicaAnnuncio() {
        var isArredato = (this.arredato) ? true : false;
        fetch(process.env.VUE_APP_ROOT_API + "/annuncio", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token},
          body: JSON.stringify({
                                  userId: loggedUser.id,
                                  superficie_tot: this.superficie_tot, 
                                  numero_bagni: this.numBagni, 
                                  prezzo: this.prezzo, 
                                  numero_locali: this.numLocali, 
                                  indirizzo: this.via, 
                                  arredato: isArredato, 
                                  foto: [""], 
                                  classe_energetica: this.classe_energetica, 
                                  locale: this.locali, 
                                  durata_vetrina: this.durata_vetrina,
                                }),
        })
          .then((resp) => resp.json()) // Transform the data into json
          .then(() => {
            this.done = true;
            return;
          })
          .catch((error) => console.error(error)); // If there is any error you will catch them here
        }
    }
  };
</script>

<style scoped>
  input[type="text"] {
    width: 15%;
    padding: 6px 10px;
    margin: 3px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  input[type="number"] {
    width: 7%;
    padding: 6px 10px;
    margin: 3px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  input[id="classe_energetica"] {
    width: 5%;
    padding: 6px 10px;
    margin: 3px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
</style>