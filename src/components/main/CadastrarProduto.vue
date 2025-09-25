<template>
	<v-alert
	color="success"
	v-if="alertSuccess"
	closable
	type="success"
	text="Produto criado com sucesso!"></v-alert>
	<v-form @submit.prevent="sendProduct">
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="productName"
						label="Nome do Produto"
						:rules="[rules.size]"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-number-input
						label="Preço"
						v-model="productPrice"
						control-variant="split"
						required
						:rules="[rules.isPositive]"
						:precision="2"
					></v-number-input>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="productCategory"
						label="Categoria"
						required
						:rules="[rules.size]"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-btn
						:loading="loading"
						@click="simulateLoading"
						append-icon="mdi-send"
						variant="tonal"
						color="blue-lighten-1"
						type="submit"
						>Cadastrar</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createProduct } from '../../api/ProductEndpoints.ts'
import rules from '../../utils/rulesInput.ts'

const productName = ref('')
const productPrice = ref(0)
const productCategory = ref('')
const loading = ref(false)
const alertSuccess = ref(false)

function simulateLoading() {
	loading.value = true
	setTimeout(() => {
		loading.value = false
	}, 2000)
}

async function sendProduct(){
	const newProduct = {
		name: productName.value,
		price: productPrice.value,
		category: productCategory.value
	}
	try {
		await createProduct(newProduct);
		alertSuccess.value = true;
		productName.value = '';
		productPrice.value = 0;
		productCategory.value = '';

		setTimeout(() => {
			alertSuccess.value = false;
		}, 3000);
	} catch (error) {
		console.error("Erro ao criar produto:", error);
	}
}
</script>

<style scoped>
	.v-number-input {
		width: 100%;
	}
</style>
