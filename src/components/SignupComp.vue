<template>
  <span v-if="!$data.done">
    <v-card class="mx-auto mt-10 mb-10 px-6 py-5" max-width="600">
      <h2>Crea un account</h2>
      <br>
      
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="nome"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Nome"
        ></v-text-field>

        <v-text-field
          v-model="cognome"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Cognome"
        ></v-text-field>

        <v-text-field
          v-model="data_nascita"
          :rules="[rules.required]"
          class="mb-2"
          type='date'
          clearable
          label="Data di nascita"
        ></v-text-field>

        <v-text-field
          v-model="numero_tel"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Numero di telefono"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.isValidEmail]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>
      
        <v-text-field
          v-model="password"
          :rules="[rules.required, rules.isValidPassword]"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          clearable
          label="Password"
          placeholder="Enter your password"
          :type="show ? 'text' : 'password'"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>

        <v-text-field
          v-model="conferma_password"
          :rules="[rules.required, rules.passwordMatch]"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          clearable
          label="Conferma password"
          :type="show ? 'text' : 'password'"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>

        <v-checkbox
          v-model="condizioni"
          :rules="[rules.required]"
          color="secondary"
          label="Accetto i Termini e le condizioni"
        ></v-checkbox>

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
          Registrati
        </v-btn>
      </v-form>
      <div class="text-center mt-5">
        <p>Sei già registrato? <router-link to="/login"> Accedi </router-link></p>
      </div>
    </v-card>
  </span>
  <span v-else>
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <h2>Grazie per esserti registrato!</h2>
      <br>
      <p> Puoi ora effettuare il login </p>
    </v-card>
  </span>
</template>

<script>
  import { RouterLink } from "vue-router";

  export default {
    data () {
      return {
        /*
          Quando tutti i campi vengono compilati, form diventa automaticamente true.
          Questo perchè sopra abbiamo messo v-model="form".
        */
        form: false,
        done: false,
        nome: "",
        cognome: "",
        data_nascita: "",
        numero_tel: "",
        email: "",
        password: "",
        conferma_password: "",
        condizioni: false,
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
          required: value => !!value || "Questo campo è obbligatorio",
          passwordMatch: value => (value == this.password & value == this.conferma_password)  || (`Le password devono essere identiche`),
          isValidEmail: value => this.validateEmail(value),
          isValidPassword: value => this.validatePassword(value)
        }
      }
    },
    methods: {
        onSubmit() {
            if (!this.form)
                return;
            this.loading = true;
            setTimeout(() => this.signUp(), 1500); //fa girare la rotellina per 1.5 secondi e poi esegue l'API
        },
        signUp() {
          fetch(process.env.VUE_APP_ROOT_API + "/utente/registrazione", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                                    nome: this.nome,
                                    cognome: this.cognome,
                                    data_nascita: this.data_nascita,
                                    numero_tel: this.numero_tel,
                                    email: this.email,
                                    password: this.password
                                }),
          })
            .then((resp) => resp.json()) // Transform the data into json
            .then(() => {
              this.done = true;
            })
            .catch((error) => console.error(error)) // If there is any error you will catch them here
            .finally(() => {
                  this.loading = false;
            });
        },
        validateEmail(email) {
          // Regular expression per controllare il formato dell'email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
          // Verifica se la stringa corrisponde alla regular expression
          if(emailRegex.test(email))
            return true;
          else
            return "Email non valida";
        },
        validatePassword(password) {
          // Controlla la lunghezza minima di 8 caratteri
          if (password.length < 8) {
            return "La password deve contenere almeno 8 caratteri";
          }

          // Controlla la presenza di almeno una lettera maiuscola
          if (!/[A-Z]/.test(password)) {
            return "La password deve contenere almeno una lettera maiuscola";
          }

          // Controlla la presenza di almeno un numero
          if (!/[0-9]/.test(password)) {
            return "La password deve contenere almeno un numero";
          }

          // Controlla la presenza di almeno un carattere speciale
          if (!/[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(password)) {
            return "La password deve contenere almeno un carattere speciale";
          }

          // La password rispetta tutte le regole
          return true;
          }
        },
    components: { RouterLink }
}
</script>