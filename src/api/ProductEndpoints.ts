import api from "./dbConnect";
import type { Product } from "../utils/types";

async function createProduct(product: any) {
    const response = await api.post("/products", product);
    return response.data;
}

async function getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

async function getAllProducts() {
    const response = await api.get("/products");
    return response.data;
}

async function updateProduct(id: number, newProduct: Product) {
    const response = await api.put(`/products/${id}`, newProduct);
    return response.data;
}

async function deleteProduct(id:number) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}

export {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts
}