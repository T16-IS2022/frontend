<script setup>
import LoginComp from '@/components/LoginComp.vue'
</script>

<template>
  <main>
    <h1>Accedi al tuo account</h1>
    <br/>
    <LoginComp/> 
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

#btnLogin {
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