<template>
    <div>
      <input type="text" v-model="query" placeholder="Cerca..." />
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
  
  <style>
  input[type="text"] {
    width: 60%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 50px;
  }
  </style>