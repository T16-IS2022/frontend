<template>
    <form @submit.prevent="pubblicaAnnuncio(locali, durataServizio)">
      <label>Superficie:</label>
      <input type="number" min="0" v-model="superficie" required>
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
      <input type="radio" name="arredato" v-model="arredato">
      <br/><br/>
      <label>Carica foto:</label>
      <input type="file" multiple @change="handleFileUpload">
      <br/><br/>
      <hr/>
      <h2>Aggiungi i vari locali:</h2>
      <label>Classe energetica</label>
      <input type="text" v-model="classe_energetica" required>
      <br/><br/>
      <h3>Inserisci il nome dei locali e i mobili al loro interno</h3>
      <div>
        <div v-for="(locale, index) in locali" :key="locale.id">
          <label>Nome del locale:</label>
          <br/>
          <input v-model="locale.nome" type="text" />
          <button @click="rimuoviLocale(index)">Rimuovi Locale</button>
          <br/>
          <label>Mobili al suo interno:</label>
          <br/>
          <div v-for="(info, i) in locale.informazioni" :key="i">
            <input v-model="info.testo" type="text" />
            <button @click="rimuoviInformazione(index, i)">Rimuovi</button>
            <br/>
          </div>
          <button @click="addInformazione(index)">Aggiungi mobile</button>
          <br/><br/>
        </div>
        <button @click="addLocale">Aggiungi locale</button>
        <br/><br/>
      </div>
      <hr/>
      <div>
        <h2>Annuncio in vetrina</h2>
        <h4>Se si vuole mettere l'annuncio in vetrina,</h4>
        <h4>scegliere per quanto attivare il servizio:</h4>
        <form>
          <div>
            <input type="radio" id="giornaliero" name="durata" value="1" v-model="durataServizio">
            <label for="giornaliero">1 Giorno - €0,99</label>
          </div>
          <div>
            <input type="radio" id="settimanale" name="durata" value="7" v-model="durataServizio">
            <label for="settimanale">7 Giorni - €4,99</label>
          </div>
          <div>
            <input type="radio" id="mensile" name="durata" value="31" v-model="durataServizio">
            <label for="mensile">1 Mese - €19,99</label>
          </div>
          <div>
            <input type="radio" id="bimestrale" name="durata" value="62" v-model="durataServizio">
            <label for="bimestrale">2 Mesi- €29,99</label>
          </div>
          <button type="button" @click="effettuaPagamento">Effettua Pagamento</button>
        </form>
      </div>
      <br/>
      <button type="submit">Pubblica annuncio</button>
    </form>
</template>
  
<script>
  import { ref } from "vue";
  import { loggedUser } from "@/states/loggedUser";
  export default {
    data() {
      return {
        locali: [],
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
      }
    },
    setup() {
      const superficie = ref("");
      const numBagni = ref("");
      const prezzo = ref("");
      const numLocali = ref("");
      const via = ref("");
      const arredato = ref("");
      const classe_energetica = ref("");
      const files = ref([]);
      const done = ref(false);
      const HOST = /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`;
      const API_URL = HOST;
      
  
      function handleFileUpload(e) {
        files.value = e.target.files;
      }
  
      function pubblicaAnnuncio(locali, durataServizio) {
        fetch(API_URL + "/annuncio/pubblica", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ superficie: superficie.value, 
                                 numero_bagni: numBagni.value, 
                                 prezzo: prezzo.value, 
                                 numero_locali: numLocali.value, 
                                 indirizzo: via.value, 
                                 arredato: arredato.value, 
                                 foto: [""], 
                                 classe_energetica: classe_energetica.value, 
                                 locale: locali, 
                                 durata_vetrina: durataServizio,
                                 userId: loggedUser.id
                                }),
        })
          .then((resp) => resp.json()) // Transform the data into json
          .then(function (data) {
            console.log(data);
            done.value = true;
            return;
          })
          .catch((error) => console.error(error)); // If there is any error you will catch them here
        }
 
      return {
        superficie,
        numBagni,
        prezzo,
        numLocali,
        via,
        arredato,
        classe_energetica,
        files,
        handleFileUpload,
        pubblicaAnnuncio,
      };
    },
  };
</script>  