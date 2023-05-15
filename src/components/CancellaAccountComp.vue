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
    methods: {
      cancellaAccount() {
        fetch(process.env.VUE_APP_ROOT_API + "/utente/" + loggedUser.id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token}
        }).catch((error) => console.error(error));

        router.push("/logout");
      },
    },
  };
</script>