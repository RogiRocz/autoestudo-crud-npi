import type { Product, Page } from "../utils/types";
import api from "./apiConnect";

async function createProduct(product: any): Promise<Product> {
	const response = await api.post("products", product);
	return response.data;
}

async function getProductById(id: number): Promise<Product> {
	const response = await api.get(`products/${id}`);
	return response.data;
}

async function getAllProducts(page: number = 0, size: number = 20, sort: string = 'id,asc'): Promise<Page<Product>> {
	if (sort){
		sort.split('&').forEach(arg => {
			let [att, ord] = arg;
			const p: Product = {
				id: "",
				name: "",
				price: 0,
				category: ""
			};
			const keysOfProduct = Object.keys(p);
			if(keysOfProduct.includes(att)){
				ord = ord.substring(0, 3);
				if(ord === "asc" || ord === "desc"){
					sort = `${att},${ord}`;
				}
			}
		});
	}else{
		sort = "id,asc";
	}

	const response = await api.get("products", {
		params: {
			page,
			size,
			sort
		},
	});
	return response.data;
}

async function updateProduct(id: number, newProduct: Product): Promise<Product> {
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
};
