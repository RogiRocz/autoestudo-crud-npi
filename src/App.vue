<template>
  <v-app>
    <TheHeader @update:tabActived="changeTab" />
    <TheMain :tabActived="activeTab" />
    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheMain from './components/TheMain.vue'
import TheFooter from './components/TheFooter.vue'

type Tab = 'listar' | 'cadastrar' | 'editar' | 'excluir'

const activeTab = ref<Tab>('cadastrar')

const changeTab = (tab: Tab) => {
  activeTab.value = tab
}
</script>
