<script setup>
import { clearLoggedUser } from "../states/loggedUser.js";
</script>

<template>
    <div>
      <nav>
        <ul>
          <li><a href="#" @click.prevent="goToSavedAds">Annunci salvati</a></li>
          <li><a href="#" @click.prevent="goToEditProfile">Modifica dati</a></li>
          <li><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToSavedAds() {
        // Navigate to saved ads page
        this.$router.push('/saved-ads');
      },
      goToEditProfile() {
        // Navigate to edit profile page
        this.$router.push('/edit-profile');
      },
      logout() {
        // Perform logout operation, e.g. clear access token
        clearLoggedUser();
        // Navigate to login page
        this.$router.push('/login');
      }
    }
  }
  </script>