<template>
  <v-app-bar app>
    <v-toolbar-title>Gerenciamento de Produtos</v-toolbar-title>

    <v-tabs v-model="selectedTab" align-with-title>
      <v-tab v-for="(tab, i) in tabs" :key="i" :value="tab">{{ tab }}</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

type TabValue = 'listar' | 'cadastrar' | 'editar' | 'excluir'

const tabs: TabValue[] = ['listar', 'cadastrar', 'editar', 'excluir']

const emits = defineEmits(['update:tabActived'])

const selectedTab = ref<TabValue>('listar')

watchEffect(() => {
  if (selectedTab.value) {
    emits('update:tabActived', selectedTab.value)
  }
})
</script>

<style scoped>

</style>
