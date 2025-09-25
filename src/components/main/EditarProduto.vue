<template>
	<v-container>
		<!-- Lista de Produtos para Edição -->
		<v-list v-if="!loading">
			<v-list-group v-for="(p, i) in products" :key="i" :value="p.name">
				<template v-slot:activator="{ props: activatorProps }">
					<v-list-item
						v-bind="activatorProps"
						:title="`${itemsPerPage * (currentPage - 1) + (i + 1)} ${p.name}`"
					></v-list-item>
				</template>

				<v-list-item>
					<v-container>
						<v-row class="d-flex align-center">
							<v-col class="flex-grow-1 pa-1">
								<span class="ma-1">Preço: R$ {{ p.price.toFixed(2) }}</span>
								<span class="ma-1">Categoria: {{ p.category }}</span>
							</v-col>
							<v-col class="pa-1" cols="auto">
								<v-dialog>
									<template v-slot:activator="{ props: dialogActivatorProps }">
										<v-btn
											@click="settingFields(p)"
											v-bind="dialogActivatorProps"
											color="primary"
											variant="tonal"
											>Editar</v-btn
										>
									</template>

									<template v-slot:default="{ isActive }">
										<v-card class="pa-5" title="Editando Produto">
											<v-text-field
												label="Nome"
												v-model="productName"
												:rules="[rules.size]"
											></v-text-field>
											<v-number-input
												label="Preço"
												:precision="2"
												v-model="productPrice"
												control-variant="split"
												:rules="[rules.isPositive]"
											></v-number-input>
											<v-text-field
												label="Categoria"
												v-model="productCategory"
												:rules="[rules.size]"
											></v-text-field>
											<v-card-actions>
												<v-btn
													variant="outlined"
													color="success"
													text="Salvar"
													:loading="saveLoading"
													@click="handleUpdateProduct(isActive, Number(p.id))"
												></v-btn>
												<v-btn
													variant="outlined"
													color="error"
													text="Fechar"
													@click="isActive.value = false"
												></v-btn>
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
import { ref, computed, type Ref } from "vue";
import type { Product } from "@/utils/types.ts";
import rules from "../../utils/rulesInput";
import { updateProduct } from "../../api/ProductEndpoints";

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

const saveLoading = ref(false);
const productName = ref("");
const productPrice = ref(0);
const productCategory = ref("");

const page = computed({
	get: () => props.currentPage,
	set: (newPage) => emit("update:currentPage", newPage),
});

const settingFields = (product: Product) => {
	productName.value = product.name;
	productPrice.value = product.price;
	productCategory.value = product.category;
};

async function handleUpdateProduct(isActive: Ref, idProduct: number) {
	saveLoading.value = true;

	try {
		const editingProduct: Product = {
			id: idProduct.toString(),
			name: productName.value,
			price: productPrice.value,
			category: productCategory.value,
		};

		await updateProduct(idProduct, editingProduct);    
	} catch (error) {
		console.error("Erro ao editar produto:", error);
	} finally {
		saveLoading.value = false;
		isActive.value = false;
	}
}
</script>

<style scoped></style>
