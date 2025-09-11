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
            <v-card>
              <v-col align-self="start">
                <v-card-title>{{ produto.name }}</v-card-title>
                <v-card-subtitle
                  >R$ {{ produto.price.toFixed(2) }}</v-card-subtitle
                >
                <v-card-text> Categoria: {{ produto.category }} </v-card-text>
              </v-col>
              <v-col align-self="end">
                <v-btn color="primary" text>Editar</v-btn>
                <v-btn color="error" text>Excluir</v-btn>
              </v-col>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Produto {
  id: number
  name: string
  price: number
  category: string
}

// No futuro, estes dados virão de uma chamada de API
const produtos = ref<Produto[]>([
  {
    id: 1,
    name: 'Produto 1',
    price: 10.99,
    category: 'A',
  },
  {
    id: 2,
    name: 'Produto 2',
    price: 25.5,
    category: 'B',
  },
  {
    id: 3,
    name: 'Produto 3',
    price: 5.0,
    category: 'A',
  },
  {
    id: 4,
    name: 'Produto 4',
    price: 100.0,
    category: 'C',
  },
])
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
