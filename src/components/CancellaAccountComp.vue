<template>
    <div>
      <h3>Sei sicuro di voler eliminare il tuo account?</h3>
      <br/>
      <button @click="cancellaAccount">Sì</button>
      <br/>
      <router-link to="/">No, torna alla home</router-link>
    </div>
</template>
  
<script>
  import { loggedUser } from '@/states/loggedUser';
  import router from "@/router";
  
  export default {
    data() {
      return {
        HOST: /*import.meta.env.VITE_API_HOST ||*/ `http://localhost:3000`,
        API_URL: `http://localhost:3000`
      };
    },
    methods: {
      cancellaAccount() {
        fetch(this.API_URL + "/utente/cancella", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token},
        body: JSON.stringify({ userId: loggedUser.id })
        }).catch((error) => console.error(error));

        router.push("/logout");
      },
    },
  };
</script>