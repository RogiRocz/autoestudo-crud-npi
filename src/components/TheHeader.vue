<template>
  <v-app-bar app>
    <v-toolbar-title>Gerenciamento de Produtos</v-toolbar-title>

    <v-tabs v-model="selectedTab" align-with-title>
      <v-tab v-for="(tab, i) in tabs" :key="i" :value="tab">{{ tab }}</v-tab>
    </v-tabs>

    <template v-slot:extension>
      <div class="d-flex justify-end w-25 ma-5" v-if="selectedTab !== 'Cadastrar'">
        <v-combobox
            label="Itens por página"
            :items="itemsQuantity"
            v-model="itemsPerPage"
            variant="underlined"
            class="w-25"
            density="compact"
        ></v-combobox>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['tabs', 'items']);

const tabs = ['Listar', 'Cadastrar', 'Editar', 'Excluir'];
const itemsQuantity = [2, 5, 10, 15, 20];

const selectedTab = ref(tabs[0]);
const itemsPerPage = ref(itemsQuantity[2]);

watchEffect(() => {
	emit('tabs', selectedTab.value.toLowerCase())
	emit('items', itemsPerPage.value)
})
</script>

<style scoped>
.v-combobox {
	margin-right: 1rem;
}
</style>
