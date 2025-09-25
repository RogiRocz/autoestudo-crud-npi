<template>
	<v-main>
		<v-container>
			<KeepAlive>
				<component
					:is="activeComponent"
					:products="products"
					:total-pages="totalPages"
					:current-page="currentPage"
					:itemsPerPage="itemsPerPage"
					:loading="loading"
					@update:current-page="handlePageChange"
				/>
			</KeepAlive>
		</v-container>
	</v-main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import CadastrarProduto from "./main/CadastrarProduto.vue";
import EditarProduto from "./main/EditarProduto.vue";
import ExcluirProduto from "./main/ExcluirProduto.vue";
import ListarProduto from "./main/ListarProduto.vue";

import { supabase } from "../utils/supabase";
import type { Product } from "../utils/types";
import { getAllProducts } from "../api/ProductEndpoints";
import type { RealtimeChannel } from "@supabase/supabase-js";

const props = withDefaults(
	defineProps<{
		tabActived: "listar" | "cadastrar" | "editar" | "excluir";
		itemsPerPage: number;
	}>(),
	{
		tabActived: "listar",
		itemsPerPage: 10,
	},
);

const products = ref<Product[]>([]);
const currentPage = ref(1);
const totalPages = ref(0);
const loading = ref(false);
let realtimeChannel: RealtimeChannel | null = null;

const components = {
	listar: ListarProduto,
	cadastrar: CadastrarProduto,
	editar: EditarProduto,
	excluir: ExcluirProduto,
};
const activeComponent = computed(() => components[props.tabActived]);

const loadProducts = async () => {
	loading.value = true;
	try {
		const response = await getAllProducts(
			currentPage.value - 1,
			props.itemsPerPage,
		);
		products.value = response.content;
		
		if(currentPage.value > response.totalPages){
			currentPage.value = response.totalPages || 1;
		}
		totalPages.value = response.totalPages;
	} catch (error) {
		console.error("Erro ao carregar produtos:", error);
	} finally {
		loading.value = false;
	}
};

const handlePageChange = (newPage: number) => {
	if (newPage > 0 && newPage <= totalPages.value) {
		currentPage.value = newPage;
	}
};

const handleRealtimeSupabase = () => {
	loadProducts();
};

watch(currentPage, () => {
	loadProducts();
});

watch(
	() => props.itemsPerPage,
	() => {
		currentPage.value = 1;
		loadProducts();
	},
);

onMounted(() => {
	loadProducts();

	realtimeChannel = supabase
		.channel("schema_produtos")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "produto" },
			handleRealtimeSupabase,
		)
		.subscribe();
});

onUnmounted(() => {
	if (realtimeChannel) {
		supabase.removeChannel(realtimeChannel);
	}
});
</script>
