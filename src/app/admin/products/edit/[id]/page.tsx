import { getAllProducts } from "@/data/productStore";
import EditProductClient from "./EditProductClient";

export const dynamicParams = false;

export function generateStaticParams() {
    const allProducts = getAllProducts();
    return allProducts.map((product) => ({
        id: product.id.toString(),
    }));
}

export default function EditProductPage() {
    return <EditProductClient />;
}
