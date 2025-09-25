interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
}

interface Page<T> {
    content: T[];
    totalPages: number;
    number: number;
}

export type {
    Product,
    Page
}