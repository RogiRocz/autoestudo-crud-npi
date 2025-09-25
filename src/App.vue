<template>
  <v-app>
    <TheHeader @tabs="changeTab" @items="changeItemsPerPage"/>
    <TheMain :tabActived="activeTab" :itemsPerPage="itemsPerPage"/>
    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheMain from './components/TheMain.vue'
import TheFooter from './components/TheFooter.vue';

type Tab = 'listar' | 'cadastrar' | 'editar' | 'excluir';

const activeTab = ref<Tab>('listar');
const itemsPerPage = ref(10);

const changeTab = (tab: Tab) => {
  activeTab.value = tab;
}

const changeItemsPerPage = (itemsQuantity: number)  => {
  itemsPerPage.value = itemsQuantity;  
}
</script>
