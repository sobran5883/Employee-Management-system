import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/AuthProvider";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login', { email, password }
            );

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    toast.success('Admin Login successful');
                    navigate('/admin-dashboard');
                } else {
                    toast.success('Customer Login successful');
                    navigate("/customer-dashboard");
                }
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Invalid credentials");
            } else if (error.response && error.response.status === 404) {
                toast.error("User not found");
            } else {
                toast.error("Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    title="Please enter a valid email address"
                    className='border p-3 rounded-lg'
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border p-3 rounded-lg'
                />
                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Do not have an account?</p>
                <Link to={"/register"}>
                    <span className='text-blue-700'>Register</span>
                </Link>
            </div>
        </div>
    );
}
