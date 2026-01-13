import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="E-commerce Shopping Cart" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
                    <div className="absolute top-8 right-8">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex gap-4">
                                <Link
                                    href={route('login')}
                                    className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <svg
                                className="w-20 h-20 mx-auto text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            E-commerce Shopping Cart
                        </h1>
                        
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                            A modern shopping cart application built with Laravel, React, and Inertia.js. 
                            Browse products, manage your cart, and enjoy a seamless shopping experience.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Browse Products</h3>
                                <p className="text-gray-400 text-sm">
                                    Explore our catalog of 20+ products with real-time stock information
                                </p>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Manage Cart</h3>
                                <p className="text-gray-400 text-sm">
                                    Add, update, and remove items with database-backed persistence
                                </p>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Secure & Fast</h3>
                                <p className="text-gray-400 text-sm">
                                    Built with Laravel authentication and optimized performance
                                </p>
                            </div>
                        </div>

                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition duration-200 border border-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}

                        {auth.user && (
                            <Link
                                href={route('products.index')}
                                className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
                            >
                                Browse Products
                            </Link>
                        )}
                    </div>

                    <div className="absolute bottom-8 text-center text-gray-500 text-sm">
                        <p>Built with Laravel, React, Inertia.js & Tailwind CSS</p>
                    </div>
                </div>
            </div>
        </>
    );
}
