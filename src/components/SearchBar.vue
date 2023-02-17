<template>
    <div>
      <input type="text" v-model="query" class="search-bar" placeholder="Digitare un comune o una provincia..." />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: ''
      }
    }
  }
  </script>
  
  //Senza scoped prende lo style dai suoi fratelli
  <style scoped>
  .search-bar {
    width: 60%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 50px;
  }
  </style>