<template>
	<v-app-bar app color="primary" class="app-bar">
		<v-toolbar-title>Gerenciamento de Produtos</v-toolbar-title>

		<template v-slot:extension>
			<v-tabs v-model="selectedTab" align-with-title fixed-tabs>
				<v-tab v-for="(tab, i) in tabs" :key="i" :value="tab">{{ tab }}</v-tab>
			</v-tabs>

			<v-row
				v-if="selectedTab !== 'Cadastrar'"
				class="px-4 pt-4 pb-2 align-center"
			>
				<v-col cols="12" sm="4" md="2" class="py-0">
					<v-combobox
						label="Itens por página"
						:items="itemsQuantity"
						v-model="itemsPerPage"
						variant="underlined"
						density="compact"
						hide-details
					></v-combobox>
				</v-col>

				<v-col cols="12" sm="8" md="4" class="py-0">
					<v-text-field
						label="Buscar"
						v-model="searchQuery"
						variant="outlined"
						density="compact"
						hide-details
						append-inner-icon="mdi-magnify"
					></v-text-field>
					<v-switch
						v-model="selectedTargetOfSearch"
						:label="`${selectedTargetOfSearch}`"
						true-value="Produto"
						false-value="Categoria"
					></v-switch>
				</v-col>

				<v-col cols="12" md="6">
					<div class="d-flex align-center justify-center">
						<v-select
							label="Ordenar por"
							:items="keysProduct"
							v-model="sortKey"
							variant="outlined"
							clearable
							chips
							density="compact"
							hide-details
							class="mr-4"
							style="max-width: 250px"
						></v-select>
						<v-switch
							v-model="orderSorting"
							:label="`${orderSorting ? 'Ascendente' : 'Descendente'}`"
							hide-details
						></v-switch>
					</div>
				</v-col>
			</v-row>
		</template>
	</v-app-bar>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";

const emit = defineEmits(["tabs", "items"]);

const tabs = ["Listar", "Cadastrar", "Editar", "Excluir"];
const itemsQuantity = [2, 5, 10, 15, 20];
const keysProduct = ["id", "name", "price", "category"];

const selectedTab = ref(tabs[0]);
const itemsPerPage = ref(itemsQuantity[2]);
const orderSorting = ref(false);
const selectedTargetOfSearch = ref("Produto");
const sortKey = ref<string>(keysProduct[0]);
const searchQuery = ref("");
const changeSortParams = inject<(newValue: string) => void>("changeSortParams");
const research = inject<(newValue: string) => void>("research");

watch(selectedTab, () => {
	emit("tabs", selectedTab.value.toLowerCase());
});

watch(itemsPerPage, () => {
	emit("items", itemsPerPage.value);
});

watch([sortKey, orderSorting], () => {
	if (changeSortParams) {
		sortKey.value = sortKey.value == null ? keysProduct[0] : sortKey.value;

		changeSortParams(`${sortKey.value},${orderSorting.value ? "asc" : "desc"}`);
	}
});

watch([searchQuery, selectedTargetOfSearch], () => {
	if (research) {
		research(`${selectedTargetOfSearch.value}:${searchQuery.value}`);
	}
});
</script>

<style scoped>
.app-bar {
	box-sizing: content-box;
	padding: 0.5em;
}

.app-bar > * {
	box-sizing: border-box;
}
</style>
