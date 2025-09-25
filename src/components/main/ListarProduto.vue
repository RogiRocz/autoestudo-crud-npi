<template>
  <v-container>
    <v-row>
      <!-- Loader -->
      <v-col v-if="loading" cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>

      <!-- Exibição dos produtos -->
      <v-col
        v-for="produto in products"
        :key="produto.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex"
      >
        <v-card class="w-100 product-card">
          <v-card-title>{{ produto.name }}</v-card-title>
          <v-card-subtitle>R$ {{ produto.price.toFixed(2) }}</v-card-subtitle>
          <v-card-text> Categoria: {{ produto.category }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seção de Paginação -->
    <v-row v-if="totalPages > 1" justify="center" class="mt-4">
      <v-col cols="auto">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "../../utils/types";

// --- Props ---
const props = defineProps<{
  products: Product[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
}>();

// --- Emits ---
const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();

// --- Computed para v-model da paginação ---
const page = computed({
  get: () => props.currentPage,
  set: (newPage) => {
    emit("update:currentPage", newPage);
  },
});

</script>

<style scoped>
.v-card-title {
  text-wrap: auto;
}
.product-card {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
</style>
