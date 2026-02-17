import { Suspense } from 'react';
import EditProductClient from './EditProductClient';

export default function EditProductPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <EditProductClient />
        </Suspense>
    );
}
