import marieImg from '../../public/marie.webp';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);


    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="h-[90%] w-full max-w-[300px] bg-gray-200 shadow-md">
                <div className="header flex justify-between px-5 pt-4 pb-3 bg-white items-center shadow-sm">
                    <h2 className="font-bold text-xl text-gray-900">Account Settings</h2>
                </div>

                <div className="info flex flex-col px-5 gap-3 mt-6">
                    <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-300 relative">
                            <img src={marieImg} alt="profile" className="w-full h-full object-cover rounded-full" />
                            <div className="h-6 w-6 flex items-center justify-center rounded-full text-white bg-[#542dde] absolute -right-1 -bottom-1">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-lg text-gray-900">{userData.name || 'User Name'}</h3>
                            <span className="text-gray-600 text-sm hover:underline cursor-pointer">
                                {userData.email || 'email@example.com'}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-xs mt-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. In ullam natus dignissimos ut accusantium, laudantium minima eaque.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Profile