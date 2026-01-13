import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function Index({ products, cartItemsCount }) {
    const { flash } = usePage().props;
    const [processing, setProcessing] = useState(false);

    const addToCart = (productId) => {
        console.log('Adding to cart:', productId);
        setProcessing(true);
        
        router.post(route('cart.add'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('Success:', page);
                setProcessing(false);
            },
            onError: (errors) => {
                console.error('Errors:', errors);
                setProcessing(false);
            },
            onFinish: () => {
                console.log('Request finished');
                setProcessing(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Products
                    </h2>
                    <a
                        href={route('cart.index')}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        View Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                    </a>
                </div>
            }
        >
            <Head title="Products" />

            {flash?.success && (
                <div className="py-4">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="py-4">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.error}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-2xl font-bold text-gray-900 mb-2">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Stock: {product.stock_quantity}
                                    </p>
                                    <PrimaryButton
                                        onClick={() => addToCart(product.id)}
                                        disabled={processing || product.stock_quantity === 0}
                                        className="w-full justify-center"
                                    >
                                        {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
