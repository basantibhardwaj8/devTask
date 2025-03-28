import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const [focus, setFocus] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFocus = (field) =>
        setFocus((prev) => ({ ...prev, [field]: true }));
    const handleBlur = (field, value) =>
        setFocus((prev) => ({ ...prev, [field]: value.trim() !== "" }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        if (!form.email.value.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!form.password.value.trim()) {
            toast.error('Password is required');
            return;
        }
        
        if (form.checkValidity()) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) {
                toast.error('No account found. Please register first.');
                setError('No account found. Please register first.');
                return;
            }

            if (userData.email === form.email.value && userData.password === form.password.value) {
                localStorage.setItem('isLoggedIn', 'true');
                toast.success('Login successful!');
                navigate('/profile');
            } else {
                toast.error('Invalid email or password');
                setError('Invalid email or password');
            }
        } else {
            if (!form.email.validity.valid) {
                toast.error('Please enter a valid email address');
            }
            form.reportValidity();
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="h-[90%] w-full max-w-[300px] bg-gray-200 pt-4 px-5 rounded-sm shadow-md">
                <h2 className="w-[180px] font-bold text-2xl text-gray-900">
                    Signin to your PopX account
                </h2>
                
                <p className="w-[180px] text-gray-500 text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="h-[80%] flex flex-col mt-5">
                    <div>
                        {[
                            { id: "email", label: "Email Address", type: "email" },
                            { id: "password", label: "Password", type: "password" },
                        ].map(({ id, label, type }) => (
                            <div key={id} className="relative mb-3">
                                <label
                                    htmlFor={id}
                                    className={`absolute left-2 px-1 text-sm text-[#542dde] bg-gray-200 transition-all duration-300 ${
                                        focus[id] ? "text-xs -translate-y-2" : "translate-y-3"
                                    }`}
                                >
                                    {label}
                                </label>
                                <input
                                    id={id}
                                    onFocus={() => handleFocus(id)}
                                    onBlur={(e) => handleBlur(id, e.target.value)}
                                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type={type}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-[#542dde] w-full hover:bg-[#411ebe] mt-2 text-white font-semibold py-2 rounded-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;