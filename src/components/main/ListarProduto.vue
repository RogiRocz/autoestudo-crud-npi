<template>
  <v-container>
    <v-row>
      <v-col
        v-for="produto in produtos"
        :key="produto.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-container>
          <v-row no-gutters align="center" justify="center">
            <v-card width="25vw" height="100%">
              <v-col align-self="start">
                <v-card-title>{{ produto.name }}</v-card-title>
                <v-card-subtitle
                  >R$ {{ produto.price.toFixed(2) }}</v-card-subtitle
                >
                <v-card-text> Categoria: {{ produto.category }} </v-card-text>
              </v-col>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Product } from '../../utils/types';
import { getAllProducts } from '../../api/ProductEndpoints';

const produtos = ref<Product[]>([])

onMounted(async () =>  {
  produtos.value = await getAllProducts();
});
</script>

<style scoped>
.v-card-title{
  text-wrap: auto;;
}
</style>
