<template>
	<v-container>
		<v-list>
			<v-list-group
				v-for="(p, i) in products"
				:key="p.name + i"
				:value="p.name"
			>
				<template v-slot:activator="{ props }">
					<v-list-item
						v-bind="props"
						:title="`${i + 1} ${p.name}`"
					></v-list-item>
				</template>
				<v-list-item>
					<v-container>
						<v-row class="d-flex align-center">
							<v-col class="flex-grow-1 pa-1">
								<span class="ma-1">Preço: {{ p.price }}</span>
								<span class="ma-1">Categoria: {{ p.category }}</span>
							</v-col>
							<v-col class="pa-1" cols="auto">
								<v-btn color="error" variant="tonal">Deletar</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Product } from "../../utils/types.ts";
import { getAllProducts } from "../../api/ProductEndpoints";

const products = ref<Product[]>([]);

onMounted(async () => {
	products.value = await getAllProducts();
});
</script>

<style scoped></style>
