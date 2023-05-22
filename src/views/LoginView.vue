<template>
  <v-card class="mx-auto px-6 py-8" max-width="450">
    <h2>Accedi al tuo account</h2>
    <br>
    
    <v-form
      v-model="form"
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>
    
      <v-text-field
        v-model="password"
        :rules="[rules.required]"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        clearable
        label="Password"
        :type="show ? 'text' : 'password'"
        class="input-group--focused"
        @click:append="show = !show"
      ></v-text-field>
      <router-link to="/registrazione">Password dimenticata?</router-link>
      <br>
      <br>
      <v-btn
        :disabled="!form"
        :loading="loading"
        block
        class="white--text"
        color="indigo"
        size="large"
        type="submit"
        variant="elevated"
      >
        Accedi
      </v-btn>
    </v-form>
    <div class="text-center mt-5">
      <p>Non sei ancora registrato? <router-link to="/registrazione">Crea un account </router-link></p>
    </div>
  </v-card>
</template>

<script>
  import { RouterLink } from "vue-router";
import { setLoggedUser } from "../states/loggedUser.js";
  import router from "@/router"; // importa il tuo router

  export default {
    data () {
      return {
        /*
          Quando tutti i campi vengono compilati, form diventa automaticamente true.
          Questo perchè sopra abbiamo messo v-model="form".
        */
        form: false,
        email: "",
        password: "",
        loading: false,
        show: false,
        rules: {
          /*
            Questa funzione è utilizzata per verificare se il valore di un campo è vuoto o non definito.
            In JavaScript, l'operatore !! viene utilizzato per convertire il valore in un booleano.
            In questo caso, !!value restituisce false se il valore è vuoto, true se NON è vuoto.
            L'operatore || (OR logico) viene utilizzato per fornire un valore di fallback nel caso in cui la condizione precedente sia falsa.
            Quindi, se !!value restituisce false (campo vuoto), l'espressione !!value || 'testo' restituirà 'testo'.
          */
          required: value => !!value || "Questo campo è obbligatorio"
        }
      }
    },
    methods: {
        onSubmit() {
            if (!this.form)
                return;
            this.loading = true;
            setTimeout(() => this.login(), 1500); //fa girare la rotellina per 1.5 secondi e poi esegue l'API
        },
        login() {
            fetch(process.env.VUE_APP_ROOT_API + "/utente/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: this.email, password: this.password })
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                  setLoggedUser(data);
                  if(data.code == 200)
                    router.push("/"); // reindirizza alla home
                  else
                    alert("Email o password errate!"); 
                })
                .catch((error) => console.error(error)) // If there is any error you will catch them here
                .finally(() => {
                  this.loading = false;
                });
        }
    },
    components: { RouterLink }
}
</script>