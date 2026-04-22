import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const OrderSuccess = () => {
    const { orderId } = useParams();

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 uppercase-none">
            <Navbar />
            <div className="max-w-3xl mx-auto py-20 px-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8 animate-bounce mt-4">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Order Placed Successfully!
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Thank you for your purchase! Your order <span className="font-bold text-blue-600">#{orderId?.slice(-6).toUpperCase()}</span> has been confirmed.
                    </p>

                    <div className="bg-blue-50/50 rounded-2xl p-6 mb-10 inline-block w-full max-w-lg border border-blue-100">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium text-blue-800">
                            <span className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                Order ID: {orderId}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/profile"
                            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            View Order Status
                        </Link>
                        <Link
                            to="/"
                            className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-white font-bold rounded-2xl hover:bg-yellow-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25"
                        >
                            Return to Home
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Expect an email confirmation shortly with your order details and tracking link.</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
