<template>
  <v-app-bar app>
    <v-toolbar-title>Gerenciamento de Produtos</v-toolbar-title>

    <v-tabs v-model="tab" align-with-title>
      <v-tab value="cadastrar">Cadastrar</v-tab>
      <v-tab value="editar">Editar</v-tab>
      <v-tab value="excluir">Excluir</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const tab = ref(null)

watchEffect(() => {
  if (tab.value) {
    console.log(tab.value)
  }
})
</script>

<style scoped>
/* Add any header-specific styles here */
</style>
