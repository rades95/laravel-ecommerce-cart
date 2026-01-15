import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function Index({ cartItems, total }) {
    const { flash } = usePage().props;
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {})
    );

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        router.patch(route('cart.update', cartItemId), {
            quantity: newQuantity,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setQuantities(prev => ({
                    ...prev,
                    [cartItemId]: newQuantity
                }));
            }
        });
    };

    const removeItem = (cartItemId) => {
        router.delete(route('cart.destroy', cartItemId), {
            preserveScroll: true,
        });
    };

    const handleQuantityChange = (cartItemId, value) => {
        const newQuantity = parseInt(value) || 1;
        setQuantities(prev => ({
            ...prev,
            [cartItemId]: newQuantity
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Shopping Cart
                    </h2>
                    <a
                        href={route('products.index')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Continue Shopping
                    </a>
                </div>
            }
        >
            <Head title="Cart" />

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
                    {cartItems.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 text-center">
                                <p className="mb-4">Your cart is empty</p>
                                <a
                                    href={route('products.index')}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Start Shopping
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-xl font-bold text-gray-900 mb-2">
                                                    ${parseFloat(item.product.price).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Available Stock: {item.product.stock_quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                                                        disabled={quantities[item.id] <= 1}
                                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        -
                                                    </button>
                                                    <TextInput
                                                        type="number"
                                                        value={quantities[item.id]}
                                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        onBlur={() => updateQuantity(item.id, quantities[item.id])}
                                                        className="w-20 text-center"
                                                        min="1"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                                                        disabled={quantities[item.id] >= item.product.stock_quantity}
                                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ${(parseFloat(item.product.price) * quantities[item.id]).toFixed(2)}
                                                    </p>
                                                </div>
                                                <DangerButton
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Total:
                                        </h3>
                                        <p className="text-3xl font-bold text-gray-900">
                                            ${parseFloat(total).toFixed(2)}
                                        </p>
                                    </div>
                                    <PrimaryButton
                                        onClick={() => router.post(route('checkout'))}
                                        className="w-full justify-center text-lg py-4"
                                    >
                                        Proceed to Checkout
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
