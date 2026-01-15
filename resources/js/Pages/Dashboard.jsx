import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { flash } = usePage().props;
    
    console.log('Dashboard flash:', flash);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {flash?.success && (
                <div className="py-4">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg" role="alert">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-green-800">Success!</h3>
                                    <p className="text-green-700 mt-1">{flash.success}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="py-4">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg" role="alert">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-red-800">Error</h3>
                                    <p className="text-red-700 mt-1">{flash.error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
