import type { Product, Page } from "../utils/types";
import api from "./apiConnect";

async function searchProductName(
	page: number = 0,
	size: number = 20,
	sort: string = "id,asc",
	word: string,
) {
	const response = await api.get("/products/search", {
		params: {
			page,
			size,
			sort,
			name: word,
		},
	});

	return response.data;
}

async function searchCategory(
	page: number = 0,
	size: number = 20,
	sort: string = "id,asc",
	word: string,
) {
	const response = await api.get("/products/search", {
		params: {
			page,
			size,
			sort,
			category: word,
		},
	});
	return response.data;
}

async function createProduct(product: any): Promise<Product> {
	const response = await api.post("products", product);
	return response.data;
}

async function getProductById(id: number): Promise<Product> {
	const response = await api.get(`products/${id}`);
	return response.data;
}

async function getAllProducts(
	page: number = 0,
	size: number = 20,
	sort: string = "id,asc",
): Promise<Page<Product>> {
	const response = await api.get("products", {
		params: {
			page,
			size,
			sort,
		},
	});
	return response.data;
}

async function updateProduct(
	id: number,
	newProduct: Product,
): Promise<Product> {
	const response = await api.put(`products/${id}`, newProduct);
	return response.data;
}

async function deleteProduct(id: number) {
	const response = await api.delete(`products/${id}`);
	return response.data;
}

export {
	createProduct,
	getProductById,
	getAllProducts,
	updateProduct,
	deleteProduct,
	searchProductName,
	searchCategory,
};
