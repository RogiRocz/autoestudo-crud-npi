<template>
  <v-main>
    <v-container>
      <KeepAlive>
        <component :is="activeComponent" />
      </KeepAlive>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue';

import CadastrarProduto from './main/CadastrarProduto.vue';
import EditarProduto from './main/EditarProduto.vue';
import ExcluirProduto from './main/ExcluirProduto.vue';
import ListarProduto from './main/ListarProduto.vue';

const components = {
  listar: ListarProduto,
  cadastrar: CadastrarProduto,
  editar: EditarProduto,
  excluir: ExcluirProduto
}

const props = withDefaults(defineProps<{
  tabActived?: 'listar' | 'cadastrar' | 'editar' | 'excluir'
}>(), {
  tabActived: 'listar',
});

const activeComponent = computed(() => components[props.tabActived])
</script>

<style scoped></style>
