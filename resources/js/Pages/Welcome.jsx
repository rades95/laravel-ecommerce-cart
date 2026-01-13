import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="E-commerce Shopping Cart" />
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            E-commerce Shopping Cart
                        </h1>
                        <p className="text-gray-400 mb-4">
                            Browse products, manage your cart, and shop with ease
                        </p>
                    </div>

                    {auth?.user ? (
                        <div className="space-y-4">
                            <Link
                                href={route('products.index')}
                                className="block w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Browse Products
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="block w-full px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-4 justify-center">
                            <Link
                                href={route('login')}
                                className="px-6 py-3 rounded-lg font-semibold transition"
                                style={{ backgroundColor: '#4F46E5', color: '#ffffff' }}
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-6 py-3 rounded-lg font-semibold transition"
                                style={{ backgroundColor: '#374151', color: '#ffffff' }}
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <p className="text-gray-500 text-sm mt-8">
                        Built with Laravel, React & Tailwind CSS
                    </p>
                </div>
            </div>
        </>
    );
}
