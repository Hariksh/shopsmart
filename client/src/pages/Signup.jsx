import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup attempt:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-green-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-text-main">Create Account</h2>
                    <p className="mt-2 text-sm text-text-main/70">
                        Join us and start shopping smarter
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="pl-10 px-4 py-2 rounded-lg bg-white border border-green-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full text-text-main placeholder-gray-400 transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 px-4 py-2 rounded-lg bg-white border border-green-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full text-text-main placeholder-gray-400 transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 px-4 py-2 rounded-lg bg-white border border-green-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full text-text-main placeholder-gray-400 transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="pl-10 px-4 py-2 rounded-lg bg-white border border-green-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full text-text-main placeholder-gray-400 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-3 bg-green-700 text-white hover:bg-green-800">
                        Create Account
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-green-700 transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
