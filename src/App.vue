<template>
  <v-app>
    <TheHeader @update:tabActived="changeTab" />
    <TheMain :tabActived="componentActived"/>
    <TheFooter />
  </v-app>
</template>

<script setup>
import {ref} from 'vue'

import TheHeader from './components/TheHeader.vue'
import TheMain from './components/TheMain.vue'
import TheFooter from './components/TheFooter.vue'

const componentActived = ref('listar')

const changeTab = (tab) => {
  componentActived.value = tab
}
</script>

<style scoped>

</style>
