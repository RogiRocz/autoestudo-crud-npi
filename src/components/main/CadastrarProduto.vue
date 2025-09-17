<template>
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

const productName = ref('')
const productPrice = ref(0)
const productCategory = ref('')
const loading = ref(false)

const rules = {
	size: (v: string) =>
		v.length > 3 ? true : 'O campo deve ter mais de 3 letras',
	isPositive: (v: number) => (v > 0 ? true : 'O campo deve ser maior que zero'),
}

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
		const {data} = await createProduct(newProduct)
		console.log(data)
	} catch (error) {
		console.log(error)
	}
}

</script>

<style scoped></style>
