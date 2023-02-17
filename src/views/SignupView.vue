<script setup>
import SignupComp from '@/components/SignupComp.vue'
</script>

<template>
  <main>
    <h1>Crea un account</h1>
    <br/>
    <h3>Inserisci i tuoi dati qui</h3>
    <br/>
    <SignupComp /> 
    </main>
</template>

<style>
main{
  text-align: center;
}

input{
  border: solid gray;
  margin: 5px;
  border-radius: 10px;
}

input[name="data_nascita"]{
  padding-left: 20px;
  padding-right: 20px;
}

#btnSignup {
  background-color: #165289;
  color: white;
  border: solid #4b5ae2;
  margin: 15px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
}

</style>