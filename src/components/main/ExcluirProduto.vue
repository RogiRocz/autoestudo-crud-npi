<template>
  <v-container>
    <!-- Alerta de Sucesso -->
    <v-alert v-if="alertSuccess" closable type="success" :text="textValert"></v-alert>

    <!-- Lista de Produtos para Exclusão -->
    <v-list v-if="!loading">
      <v-list-group v-for="(p, i) in products" :key="i" :value="p.name">
        <template v-slot:activator="{ props: activatorProps }">
          <v-list-item v-bind="activatorProps" :title="`${(itemsPerPage * (currentPage - 1)) + (i + 1)} ${p.name}`"></v-list-item>
        </template>

        <v-list-item>
          <v-container>
            <v-row class="d-flex align-center">
              <v-col class="flex-grow-1 pa-1">
                <span class="ma-1">Preço: R$ {{ p.price.toFixed(2) }}</span>
                <span class="ma-1">Categoria: {{ p.category }}</span>
              </v-col>
              <v-col class="pa-1" cols="auto">
                <v-dialog max-width="500">
                  <template v-slot:activator="{ props: dialogActivatorProps }">
                    <v-btn v-bind="dialogActivatorProps" color="error" variant="tonal" :loading="deleteLoading">Deletar</v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Confirmar Exclusão">
                      <v-card-text>Você tem certeza que deseja excluir o produto "{{ p.name }}"? Esta ação não pode ser desfeita.</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
                        <v-btn color="error" variant="flat" text="Excluir" @click="confirmDelete(isActive, Number(p.id), (itemsPerPage * (currentPage - 1)) + (i + 1))"></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- Loader -->
    <div v-else class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Paginação -->
    <v-row v-if="totalPages > 1" justify="center" class="mt-4">
      <v-col cols="auto">
        <v-pagination v-model="page" :length="totalPages" :total-visible="7"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import type { Product } from "../../utils/types.ts";
import { deleteProduct } from "../../api/ProductEndpoints.ts";

const props = defineProps<{
  products: Product[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();

const deleteLoading = ref(false);
const alertSuccess = ref(false);
const textValert = ref('');

const page = computed({
  get: () => props.currentPage,
  set: (newPage) => emit("update:currentPage", newPage),
});

async function confirmDelete(isActive: Ref, id: number, index: number) {
  deleteLoading.value = true;
  try {
    await deleteProduct(id);
  } catch (error) {
    console.log("Erro ao deletar produto:", error);
  } finally {
    deleteLoading.value = false;
    alertSuccess.value = true;
    textValert.value = `Produto ${index} deletado com sucesso!`;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 2000);
    isActive.value = false;
  }

}
</script>

<style scoped></style>
