import { Suspense } from 'react';
import { getAllProducts } from "@/data/productStore";
import OrderClient from "./OrderClient";

export const dynamicParams = false;

export function generateStaticParams() {
    const allProducts = getAllProducts();
    const paths = allProducts.map((product) => ({
        id: product.id.toString(),
    }));
    return [...paths, { id: 'custom' }];
}

export default function OrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
            <OrderClient />
        </Suspense>
    );
}
