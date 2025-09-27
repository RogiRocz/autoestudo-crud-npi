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
import {
	computed,
	ref,
	onMounted,
	onUnmounted,
	watch,
	inject,
	type Ref,
} from "vue";
import CadastrarProduto from "./main/CadastrarProduto.vue";
import EditarProduto from "./main/EditarProduto.vue";
import ExcluirProduto from "./main/ExcluirProduto.vue";
import ListarProduto from "./main/ListarProduto.vue";

import { supabase } from "../utils/supabase";
import type { Product } from "../utils/types";
import {
	getAllProducts,
	searchCategory,
	searchProductName,
} from "../api/ProductEndpoints";
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
const sort = inject<Ref<string | undefined>>("sortParams", ref(""));
const searchQuery = inject<Ref<string | undefined>>("searchQuery", ref(""));

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
		const [targetOfSearch, searchWord] = searchQuery.value ? searchQuery.value.split(':') : ['Produto', ''];

		if(searchWord == '') {
			const response = await getAllProducts(
				currentPage.value - 1,
				props.itemsPerPage,
				sort.value,
			);
			
			products.value = response.content ? response.content : products.value;

			if (currentPage.value > response.totalPages) {
				currentPage.value = response.totalPages || 1;
			}
			totalPages.value = response.totalPages;

			return;
		}
		

		if (targetOfSearch == "Produto") {
			const response = await searchProductName(
				currentPage.value - 1,
				props.itemsPerPage,
				sort.value,
				searchWord,
			);

			products.value = response.content ? response.content : products.value;

			if (currentPage.value > response.totalPages) {
				currentPage.value = response.totalPages || 1;
			}
			totalPages.value = response.totalPages;
		} else {
			const response = await searchCategory(
				currentPage.value - 1,
				props.itemsPerPage,
				sort.value,
				searchWord,
			);

			products.value = response.content ? response.content : products.value;

			if (currentPage.value > response.totalPages) {
				currentPage.value = response.totalPages || 1;
			}
			totalPages.value = response.totalPages;
		}
	} catch (error) {
		console.log("Erro ao procurar produtos: ", error);
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

watch([searchQuery], () => {
	loadProducts();
});

watch([currentPage, sort], () => {
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
