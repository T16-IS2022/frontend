<template>
  <div v-if="!done">
    <form @submit.prevent="pubblicaAnnuncio">
      <label>Superficie:</label>
      <input type="number" min="0" v-model="superficie_tot" required>
      <br/><br/>
      <label>Numero dei bagni:</label>
      <input type="number" min="0" v-model="numBagni" required>
      <br/><br/>
      <label>Prezzo:</label>
      <input type="number" min="0" v-model="prezzo" required>
      <br/><br/>
      <label>Numero dei locali:</label>
      <input type="number" min="0" v-model="numLocali" required>
      <br/><br/>
      <label>Via:</label>
      <input type="text" v-model="via" required>
      <br/><br/>
      <label>Arredato: </label>
      <input type="radio" name="arredato" value="true" v-model="arredato">
      <br/><br/>
      <label>Carica foto:</label>
      <input type="file" multiple @change="handleFileUpload">
      <br/><br/>
      <hr/>
      <h2>Aggiungi i vari locali:</h2>
      <label>Classe energetica:</label>
      <input type="text" v-model="classe_energetica" id="classe_energetica" required>
      <br/><br/>
      <h3>Inserisci il nome dei locali e i mobili al loro interno</h3>
      <div>
        <div v-for="(locale, index) in locali" :key="locale.id">
          <label>Nome del locale:</label>
          <br/>
          <input v-model="locale.nome" type="text" />
          <button type="button" @click="rimuoviLocale(index)">Rimuovi Locale</button>
          <br/>
          <label>Mobili al suo interno:</label>
          <br/>
          <div v-for="(info, i) in locale.informazioni" :key="i">
            <input v-model="info.testo" type="text" />
            <button type="button" @click="rimuoviInformazione(index, i)">Rimuovi</button>
            <br/>
          </div>
          <button type="button" @click="addInformazione(index)">Aggiungi mobile</button>
          <br/><br/>
        </div>
        <button type="button" @click="addLocale">Aggiungi locale</button>
        <br/><br/>
      </div>
      <hr/>
      <div>
        <h2>Annuncio in vetrina</h2>
        <h4>Se si vuole mettere l'annuncio in vetrina,</h4>
        <h4>scegliere per quanto attivare il servizio:</h4>
        <form>
          <div>
            <input type="radio" id="giornaliero" name="durata" value="1" v-model="durata_vetrina">
            <label for="giornaliero">1 Giorno - €0,99</label>
          </div>
          <div>
            <input type="radio" id="settimanale" name="durata" value="7" v-model="durata_vetrina">
            <label for="settimanale">7 Giorni - €4,99</label>
          </div>
          <div>
            <input type="radio" id="mensile" name="durata" value="31" v-model="durata_vetrina">
            <label for="mensile">1 Mese - €19,99</label>
          </div>
          <div>
            <input type="radio" id="bimestrale" name="durata" value="62" v-model="durata_vetrina">
            <label for="bimestrale">2 Mesi- €29,99</label>
          </div>
          <button type="button" @click="effettuaPagamento">Effettua Pagamento</button>
        </form>
      </div>
      <br/>
      <button type="submit">Pubblica annuncio</button>
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